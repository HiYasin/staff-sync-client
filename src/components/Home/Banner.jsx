

import { Button } from '@material-tailwind/react';
import banner from '../../assets/banner.png'
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className='grid md:grid-cols-2 gap-10 justify-between items-center'>
            <div className='grid gap-4'>
                <h1 className='text-2xl md:text-3xl lg:text-5xl text-gray-900 font-bold text-balance text-center md:text-left dark:text-white'>
                    Transforming Ideas Into Exceptional Digital Solutions
                </h1>
                <h2 className='text-md md:text-lg lg:text-xl text-gray-900 text-balance text-center md:text-left dark:text-gray-600'>
                    Empowering businesses with cutting-edge web development, innovative design, and AI-driven technologies to shape a smarter future
                </h2>
                <div className='flex justify-center md:justify-start'>
                    <Button onClick={() => navigate('/signin')} className="dark:bg-white dark:text-black">Get Start</Button>
                </div>
            </div>
            <div className='border-black dark:border-white border-2 p-4 rounded-full'>
                <div className='rounded-full overflow-hidden'>
                    <img src={banner} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;