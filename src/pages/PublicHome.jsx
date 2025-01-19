import React from 'react';
import ContainerX from '../components/shared/ContainerX';
import Banner from '../components/Home/Banner';
import Services from '../components/Home/Services';
const PublicHome = () => {
    return (
        <div className='my-10'>
            <ContainerX>
                <Banner></Banner>
                <Services></Services>
            </ContainerX>
        </div>
    );
};

export default PublicHome;