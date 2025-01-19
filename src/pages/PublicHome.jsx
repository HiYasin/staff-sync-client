import React from 'react';
import ContainerX from '../components/shared/ContainerX';
import Banner from '../components/Home/Banner';
import Services from '../components/Home/Services';
import LogoSection6 from '../components/Home/LogoSection6';
import Faqs4 from '../components/Home/Faqs4';
import Testimonial from '../components/Home/Testimonial';
const PublicHome = () => {
    return (
        <div className='my-10'>
            <ContainerX>
                <Banner></Banner>
                <Services></Services>
                <LogoSection6></LogoSection6>
                <Testimonial></Testimonial>
                <Faqs4></Faqs4>
            </ContainerX>
        </div>
    );
};

export default PublicHome;