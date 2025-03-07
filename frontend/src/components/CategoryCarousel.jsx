import React, { useContext } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ThemeContext } from '@/ThemeContext';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline"  className={`${theme === "dark" ? "bg-[#272727] border-none outline-none text-gray-400 hover:bg-gray-300" : ""}`}>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious  className={`${theme === "dark" ? "bg-gray-600 outline-none border-none text-white" : ""}`} />
                <CarouselNext className={`${theme === "dark" ? "bg-gray-600 outline-none border-none text-white" : ""}`} />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel