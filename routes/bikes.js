import express from 'express';
import bikeController from '../controllers/bikes.js';
const { createBikes, getBikes } = bikeController;
const router = express.Router();

router.route('/bikes')
.post(createBikes)
.get(getBikes);

export default router;