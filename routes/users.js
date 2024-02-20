import express from 'express';
import userController from '../controllers/users.js';
import authorizeUser from '../middleware/authguard.js';
const router = express.Router();
const { userRegister,userLogin,getEmployees,getUsername } = userController;

router.post('/user/register',userRegister);
router.post('/user/login',userLogin);
router.get('/get_employees',getEmployees);
router.get('/get_employees/:id',getEmployees);

export default router;