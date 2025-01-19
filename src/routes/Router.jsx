import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layouts/Home";
import PublicHome from "../pages/PublicHome";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children:[
            {
                path: "/",
                element: <PublicHome></PublicHome>
            }
        ],
    },
]);

export default Router;