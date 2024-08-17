// import axios from 'axios'
import { useEffect } from 'react';
import { getAllAdminJobs } from '@/api/jobaxios';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '@/redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await getAllAdminJobs();
                if (res.success) {
                    dispatch(setAllAdminJobs(res.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[]);
}

export default useGetAllAdminJobs
