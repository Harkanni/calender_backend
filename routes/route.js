import express from 'express';
import { createSchedule } from '../controllers/controller.js';
// import { createSchedule } from '../controllers/controller';

const router = express.Router();

router.get('/createSchedule', createSchedule);





export default router 