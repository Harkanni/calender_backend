import express from 'express';
import qs from 'qs';
import axios from 'axios';
import TokenDB_model from '../models/token.js';

const token_router = express.Router();

let accessToken;
let refreshToken;
let ourCode;

token_router.get('/code', async (req, res) => {
  if (!accessToken) {
    res.status(400).send('No access token');
  }
  // Move forward
  res.send('Success');
});

token_router.get('/refreshToken', async (req, res) => {
  let access_token_db_data = await TokenDB_model.findOne({});
  refreshToken = access_token_db_data.refresh_token;

  console.log('This is fetched from db: ', access_token_db_data);

  const data = qs.stringify({
    client_id: '66023b6f76979edf38194d72-lu7t76eg',
    client_secret: '9d2537d3-a374-474d-962e-cb6ec8e1b9e2',
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    user_type: 'Location',
    redirect_uri: 'http://localhost:3000/oauth/callback'
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://services.leadconnectorhq.com/oauth/token',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  };

  try {
    const response = await axios.request(config);
    console.log('This is response data: ', response, refreshToken, data);
    const { access_token, refresh_token } = response.data;
    accessToken = access_token;
    refreshToken = refresh_token;

    // Update the access token
    await TokenDB_model.updateOne({}, response.data);

    res.status(200).json({
      message: 'Access token refreshed successfully',
      data: response?.data
    });
  } catch (error) {
    console.error('Error refreshing access token:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' });
  }
});

token_router.get('/redirectHere', async (req, res) => {
  // https://main--calendry.netlify.app/calender
  const code = req.query.code;
  ourCode = code;
  const url = 'https://services.leadconnectorhq.com/oauth/token';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    body: new URLSearchParams({
      client_id: '66023b6f76979edf38194d72-lu7t76eg',
      client_secret: '9d2537d3-a374-474d-962e-cb6ec8e1b9e2',
      grant_type: 'authorization_code',
      user_type: 'Location',
      code
    })
  };
  const response = await fetch(url, options);
  //   const {access_token, refresh_token} = await response.json();
  const tokenData = await response.json();
  //   console.log("This is data from acces token", data);
  accessToken = tokenData.access_token;
  refreshToken = tokenData.refresh_token;

  let token = await TokenDB_model.findOne({});
  if (token) {
    // Update the existing token
    console.log('Token updated: ', token);
    await TokenDB_model.updateOne({}, tokenData);
  } else {
    // Save the new token
    token = new TokenDB_model(tokenData);
    await token.save();
  }

  res.send({ ...tokenData });
  //   res.send({ data: response });
});

token_router.get('/getCode', (req, res) => {
  res.send({ ourCode });
});

token_router.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

// const fetch = require('node-fetch'); // Assuming you're using Node.js

