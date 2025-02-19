import React from 'react';

const SectionTitle = ({children}) => {
    return (
        <div className='text-center font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-800 py-5 md:py-10 dark:text-white'>
            {children}
        </div>
    );
};

export default SectionTitle;