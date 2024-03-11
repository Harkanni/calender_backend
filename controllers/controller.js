import DB_model from '../models/model.js';

export const createSchedule = async (req, res) => {
  try {
    const { firstName, lastName, address, dogBreed, session } = req.body;


    if (!firstName || !lastName || !dogBreed) {
      return res.status(400).json({ success: false, error: 'Invalid user information' });
    }

    // Validate sessionData
    const isValidSession = sessionData.some(session => session.date && session.time);

    if (!isValidSession) {
      return res.status(400).json({ success: false, error: 'Invalid session data' });
    }

    // Create a new Session instance with the received data
    const newSession = new DB_model({
      firstName,
      lastName,
      address,
      dogBreed,
      session
    });

    // Save the new session to MongoDB
    const savedSession = await newSession.save();

    console.log("session saved to MongoDB: ", savedSession);
    res.status(200).json({ success: true, savedSession });
  } catch (error) {
    console.error('Error saving session to MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getAllSchedules = async (req, res) => {
   try {
      // Fetch all schedules from the database
      const allSchedules = await DB_model.find();
  
      res.status(200).json({ success: true, schedules: allSchedules });
    } catch (error) {
      console.error('Error fetching schedules from MongoDB:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}