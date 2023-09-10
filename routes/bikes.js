const express = require('express');
const router = express.Router();
const { createBikes, getBikes } = require('../controllers/bikes');


router.route('/bikes')
.post(createBikes)
.get(getBikes);

module.exports = router;