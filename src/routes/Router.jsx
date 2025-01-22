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
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement:<ErrorSection7></ErrorSection7>,
        children:[
            {
                path: "/",
                element: <PublicHome></PublicHome>
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
                path: "/dashboard",
                element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>,
                children: [
                    {
                        path: "/dashboard",
                        element: <ProtectedRoute><WrokSheet></WrokSheet></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/work-sheet",
                        element: <ProtectedRoute><WrokSheet></WrokSheet></ProtectedRoute>
                    },
                    {
                        path: "/dashboard/payment-history",
                        element: <ProtectedRoute><EmployeePaymentTable></EmployeePaymentTable></ProtectedRoute>
                    }
                ]
            },
            {
                path: "/error",
                element: <ErrorSection7></ErrorSection7>
            }
        ],
    },
]);

export default Router;