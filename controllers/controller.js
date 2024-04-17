import { create_ghl_contact, refreshAuthToken } from '../lib/util.js';

import DB_model from '../models/model.js';
import TokenDB_model from '../models/token.js';

// export const createSchedule = async (req, res) => {
//   console.log('This is the request body: ', req.body);
//   let data = await req.body
//   const { session } = req.body
//   const startTime = session[0].time
// //   const endTime = session[session.length - 1].time
//   const { firstName, lastName, name, email, address: address1, locationId } = req.body;
//   const req_data = { firstName, lastName, name, email, address1, locationId };

//   try {
//     // Step 1: Make a POST request to create a contact
//     const url = 'https://services.leadconnectorhq.com/contacts/';
//     const options = {
//       method: 'POST',
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjYwMjNiNmY3Njk3OWVkZjM4MTk0ZDcyLWx1N3Q3NmVnIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNhbGVuZGFycy5yZWFkb25seSIsImNhbGVuZGFycy53cml0ZSIsImNhbGVuZGFycy9ldmVudHMucmVhZG9ubHkiLCJjYWxlbmRhcnMvZXZlbnRzLndyaXRlIiwiY29udGFjdHMucmVhZG9ubHkiLCJjb250YWN0cy53cml0ZSJdLCJjbGllbnQiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzIiLCJjbGllbnRLZXkiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzItbHU3dDc2ZWcifSwiaWF0IjoxNzEyNzQ4Njc4Ljg4MywiZXhwIjoxNzEyODM1MDc4Ljg4M30.N6J-Ms8uVhGhMGouGNfBPTD9ignCT8QdYTBq739gOw4uSjYYWgXWHYPk0H4jNFsD3adQqQnPPCe1F062cmmm6YIE6yrGoIOGMTEAsHFSJzeSjo6McFO3UBPlXShUjA6BgTknUWcpfPwt_akpBvxOdjJWYBkjzbUmJidUj4ASVNXGGtT3qUzx3SG0R09xn5HAGtl5FJiGEj861tNyNEkwoQ2Txv2QQCu4tawZkLSsz-3NyqwKX8SwhMAfpFjbcxg3q5NRFXClOS4jH52TfawplmQjh83A6KTfmO9NNEE8N38dRHFDALK76JK7OwkiQpeb6_7Bj1D5eck5tyEr1mKEGFYmlcyxLuJ4SXrB0cHyDV4sr2cEDqE26c6rI5GGOKt02kkhgI-Ue1JQGMSpByEIeqteWYE6_37mByCstpQj9VJq-9Zg5ZFAoFROkPb8fjTEmBs86MJBtcDtKLCNSXaXeIoPMS_IxABwFjeMtqvkxPrDKFq6tXmU2tQzA3HeXCIZt7pRUzmPm0344Ja5kzvfN5XT_tPpSpl5l3zSUwzJyUUycQENvZLM3-up2CNqsWUIpIpf-iJ4lS9edMflFZ8YJEYECz5qBCQJFCzy4wXuzeXM8Y5QHNfL1TxqtDuzbM9MtTSwkwZDSepGqbP2UamhaBt3eX7A_OCgLPyZS1LBaqw',
//         Version: '2021-07-28',
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(req_data)
//     };
//     const contactResponse = await fetch(url, options);
//     const contactData = await contactResponse.json();
//     console.log('This is contact data: ', contactData);

//     // Step 2: Make a POST request to create an appointment using the contactId
//     const appointmentResponse = await fetch(
//       'https://services.leadconnectorhq.com/calendars/events/appointments',
//       {
//         method: 'POST',
//         headers: {
//           Authorization:
//             'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjYwMjNiNmY3Njk3OWVkZjM4MTk0ZDcyLWx1N3Q3NmVnIiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiSm56UUFkNklXYXdkRnp1QkRLMHEiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImNhbGVuZGFycy5yZWFkb25seSIsImNhbGVuZGFycy53cml0ZSIsImNhbGVuZGFycy9ldmVudHMucmVhZG9ubHkiLCJjYWxlbmRhcnMvZXZlbnRzLndyaXRlIiwiY29udGFjdHMucmVhZG9ubHkiLCJjb250YWN0cy53cml0ZSJdLCJjbGllbnQiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzIiLCJjbGllbnRLZXkiOiI2NjAyM2I2Zjc2OTc5ZWRmMzgxOTRkNzItbHU3dDc2ZWcifSwiaWF0IjoxNzEyNzQ4Njc4Ljg4MywiZXhwIjoxNzEyODM1MDc4Ljg4M30.N6J-Ms8uVhGhMGouGNfBPTD9ignCT8QdYTBq739gOw4uSjYYWgXWHYPk0H4jNFsD3adQqQnPPCe1F062cmmm6YIE6yrGoIOGMTEAsHFSJzeSjo6McFO3UBPlXShUjA6BgTknUWcpfPwt_akpBvxOdjJWYBkjzbUmJidUj4ASVNXGGtT3qUzx3SG0R09xn5HAGtl5FJiGEj861tNyNEkwoQ2Txv2QQCu4tawZkLSsz-3NyqwKX8SwhMAfpFjbcxg3q5NRFXClOS4jH52TfawplmQjh83A6KTfmO9NNEE8N38dRHFDALK76JK7OwkiQpeb6_7Bj1D5eck5tyEr1mKEGFYmlcyxLuJ4SXrB0cHyDV4sr2cEDqE26c6rI5GGOKt02kkhgI-Ue1JQGMSpByEIeqteWYE6_37mByCstpQj9VJq-9Zg5ZFAoFROkPb8fjTEmBs86MJBtcDtKLCNSXaXeIoPMS_IxABwFjeMtqvkxPrDKFq6tXmU2tQzA3HeXCIZt7pRUzmPm0344Ja5kzvfN5XT_tPpSpl5l3zSUwzJyUUycQENvZLM3-up2CNqsWUIpIpf-iJ4lS9edMflFZ8YJEYECz5qBCQJFCzy4wXuzeXM8Y5QHNfL1TxqtDuzbM9MtTSwkwZDSepGqbP2UamhaBt3eX7A_OCgLPyZS1LBaqw',
//           Version: '2021-04-15',
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//          contactId: contactData.meta ? contactData.meta.contactId : contactData.contact.id,
//          calendarId: 'LyczXLUAFxx67tIiajiv',
//          locationId: 'JnzQAd6IWawdFzuBDK0q',
//          startTime: startTime,
//          // endTime: endTime,
//          ...data
//         })
//       }
//     );
//     const appointmentData = await appointmentResponse.json();
//     console.log('This is the appointment data: ', appointmentData);

