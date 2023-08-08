import express from 'express';
import { getAllList, getUserInfo, loginUser, logout, registerUser, updateUser } from '../controller/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.put("/update",updateUser);
router.get("/userInfo",isAuthenticated,getUserInfo);
router.get("/allList",isAuthenticated,getAllList);
router.get("/logout",logout);


export default router;