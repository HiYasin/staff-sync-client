import React from 'react';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const TestimonialCard = ({ testimonial }) => {
    const { name, details, rating } = testimonial
    return (
        <div className='pb-10 grid justify-center gap-5 text-center w-10/12 mx-auto'>
            <div className='flex justify-center'>
                <Rating value={rating} style={{ maxWidth: 100 }} max={5} readOnly />
            </div>
            <p className='text-3xl md:text-5xl lg:text-7xl'>,,</p>
            <p className='text-md md:text-xl lg:text-2xl text-gray-700'>{details}</p>
            <p className='text-xl md:text-2xl lg:text-4xl'>{name}</p>
        </div>
    );
};

export default TestimonialCard;