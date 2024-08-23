import {Application} from '../models/application_model.js';
import {Job} from '../models/job_model.js';


export const applyJob = async (req,res)=>{
    try {
        const userId = req.id;
        console.log(userId);
        const jobId = req.params.id;
        console.log(jobId);
        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required.",
                success:false
            })
        };
        //check if user have alredy applied for the job
        const exixtingApplication  = await Application.findOne({job:jobId , applicant:userId});

        if(exixtingApplication){
            return res.status(400).json({
                message:"You have already applied for this Job.",
                success:false
            })
        };

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };

        //create a  new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No applications yet.",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:"Job not found.",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        });


    } catch (error) {
        console.log(error);
    }
};


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required.",
                success:false
            });
        };

        //find application by application Id 
        const applicantion = await Application.findOne({_id:applicationId});
        if(!applicantion){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            });
        };
        //update status 
        // if(applicantion.status)
        console.log("in update status api",applicantion.status);
        if(applicantion.status==='pending'){
            applicantion.status = status.toLowerCase();
            await applicantion.save();
    
            return res.status(200).json({
                message:"Status updated successfully.",
                success:true
            })
        }else{
            console.log("status is already updated ",applicantion.status)
        }
      

    } catch (error) {
        console.log(error);
    }
};

