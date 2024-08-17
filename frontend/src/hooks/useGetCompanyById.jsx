import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleCompany } from '@/api/companyaxios';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await getSingleCompany(companyId);
                if (res.success) {
                    dispatch(setSingleCompany(res.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch]);
}

export default useGetCompanyById
