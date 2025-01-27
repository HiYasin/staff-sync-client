import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});
const useAxiosSecure = () => {
    const { logOut } = useAuth();


    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        //console.log("Checking access token:", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (err) {
        //console.log("Error in interceptor:", err);
        return Promise.reject(err);
    });
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    },async(error)=> {
        //console.log("Error in interceptor:", error.response);
        //console.log(error.response.status, error.response.statusText);
        const status = error.status;
        if (status === 401 || status === 403) {
            //console.log('Error from here');
            Swal.fire({
                title: "Error!",
                text: `Request failed with status code ${status}`,
                icon: "error",
                confirmButtonText: "OK",
              });
            await logOut();
        }
        return Promise.reject(error.response);
    })

    return axiosSecure;
};
export default useAxiosSecure;


