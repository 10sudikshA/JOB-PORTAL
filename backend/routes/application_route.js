import express from 'express';
import {applyJob , getAppliedJobs ,getApplicants ,updateStatus } from '../controllers/application_controller.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/apply/jobid/:id').get(applyJob);
router.route('/getappliedjobs').get( getAppliedJobs);
router.route('/jobid/:id/applicants').get(getApplicants);
router.route('/status/id/:id/update').post(updateStatus);

export default router;