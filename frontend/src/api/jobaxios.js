import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';


const instance = axios.create({
    baseURL: JOB_API_END_POINT,
   
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  
  export const getAllJobs = async (searchedQuery) =>{
    try {
        const token = localStorage.getItem('token');
        console.log("in getalljobs",token);
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await instance.get(`/getalljobs?keyword=${searchedQuery}`,{
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

  export const getAllAdminJobs = async () =>{
    try {
        const token = localStorage.getItem('token');
        console.log("in getalldminjobs",token);
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await instance.get('/getpostedjobs',{
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
  export const getSingleJob = async (jobId) => {
    try {
        const token = localStorage.getItem('token');
        console.log("in getsinglejob",token);
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await instance.get(`/getjobbyid/${jobId}`,{
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

  export const postJob = async (input)=>{
    try {
      const token = localStorage.getItem('token');
      console.log("in postjob",token);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await instance.post('/addjob', input ,{
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