import { Navigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';

const HrRoute = ({children}) => {
    const { userInfo, userLoading } = useAuth();
    //console.log(location);
    if(userLoading){
        return <div className='min-h-32 w-full flex justify-center'><span className="loading loading-lg"></span></div>
    }
    else if(userInfo.role === 'hr'){
        return children;
    }
    else{
        return <Navigate to={'/'} />
    }
};

export default HrRoute;