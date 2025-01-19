import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layouts/Home";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children:[
            {
                path: "/",
                element:
            }
        ],
    },
]);

export default Router;