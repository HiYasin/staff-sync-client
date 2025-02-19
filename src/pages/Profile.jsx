import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../customHooks/useAxios';
import ContainerX from '../components/shared/ContainerX';
import { Avatar, Typography } from '@material-tailwind/react';
import Chart from '../components/shared/Chart';
import useAuth from '../customHooks/useAuth';
const Profile = () => {
    const { userInfo } = useAuth();

    const { _id, bank_account, designation, email, image, name, role, salary, verified } = userInfo;
// console.log(userInfo);


    return (
        <ContainerX>
            <div className="my-10 rounded-xl bg-gray-100 dark:bg-gray-700 p-10 flex flex-col items-center w-full">
                {
                    <Avatar
                        variant="circular"
                        size="xxl"
                        alt={name}
                        className="border border-gray-900 p-0.5 dark:border-gray-300"
                        src={image}
                    />
                }
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center mt-5 *:border-2 *:p-5 *:rounded-lg">
                    <div className='space-y-4 bg-gray-300 dark:bg-black dark:text-white dark:border-white border-gray-900'>
                        <h2>Name</h2>
                        <span className='text-gray-900 dark:text-gray-600 font-semibold '>{name}</span>
                    </div>
                    <div className='space-y-4 bg-gray-300 dark:bg-black dark:text-white dark:border-white border-gray-900'>
                        <h2>Email</h2>
                        <span className='text-gray-900 dark:text-gray-600 font-semibold '>{email}</span>
                    </div>
                    <div className='space-y-4 bg-gray-300 dark:bg-black dark:text-white dark:border-white border-gray-900'>
                        <h2>Role</h2>
                        <span className='text-gray-900 dark:text-gray-600 font-semibold '>{role}</span>
                    </div>
                    <div className='space-y-4 bg-gray-300 dark:bg-black dark:text-white dark:border-white border-gray-900'>
                        <h2>Salary</h2>
                        <span className='text-gray-900 dark:text-gray-600 font-semibold '>{salary}</span>
                    </div>
                    <div className='space-y-4 bg-gray-300 dark:bg-black dark:text-white dark:border-white border-gray-900'>
                        <h2>Designation</h2>
                        <span className='text-gray-900 dark:text-gray-600 font-semibold '>{designation}</span>
                    </div>
                    <div className='space-y-4 bg-gray-300 dark:bg-black dark:text-white dark:border-white border-gray-900'>
                        <h2>Verification Status</h2>
                        {
                            verified ?
                                <span className='px-3 py-1.5 bg-green-100 text-green-800 rounded-full'>Verified</span>
                                :
                                <span className='px-3 py-1.5 bg-red-100 text-red-800 rounded-full'>Unverified</span>
                        }
                    </div>

                </div>
            </div>
            <div className='flex items-center flex-col'>
                <h1 className='text-gray-900 text-xl font-semibold my-5'>Salary Chart</h1>
                <Chart email={email}></Chart>
            </div>
        </ContainerX>
    );
};

export default Profile;


