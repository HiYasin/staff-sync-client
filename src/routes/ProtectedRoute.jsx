import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';

const ProtectedRoute = ({children}) => {
    const { user, userLoading } = useAuth();
    const location = useLocation();
    //console.log(location);
    if(userLoading){
        // return <div className='min-h-32 w-full flex justify-center'><span className="loading loading-spinner loading-lg"></span></div>
        return <div className='min-h-32 w-full flex justify-center'><span className="loading loading-lg"></span></div>
    }
    else if(user){
        return children;
    }
    else{
        return <Navigate to={'/signin'}  state={{ from: location }}></Navigate>
    }
};

export default ProtectedRoute;


