import appConfig from '../config.json' assert { type: 'json' };

export const create_ghl_contact = async () => {
  // const fetch = require('node-fetch'); // Assuming you're using Node.js

  const data = {
    firstName: 'Rosan',
    lastName: 'Deo',
    name: 'Rosan Deo',
    email: 'rosan@deos.com',
    locationId: 'JnzQAd6IWawdFzuBDK0q',
    gender: 'male',
    phone: '+1 888-888-8888',
    address1: '3535 1st St N',
    city: 'Dolomite',
    state: 'AL',
    postalCode: '35061',
    website: 'https://www.tesla.com',
    timezone: 'America/Chihuahua',
    dnd: true,
    dndSettings: {
      Call: {
        status: 'active',
        message: 'string',
        code: 'string'
      },
      Email: {
        status: 'active',
        message: 'string',
        code: 'string'
      },
      SMS: {
        status: 'active',
        message: 'string',
        code: 'string'
      },
      WhatsApp: {
        status: 'active',
        message: 'string',
        code: 'string'
      },
      GMB: {
        status: 'active',
        message: 'string',
        code: 'string'
      },
      FB: {
        status: 'active',
        message: 'string',
        code: 'string'
      }
    },
    inboundDndSettings: {
      all: {
        status: 'active',
        message: 'string'
      }
    },
    tags: ['nisi sint commodo amet', 'consequat'],
    customFields: [
      {
        id: '6dvNaf7VhkQ9snc5vnjJ',
        key: 'my_custom_field',
        field_value: '9039160788'
      }
    ],
    source: 'public api',
    country: 'US',
    companyName: 'DGS VolMAX'
  };

  const url = 'http://localhost:3000/createContact'; // Replace with your server URL
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const response = await fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error('Error:', error));
};

export const create_ghl_appointment = async (response) => {};

export const create_mongodb_session = async () => {
  try {
    // Create a new Session instance with the received data
    const newSession = new DB_model({
      firstName,
      lastName,
      email,
      address,
      dogBreed,
      session
    });

    // Save the new session to MongoDB
    const savedSession = await newSession.save();

    console.log('session saved to MongoDB: ', savedSession);
    res.status(200).json({ success: true, savedSession });
  } catch (error) {
    console.error('Error saving session to MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Function to refresh the authentication token
export const refreshAuthToken = async () => {
  try {
    const refreshTokenResponse = await fetch('http://localhost:8080/api/v1/auth/refreshToken', {});
    const refreshTokenData = await refreshTokenResponse.json();
   //  console.log(refreshTokenData)

    return refreshTokenData.data.access_token; // Assuming the new AUTH_TOKEN is provided in the response
  } catch (error) {
    console.error('Error refreshing authentication token:', error);
    throw new Error('Failed to refresh authentication token');
  }
};
