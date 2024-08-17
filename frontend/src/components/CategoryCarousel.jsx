import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
     "Full Stack Developer",
    "Data Science",
    "Cloud Solutions Architect",
    "Graphic Designer"
   
];
const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query)=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto my-20'>
            <CarouselContent>
                {
                    category.map((cat,index)=>(
                        <CarouselItem className='md:basis-1/3 lg-basis-1/3'>
                            <Button onClick={()=>searchJobHandler(cat)}  className='rounded-full bg-[#6A38C2]'>{cat}</Button>
                        </CarouselItem>
                    ))
                }
               
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel

