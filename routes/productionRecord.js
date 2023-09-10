const express = require('express');
const router = express.Router();
const { selectBike,getRecords, getAllRecords } = require('../controllers/productionRecord');


router.post('/select-bike',selectBike);
router.get('/bike-data/?:username/?:date',getRecords);
router.get('/all_bike_data', getAllRecords);

module.exports = router;