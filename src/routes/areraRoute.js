import express from 'express';
import { routeDataCenter } from '../controllers/areraController.js';

const router = express.Router();

router.post('/route', routeDataCenter);

export default router;
