
import { Outlet } from "react-router-dom";
import Login from "../src/pages/Login";

export const isAuthorized = () => {
  return  JSON.parse(localStorage.getItem("Auth"))
};

export const ProtectedRoutes = () => {

    const isAuth = isAuthorized()
  return isAuth ? <Outlet /> : <Login />;
};
