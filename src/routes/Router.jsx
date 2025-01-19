import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layouts/Home";
import PublicHome from "../pages/PublicHome";
import ErrorSection7 from "../components/shared/ErrorSection7";
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
                path: "/error",
                element: <ErrorSection7></ErrorSection7>
            }
        ],
    },
]);

export default Router;