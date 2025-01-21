import axios from 'axios';
const axiosPublic = axios.create({
    base_URL: 'http://localhost:3000',
});
const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxios = () => {
    return [axiosSecure, axiosPublic];
};

export default useAxios;