import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import ContainerX from "../components/shared/ContainerX";
import useAuth from "../customHooks/useAuth";

const Dashboard = () => {
    const { userInfo } = useAuth();
    console.log( userInfo );
    return (
        <div>
            <ContainerX>
                <EmployeeDashboard></EmployeeDashboard>
            </ContainerX>
        </div>
    );
};

export default Dashboard;