import React from 'react';

const SectionTitle = ({children}) => {
    return (
        <div className='text-center font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-900 py-5 md:py-10'>
            {children}
        </div>
    );
};

export default SectionTitle;