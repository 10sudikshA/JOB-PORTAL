import React, { useEffect } from 'react';
import Navbar from './shared/navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Home() {
    useGetAllJobs();
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user && user.role === 'recruiter'){
            navigate('/admin/companies');
        }
    },[user,navigate]);
    return (
        <>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </>

    )
}

export default Home;
