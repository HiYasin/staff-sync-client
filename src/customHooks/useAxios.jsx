import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
const axiosPublic = axios.create({
    base_URL: 'http://localhost:3000',
    withCredentials: true,
});

const useAxios = () => {
    const axiosSecure = useAxiosSecure();
    return [axiosSecure, axiosPublic];
};

export default useAxios;