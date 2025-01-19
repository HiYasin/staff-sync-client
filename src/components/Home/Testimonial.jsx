import React, { useEffect, useState } from 'react';
import TestimonialCard from '../../components/Home/TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SectionHeading from '../../components/Shared/SectionHeading';

const Testimonial = () => {
    const [testimonial, setTestimonial] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setTestimonial(data));
    }, [])
    return (
        <div className='pb-10'>
            <SectionHeading title={'TESTIMONIALS'} subtitle={'---What Our Clients Say---'}></SectionHeading>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    testimonial.map(testimonial => <SwiperSlide key={testimonial._id}>
                        <TestimonialCard testimonial={testimonial}></TestimonialCard>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;