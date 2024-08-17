import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCompanies } from '@/api/companyaxios';
import { setCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getAllCompanies();
                if (res.success) {
                    dispatch(setCompanies(res.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[]);
}

export default useGetAllCompanies
