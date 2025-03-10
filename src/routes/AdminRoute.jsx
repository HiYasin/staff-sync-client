import { Navigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';

const AdminRoute = ({children}) => {
    const { userInfo, userLoading } = useAuth();
    //console.log(location);
    if(userLoading){
        return <div className='min-h-32 w-full flex justify-center'><span className="loading loading-lg"></span></div>
    }
    else if(userInfo.role === 'admin'){
        return children;
    }
};

export default AdminRoute;