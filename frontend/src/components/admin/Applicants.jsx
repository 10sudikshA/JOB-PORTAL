import React, { useEffect } from 'react'
import Navbar from '../shared/navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { getAllApplicants } from '@/api/applicationaxios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application);
  useEffect(()=>{
    const fetchAllApplicants = async () =>{
      try {
        const res = await getAllApplicants(params.id);
        console.log("res",res);
        if(res.success){
          dispatch(setAllApplicants(res.job));
        }
        
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  },[]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants