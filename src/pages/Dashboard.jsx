import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import HrDashboard from "../components/Dashboard/HrDashboard";
import ContainerX from "../components/shared/ContainerX";
import useAuth from "../customHooks/useAuth";
import Spinner from "../components/shared/Spinner";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { userInfo, logOut } = useAuth();
    // console.log( userInfo );
    if(userInfo !== null){
        return (
            <div>
                <ContainerX>
                    { userInfo.role==="employee" && <EmployeeDashboard></EmployeeDashboard> }
                    { userInfo.role==="hr" && <HrDashboard></HrDashboard> }
                </ContainerX>
            </div>
        );
    }else{
        logOut();
        <Navigate to={'/signin'}></Navigate>
    }
    
};

export default Dashboard;