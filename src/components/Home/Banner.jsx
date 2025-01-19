

import banner from '../../assets/banner.png'
const Banner = () => {
    return (
        <div className='grid md:grid-cols-2 gap-10 justify-between items-center'>
            <div className='grid gap-4'>
                <h1 className='text-2xl md:text-3xl lg:text-5xl text-gray-900 font-bold text-balance text-center md:text-left'>
                    Transforming Ideas Into Exceptional Digital Solutions
                </h1>
                <h2 className='text-md md:text-lg lg:text-xl text-gray-900 text-balance text-center md:text-left'>
                    Empowering businesses with cutting-edge web development, innovative design, and AI-driven technologies to shape a smarter future
                </h2>
            </div>
            <div className='border-black border-2 p-4 rounded-full'>
                <div className='rounded-full overflow-hidden'>
                    <img src={banner} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;