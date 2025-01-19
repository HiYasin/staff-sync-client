import React from 'react';
import ContainerX from '../components/shared/ContainerX';
import Banner from '../components/Home/Banner';
import Services from '../components/Home/Services';
import LogoSection6 from '../components/Home/LogoSection6';
const PublicHome = () => {
    return (
        <div className='my-10'>
            <ContainerX>
                <Banner></Banner>
                <Services></Services>
                <LogoSection6></LogoSection6>
                
            </ContainerX>
        </div>
    );
};

export default PublicHome;