//     // Step 3: Save the schedule data to MongoDB
//     const { firstName, lastName, email, address, dogBreed, session } = req.body;
//     const newSession = new DB_model({
//       firstName,
//       lastName,
//       email,
//       address,
//       dogBreed,
//       session
//     });
//     const savedSession = await newSession.save();

//     res.status(200).json({ contactData, appointmentData, savedSession });
//   } catch (error) {
//     console.error('An error occurred while processing the request:', error);
//     res
//       .status(500)
//       .json({ error: 'An error occurred while processing your request' });
//   }
// };

// import fetch from 'node-fetch';
// import DB_model from '../models/model.js';
let AUTH_TOKEN;

export const createSchedule = async (req, res) => {
  try {
    let access_token_db_data = await TokenDB_model.findOne({});
    AUTH_TOKEN = access_token_db_data.access_token;

    const {
      session,
      firstName,
      lastName,
      name,
      email,
      address: address1,
      locationId
    } = req.body;

    // Make a POST request to create a contact
    let contactResponse = await fetch(
      'https://services.leadconnectorhq.com/contacts/',
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          firstName,
          lastName,
          name,
          email,
          address1,
          locationId
        })
      }
    );

    // Check if the response status is unauthorized
    if (contactResponse.status === 401) {
      // Refresh authentication token
      AUTH_TOKEN = await refreshAuthToken();
      console.log('This is a new authentication token: ', AUTH_TOKEN);
      // Retry making the POST request to create a contact
      contactResponse = await fetch(
        'https://services.leadconnectorhq.com/contacts/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            Version: '2021-07-28',
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            name,
            email,
            address1,
            locationId
          })
        }
      );
    }
    let contactData = await contactResponse.json();
    console.log('This is contact data: ', contactData);

    // Make a POST request to create an appointment using the contactId
    const appointmentResponse = await fetch(
      'https://services.leadconnectorhq.com/calendars/events/appointments',
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          contactId: contactData.meta
            ? contactData.meta.contactId
            : contactData.contact.id,
          calendarId: 'LyczXLUAFxx67tIiajiv',
          locationId: 'JnzQAd6IWawdFzuBDK0q',
          startTime: session[0].time,
          ...req.body
        })
      }
    );
    const appointmentData = await appointmentResponse.json();

    // Save the schedule data to MongoDB
    const savedSession = await new DB_model(req.body).save();

    res.status(200).json({message: "scheduled created successfully", contactData, appointmentData, savedSession });
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const schedules = await DB_model.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    const totalClients = await DB_model.countDocuments();

    const totalPages = Math.ceil(totalClients / perPage);

    res.status(200).json({
      success: true,
      schedules,
      totalPages,
      totalClients
    });
  } catch (error) {
    console.error('Error fetching schedules from MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

function getHeaders() {
  return {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    Version: '2021-07-28',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}

// export const getAllSchedules = async (req, res) => {
//   // Get query parameters for pagination
//   const page = parseInt(req.query.page) || 1; // Default page is 1
//   const perPage = parseInt(req.query.perPage) || 10; // Default per page is 10

//   // Calculate start and end index based on pagination parameters
//   const startIndex = (page - 1) * perPage;
//   const endIndex = page * perPage;

//   try {
//     // Fetch all schedules from the database
//     const schedules = await DB_model.find();

//     // Slice the schedules array to get the subset for the current page
//     const paginatedSchedules = schedules.slice(startIndex, endIndex);

//     // Calculate total number of pages
//     const totalPages = Math.ceil(schedules.length / perPage);

//     // Send the paginated schedules and total pages as JSON response
//     res.status(200).json({
//       succes: true,
//       schedules: paginatedSchedules,
//       totalPages,
//       totalClients: schedules.length
//     });

//     //  res.status(200).json({ success: true, schedules: schedules });
//   } catch (error) {
//     console.error('Error fetching schedules from MongoDB:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };
