import express from 'express';
import prController from '../controllers/productionRecord.js';
const router = express.Router();
const { selectBike, getRecords, getAllRecords } = prController;

router.post('/select-bike',selectBike);
router.get('/bike-data',getRecords);
router.get('/all_bike_data', getAllRecords);

export default router;