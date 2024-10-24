import Login from "../../frontend/src/pages/Login";
import { Outlet } from "react-router-dom"



export const isAuthorized = () => {
    return localStorage.getItem("Auth") === "true";
};

export const ProtectedRoutes = () => {
    return isAuthorized() ? <Outlet /> : <Login />;
};
