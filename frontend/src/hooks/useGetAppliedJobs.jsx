import { getAppliedJobs } from '@/api/applicationaxios';
import { setAllAppliedJobs } from '@/redux/jobSlice';
// import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = ()=>{
    const dispatch  = useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async ()=>{
            try {
                const res = await getAppliedJobs();
                if(res.success){
                    dispatch(setAllAppliedJobs(res.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[]);
}
export default useGetAppliedJobs;