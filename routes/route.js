import express from 'express';
import { createSchedule, getAllSchedules } from '../controllers/controller.js';
// import { createSchedule } from '../controllers/controller';

const router = express.Router();

router.post('/createSchedule', createSchedule);

router.get('/schedules', getAllSchedules)

router.get('/', (req, res) => {
   res.status(200).json('WELCOME');
})





export default router 