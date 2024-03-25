import DB_model from '../models/model.js';

export const createSchedule = async (req, res) => {
  try {
    const { firstName, lastName, email, address, dogBreed, session } = req.body;

    if (!firstName || !lastName || !dogBreed) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid user information' });
    }

    // Validate sessionData
    const isValidSession = session.some(
      (session) => session.date && session.time
    );

    if (!isValidSession) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid session data' });
    }

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

export const getAllSchedules = async (req, res) => {
  // Get query parameters for pagination
  const page = parseInt(req.query.page) || 1; // Default page is 1
  const perPage = parseInt(req.query.perPage) || 10; // Default per page is 10

  // Calculate start and end index based on pagination parameters
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  try {
    // Fetch all schedules from the database
    const schedules = await DB_model.find();


    // Slice the schedules array to get the subset for the current page
    const paginatedSchedules = schedules.slice(startIndex, endIndex);

    // Calculate total number of pages
    const totalPages = Math.ceil(schedules.length / perPage);

    // Send the paginated schedules and total pages as JSON response
    res.status(200).json({succes: true, schedules: paginatedSchedules, totalPages });

   //  res.status(200).json({ success: true, schedules: schedules });

  } catch (error) {
    console.error('Error fetching schedules from MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
