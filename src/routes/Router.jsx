import { createBrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import PublicHome from "../pages/PublicHome";
import ErrorSection7 from "../components/shared/ErrorSection7";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import WrokSheet from "../components/Dashboard/WorkSheet";
import EmployeePaymentTable from "../components/Dashboard/EmployeePaymentTable";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeRoute from "./EmployeeRoute";
import HrRoute from "./HrRoute";
import AdminRoute from "./AdminRoute";
import EmployeeList from "../components/Dashboard/EmployeeList";
import Progress from "../components/Dashboard/Progress";
import EmployeeDetails from "../pages/EmployeeDetails";
import PaymentRequest from "../components/Dashboard/PaymentRequest";
import AllEmployee from "../components/Dashboard/AllEmployee";
import AllEmployeeCard from "../components/Dashboard/AllEmployee";
// import AllService from "../components/Dashboard/AllService";
import Inbox from "../pages/Inbox";
import AllService from "../pages/AllService";
import Profile from "../pages/Profile";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorSection7></ErrorSection7>,
        children: [
            {
                path: "/",
                element: <PublicHome></PublicHome>
            },
            {
                path: "/all-service",
                element: <AllService></AllService>
            },
            {
                path: '/inbox',
                element: <ProtectedRoute><AdminRoute><Inbox></Inbox></AdminRoute></ProtectedRoute>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/profile",
                element: <ProtectedRoute><Profile></Profile></ProtectedRoute>
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>,
                children: [
                    {
                        path: "/dashboard"
                    },
                    {
                        path: "/dashboard/work-sheet",
                        element: <ProtectedRoute><EmployeeRoute><WrokSheet></WrokSheet></EmployeeRoute></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/payment-history",
                        element: <ProtectedRoute><EmployeeRoute><EmployeePaymentTable></EmployeePaymentTable></EmployeeRoute></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/employee-list",
                        element: <ProtectedRoute><HrRoute><EmployeeList></EmployeeList></HrRoute></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/progress",
                        element: <ProtectedRoute><HrRoute><Progress></Progress></HrRoute></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/payment-request",
                        element: <ProtectedRoute><AdminRoute><PaymentRequest></PaymentRequest></AdminRoute></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/all-employee",
                        element: <ProtectedRoute><AdminRoute><AllEmployee></AllEmployee></AdminRoute></ProtectedRoute>
                    }
                ]
            },

            {
                path: "/employee/:id",
                element: <ProtectedRoute><HrRoute><EmployeeDetails></EmployeeDetails></HrRoute></ProtectedRoute>
            },
            {
                path: "/error",
                element: <ErrorSection7></ErrorSection7>
            }
        ],
    },
]);

export default Router;