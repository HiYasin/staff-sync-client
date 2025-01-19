import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const Services = () => {
    const services = [
        {
            icon: "hello",
            title: "Mobile App Solutions",
            description: "We design personalized mobile applications tailored to your strategic objectives, driving your business toward unparalleled growth."
        },
        {
            title: "Website Development",
            description: "Our expert web developers create tailored websites, harnessing cutting-edge technology and the latest industry trends to deliver exceptional results."
        },
        {
            title: "UI/UX Design",
            description: "Leveraging advanced technology, Code-Owls creates user-focused UI/UX designs that enhance interaction and deliver exceptional experiences."
        },
        {
            title: "IT Consulting",
            description: "Code-Owls’s IT Consulting services provide strategic guidance and customized solutions to help businesses align their technology with overarching goals"
        },
        {
            title: "IT Infrastructure",
            description: "Our IT Infrastructure team excels at creating strong, scalable, and secure systems that support and enhance your business operations."
        },
        {
            title: "Digital Marketing",
            description: "Our digital marketing team uses data-driven strategies across SEO, marketing, and advertising to achieve impactful results that drive growth."
        }
    ];
    return (
        <div>
            <SectionTitle>Services</SectionTitle>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-10'>
                {
                    services.map((service,index) =>
                        <div key={index} className='grid justify-center text-center border-2 rounded-md p-10 hover:border-gray-800 transition-all duration-500 cursor-pointer'>
                            <h1 className='text-gray-900 text-2xl font-bold'>{service.title}</h1>
                            <p className='text-gray-700 '>{service.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Services;