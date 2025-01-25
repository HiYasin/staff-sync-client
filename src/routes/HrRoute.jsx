import { Navigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';
import Spinner from '../components/shared/Spinner';
import { useEffect, useState } from 'react';

const HrRoute = ({children}) => {
    const { userInfo, userLoading } = useAuth();
    //console.log(userInfo, userLoading);
    if(userLoading) {
        return <Spinner></Spinner>
    }
    else if(userInfo.role === 'hr'){
        return children;
    }

};

export default HrRoute;