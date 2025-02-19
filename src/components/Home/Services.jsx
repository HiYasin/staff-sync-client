import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import { ComputerDesktopIcon, DevicePhoneMobileIcon, GlobeAltIcon, PencilIcon, PresentationChartLineIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const Services = () => {
    const services = [
        {
            icon: <DevicePhoneMobileIcon className='text-white'></DevicePhoneMobileIcon>,
            title: "Mobile App Solutions",
            description: "We design personalized mobile applications tailored to your strategic objectives, driving your business toward unparalleled growth."
        },
        {
            icon: <GlobeAltIcon className='text-white'></GlobeAltIcon>,
            title: "Website Development",
            description: "Our expert web developers create tailored websites, harnessing cutting-edge technology and the latest industry trends to deliver exceptional results."
        },
        {
            icon: <ComputerDesktopIcon className='text-white'></ComputerDesktopIcon>,
            title: "UI/UX Design",
            description: "Leveraging advanced technology, Code-Owls creates user-focused UI/UX designs that enhance interaction and deliver exceptional experiences."
        },
        {
            icon: <PencilIcon className='text-white'></PencilIcon>,
            title: "IT Consulting",
            description: "Code-Owls’s IT Consulting services provide strategic guidance and customized solutions to help businesses align their technology with overarching goals"
        },
        {
            icon: <WrenchScrewdriverIcon className='text-white'></WrenchScrewdriverIcon>,
            title: "IT Infrastructure",
            description: "Our IT Infrastructure team excels at creating strong, scalable, and secure systems that support and enhance your business operations."
        },
        {
            icon: <PresentationChartLineIcon className='text-white'></PresentationChartLineIcon>,
            title: "Digital Marketing",
            description: "Our digital marketing team uses data-driven strategies across SEO, marketing, and advertising to achieve impactful results that drive growth."
        }
    ];
    return (
        <div>
            <SectionTitle>Services</SectionTitle>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-10'>
                {
                    services.map((service, index) =>
                        <div key={index} className='grid justify-center text-center border-2 rounded-xl p-10 hover:border-gray-800 dark:border-gray-800 dark:hover:border-white transition-all duration-500 cursor-pointer group'>
                            <div className='w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-500 group-hover:bg-gray-900 p-2 transition-all duration-500'>
                                {service?.icon}
                            </div>
                            <h1 className='text-gray-900 text-2xl font-bold dark:text-white'>{service.title}</h1>
                            <p className='text-gray-700'>{service.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Services;