token_router.post('/createContact', async (req, res) => {
  try {
    const data = req.body;
    console.log('This is tyhen data', data);

    const url = 'https://services.leadconnectorhq.com/contacts/';
    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjYwMjNiNmY3Njk3OWVkZjM4MTk0ZDcyLWx1N3Q3NmVnIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNhbGVuZGFycy5yZWFkb25seSIsImNhbGVuZGFycy53cml0ZSIsImNhbGVuZGFycy9ldmVudHMucmVhZG9ubHkiLCJjYWxlbmRhcnMvZXZlbnRzLndyaXRlIiwiY29udGFjdHMucmVhZG9ubHkiLCJjb250YWN0cy53cml0ZSJdLCJjbGllbnQiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzIiLCJjbGllbnRLZXkiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzItbHU3dDc2ZWcifSwiaWF0IjoxNzEyNzQ4Njc4Ljg4MywiZXhwIjoxNzEyODM1MDc4Ljg4M30.N6J-Ms8uVhGhMGouGNfBPTD9ignCT8QdYTBq739gOw4uSjYYWgXWHYPk0H4jNFsD3adQqQnPPCe1F062cmmm6YIE6yrGoIOGMTEAsHFSJzeSjo6McFO3UBPlXShUjA6BgTknUWcpfPwt_akpBvxOdjJWYBkjzbUmJidUj4ASVNXGGtT3qUzx3SG0R09xn5HAGtl5FJiGEj861tNyNEkwoQ2Txv2QQCu4tawZkLSsz-3NyqwKX8SwhMAfpFjbcxg3q5NRFXClOS4jH52TfawplmQjh83A6KTfmO9NNEE8N38dRHFDALK76JK7OwkiQpeb6_7Bj1D5eck5tyEr1mKEGFYmlcyxLuJ4SXrB0cHyDV4sr2cEDqE26c6rI5GGOKt02kkhgI-Ue1JQGMSpByEIeqteWYE6_37mByCstpQj9VJq-9Zg5ZFAoFROkPb8fjTEmBs86MJBtcDtKLCNSXaXeIoPMS_IxABwFjeMtqvkxPrDKFq6tXmU2tQzA3HeXCIZt7pRUzmPm0344Ja5kzvfN5XT_tPpSpl5l3zSUwzJyUUycQENvZLM3-up2CNqsWUIpIpf-iJ4lS9edMflFZ8YJEYECz5qBCQJFCzy4wXuzeXM8Y5QHNfL1TxqtDuzbM9MtTSwkwZDSepGqbP2UamhaBt3eX7A_OCgLPyZS1LBaqw',
        Version: '2021-07-28',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    // IF DUPLICATE CONTACT
    if (
      responseData.statusCode === 400 &&
      message === 'This location does not allow duplicated contacts.'
    ) {
      console.log('Duplicate contact found');

      let contactId = responseData.meta.contactId;
    }

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' });
  }
});

token_router.post('/createAppointment', async (req, res) => {
  try {
    const data = req.body;
    console.log('This is the appointment data', data);

    const url =
      'https://services.leadconnectorhq.com/calendars/events/appointments';
    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjYwMjNiNmY3Njk3OWVkZjM4MTk0ZDcyLWx1N3Q3NmVnIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNhbGVuZGFycy5yZWFkb25seSIsImNhbGVuZGFycy53cml0ZSIsImNhbGVuZGFycy9ldmVudHMucmVhZG9ubHkiLCJjYWxlbmRhcnMvZXZlbnRzLndyaXRlIiwiY29udGFjdHMucmVhZG9ubHkiLCJjb250YWN0cy53cml0ZSJdLCJjbGllbnQiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzIiLCJjbGllbnRLZXkiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzItbHU3dDc2ZWcifSwiaWF0IjoxNzEyNjc2OTM5Ljk1NCwiZXhwIjoxNzEyNzYzMzM5Ljk1NH0.QUcaqMx1NxR-bTo8EI1SHFIFBMTORGYtPzHZDNt6qZqffg6HJ9ODDl8GESVGzF0y4qnKi8taE9QYElErEVz_pGU8g4MBFCNKts5iVpWapln44mXuiOLLRBiPXmoAGDt3qO9PjhlllF1iuTowk7Chou4ZUZh-YKMBuBLBdQwp8fsIb8wdXBlut-DBmPBfkWHjyctXlxaAibB_NoGaDDX3pZEB65rLsp2URS7E-drc_3lPh6djj6kiGDF80qEBLlAvD5AVk7vN1JG1K0qxatv0FjMdB9U0EtntOG_8IGMz4vVgmJBpd__G3dvUZSr-oNXBv39MBrlvKXoWEQ_vaEaqDyQaAjd_IoFdUDvCrAn4erAVC-uVess-KzYV8lZSM0Z4edY8vp9nBMvu8cDFfL4NrL5liCiqFulROWvrJygethefBTo-J03oQNEOvn9UjyytEaLbyxr0IWmCCxHJCcZ8B9Sz8ZrEB37pz3G7T87dcEBKt5ndZYPeZRR_XddpeXuKvMiM5GezkS9wMQofKqrs43BalS9KApd-OOHAltBCQ9bZUiBBvBpC3m5F7DoanJawmdHSzgGvupmJMZ3iITTdvzhI25O4wN4GjoCjVPen-rpObjqgOpasfNvxpq0PwNGmPxHCRnDDJINRMbyWWfzmYUa82lyKyUwsWLKQNGY7qEY',
        Version: '2021-04-15',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' });
  }
});

export default token_router;
