
import { LOGIN_ROUTE, SUCCESS_ROUTE } from "utils/consts";
import Login from "./Login/Login";
import Success from "./Success/Success";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]
export const privateRoutes = [
    {
        path: SUCCESS_ROUTE,
        Component: Success
    }
]