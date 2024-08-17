import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';


const instance = axios.create({
    baseURL: APPLICATION_API_END_POINT,
   
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  
  


  export const applyJob = async (jobId)=>{
    try {
      const token = localStorage.getItem('token');
      console.log("in applyjob",token);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await instance.get(`/apply/jobid/${jobId}`,{
          headers: {
              Authorization: `Bearer ${token}`
           },
          withCredentials:true
      });

      return response.data;
      
    } catch (error) {
      throw error;
    }
  }
  export const getAllApplicants = async (jobId)=>{
    try {

      const token = localStorage.getItem('token');
      console.log("in getallapplicants",token);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await instance.get(`/jobid/${jobId}/applicants`,{
          headers: {
              Authorization: `Bearer ${token}`
           },
          withCredentials:true
      });

      return response.data;
      
    } catch (error) {
      throw error;
    }
  }


  export const updateStatus = async (status,id) => {
    try {

      const token = localStorage.getItem('token');
      console.log("in updatestatus",token);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await instance.post(`/status/id/${id}/update`,{status},{
          headers: {
              Authorization: `Bearer ${token}`
           },
          withCredentials:true
      });

      return response.data;
      
    } catch (error) {
      throw error;
    }

  }

  export const getAppliedJobs = async () => {
    try{
    const token = localStorage.getItem('token');
      console.log("in appliedjobs",token);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await instance.get('/getappliedjobs',{
          headers: {
              Authorization: `Bearer ${token}`
           },
          withCredentials:true
      });

      return response.data;
      
    } catch (error) {
      throw error;
    }
  }