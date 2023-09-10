import express from 'express';
import userController from '../controllers/users.js';
import authorizeUser from '../middleware/authguard.js';
const router = express.Router();
const { userRegister,userLogin } = userController;

router.post('/user/register',userRegister);
router.post('/user/login',userLogin);

export default router;