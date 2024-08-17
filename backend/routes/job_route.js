import express from 'express';
import { postJob , getJobById , getAllJobs , getAdminJobs } from '../controllers/job_controller.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/addjob').post(postJob);
router.route('/getalljobs').get(getAllJobs);
router.route('/getjobbyid/:id').get(getJobById);
router.route('/getpostedjobs').get( getAdminJobs);

export default router;