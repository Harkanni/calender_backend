import express from 'express';
import { createSchedule } from '../controllers/controller.js';
// import { createSchedule } from '../controllers/controller';

const router = express.Router();

router.post('/createSchedule', createSchedule);
router.get('/', (req, res) => {
   res.status(200).json('WELCOME');
})





export default router 