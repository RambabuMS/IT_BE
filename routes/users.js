const express = require('express');
const router = express.Router();
const { userRegister,userLogin } = require('../controllers/users');
const authorizeUser = require('../middleware/authguard');



router.post('/user/register',userRegister);
router.post('/user/login',userLogin);

module.exports = router;