import React from 'react';
import ContainerX from '../components/shared/ContainerX';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../customHooks/useAxiosSecure';

const Inbox = () => {
    const axiosSecure = useAxiosSecure();
    const { data: message = [] } = useQuery({
        queryKey: ['message'],
        queryFn: async () => {
            const res = await axiosSecure.get('/inbox');
            return res.data;
        }
    });
    console.log(message);
    return (
        <>
            <ContainerX>
                <h1 className="text-3xl font-bold mb-4 text-center">Inbox</h1>
                <div className="grid md:grid-cols-3 justify-between gap-5">
                    {message.map((msg, index) => (
                        <div key={index} className="shadow-md rounded-lg p-6 mb-4 bg-gray-200">
                            <h3 className=" bg-white mb-2 border border-blue-gray-200 rounded-md p-2">Name: <span className='font-semibold'>{msg.name}</span></h3>
                            <p className=" bg-white mb-2  border border-blue-gray-200 rounded-md p-2">Email: <span className='text-blue-600'>{msg.email}</span></p>
                            <p className=" bg-white text-gray-700 border border-blue-gray-200 rounded-md p-2">{msg.message}</p>
                        </div>
                    ))}
                </div>
            </ContainerX>
        </>
    );
};

export default Inbox;