import React from 'react';
import { MegaMenuWithHover } from '../components/shared/MegaMenuWithHover';
import { Outlet } from 'react-router-dom';
import { FooterWithSocialLinks } from '../components/shared/FooterWithSocialLinks';
import { ScrollRestoration } from "react-router-dom";

const Home = () => {
    return (
        <>
            <header className='fixed z-50 left-0 top-0 right-0'>
                <MegaMenuWithHover></MegaMenuWithHover>
            </header>
            <main className='px-4 pt-24 dark:bg-black dark:text-white'>
                <Outlet></Outlet>
            </main>
            <footer className='px-2 dark:bg-black dark:text-white'>
                <FooterWithSocialLinks></FooterWithSocialLinks>
            </footer>
            <ScrollRestoration />
        </>
    );
};

export default Home;