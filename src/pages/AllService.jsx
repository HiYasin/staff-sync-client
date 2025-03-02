import React, { useState } from 'react';
import { ComputerDesktopIcon, DevicePhoneMobileIcon, GlobeAltIcon, PencilIcon, PresentationChartLineIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import SectionTitle from '../components/shared/SectionTitle'
import { Select, Option, Button } from "@material-tailwind/react";
import ContainerX from '../components/shared/ContainerX';
const AllService = () => {
    const serviceList = [
        {
            icon: <DevicePhoneMobileIcon className='text-white'></DevicePhoneMobileIcon>,
            title: "Mobile App Solutions",
            description: "We design personalized mobile applications tailored to your strategic objectives, driving your business toward unparalleled growth.",
            starter: 90,
            premeium: 150,
            features: [
                "Custom app development",
                "Cross-platform compatibility",
                "User-friendly UI/UX",
                "Performance optimization",
                "Regular maintenance & updates"
            ]
        },
        {
            icon: <GlobeAltIcon className='text-white'></GlobeAltIcon>,
            title: "Website Development",
            description: "Our expert web developers create tailored websites, harnessing cutting-edge technology and the latest industry trends to deliver exceptional results.",
            starter: 80,
            premeium: 130,
            features: [
                "Responsive design",
                "SEO-friendly architecture",
                "E-commerce integration",
                "Fast loading speed",
                "Custom CMS development"
            ]
        },
        {
            icon: <ComputerDesktopIcon className='text-white'></ComputerDesktopIcon>,
            title: "UI/UX Design",
            description: "Leveraging advanced technology, Code-Owls creates user-focused UI/UX designs that enhance interaction and deliver exceptional experiences.",
            starter: 50,
            premeium: 80,
            features: [
                "User research & analysis",
                "Wireframing & prototyping",
                "Intuitive interface design",
                "Usability testing",
                "Responsive & accessible design"
            ]
        },
        {
            icon: <PencilIcon className='text-white'></PencilIcon>,
            title: "IT Consulting",
            description: "Code-Owls’s IT Consulting services provide strategic guidance and customized solutions to help businesses align their technology with overarching goals.",
            starter: 70,
            premeium: 100,
            features: [
                "Business technology assessment",
                "IT strategy development",
                "Cybersecurity consultation",
                "Cloud migration services",
                "Process automation solutions"
            ]
        },
        {
            icon: <WrenchScrewdriverIcon className='text-white'></WrenchScrewdriverIcon>,
            title: "IT Infrastructure",
            description: "Our IT Infrastructure team excels at creating strong, scalable, and secure systems that support and enhance your business operations.",
            starter: 200,
            premeium: 300,
            features: [
                "Network architecture design",
                "Cloud & on-premise solutions",
                "Data security & compliance",
                "Scalable storage solutions",
                "24/7 monitoring & support"
            ]
        },
        {
            icon: <PresentationChartLineIcon className='text-white'></PresentationChartLineIcon>,
            title: "Digital Marketing",
            description: "Our digital marketing team uses data-driven strategies across SEO, marketing, and advertising to achieve impactful results that drive growth.",
            starter: 60,
            premeium: 90,
            features: [
                "SEO optimization",
                "Content marketing",
                "Social media campaigns",
                "PPC & online ads",
                "Analytics & performance tracking"
            ]
        }
    ];

    const [services, setServices] = useState(serviceList);
    const handleSort = (sortOrder) => {
        const sortedServices = [...serviceList].sort((a, b) => a.starter - b.starter);
        if (sortOrder === 'asc') {
            setServices(sortedServices);
        } else {
            setServices(sortedServices.reverse());
        }

    }

    return (
        <ContainerX>
            <SectionTitle>Services</SectionTitle>
            <div className="w-fit mx-auto mb-5">
                <Select label="Sort By Price" onChange={(value) => handleSort(value)} >
                    <Option value="asc">Price Ascending</Option>
                    <Option value="desc">Price Descending</Option>
                </Select>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-10 pb-5 md:pb-10'>
                {
                    services.map((service, index) =>
                        <div key={index} className='grid justify-center text-center border-2 rounded-xl p-8 hover:border-gray-800 dark:border-gray-800 dark:hover:border-white transition-all duration-500 cursor-pointer group'>
                            <div className='w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-500 group-hover:bg-gray-900 p-2 transition-all duration-500'>
                                {service?.icon}
                            </div>
                            <h1 className='text-gray-900 text-2xl font-bold dark:text-white'>{service.title}</h1>
                            <ul className='text-gray-700 text-left list-disc w-fit mx-auto mt-3'>
                                {service.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                            <div className='w-full space-x-1 mt-5'>
                                <Button>Starter {service.starter}$</Button>
                                <Button>Premium {service.premeium}$</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </ContainerX>
    );
};

export default AllService;