import express from 'express';
import { login, register, updateProfile ,logout } from '../controllers/user_controller.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';
import { memoryUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(memoryUpload,register);
router.route('/login').post(login);
router.route('/profile/update').post(singleUpload,updateProfile);
router.route('/logout').get(logout);

export default router;