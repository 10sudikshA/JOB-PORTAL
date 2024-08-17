// import axios from 'axios'
import { useEffect } from 'react';
import { getAllJobs } from '@/api/jobaxios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await getAllJobs(searchedQuery);
                if (res.success) {
                    dispatch(setAllJobs(res.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[]);
}

export default useGetAllJobs
