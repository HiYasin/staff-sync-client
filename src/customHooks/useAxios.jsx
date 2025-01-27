import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
const axiosPublic = axios.create({
    base_URL: 'https://staff-sync-server.vercel.app',
    withCredentials: true,
});

const useAxios = () => {
    const axiosSecure = useAxiosSecure();
    return [axiosSecure, axiosPublic];
};

export default useAxios;