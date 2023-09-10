const express = require('express');
const router = express.Router();
const { selectBike,getRecords } = require('../controllers/productionRecord');


router.post('/select-bike',selectBike);
router.get('/bike-data/?:username/?:date',getRecords);

module.exports = router;