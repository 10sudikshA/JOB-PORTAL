import express from 'express';
import {getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company_controller.js';
import { memoryUpload} from '../middlewares/multer.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/register').post( registerCompany);
router.route('/getyourcompanies').get(getCompany);
router.route('/get/id/:id').get(getCompanyById);
router.route('/update/id/:id').put(memoryUpload,updateCompany);

export default router;