import React from 'react';
import { MegaMenuWithHover } from '../components/shared/MegaMenuWithHover';
import { Outlet } from 'react-router-dom';
import { FooterWithSocialLinks } from '../components/shared/FooterWithSocialLinks';

const Home = () => {
    return (
        <>
            <header className='px-2 fixed z-50 left-0 top-1 right-0'>
                <MegaMenuWithHover></MegaMenuWithHover>
            </header>
            <main className='px-4 mt-20'>
                <Outlet></Outlet>
            </main>
            <footer className='px-2'>
                <FooterWithSocialLinks></FooterWithSocialLinks>
            </footer>
        </>
    );
};

export default Home;