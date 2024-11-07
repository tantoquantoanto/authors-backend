
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { isAuthorized } from "../middleWares/ProtectedRoutes.jsx";
import { isTokenExpired } from "../utilities/checkTokenExpiration.js";


const useSession = () => {
    const session = isAuthorized();
    const decodedSession = session ? jwtDecode(session) : null

    const navigate = useNavigate()


    useEffect(() => {
        if (!session || isTokenExpired(decodedSession.exp, () => navigate('/'))) {
            navigate("/")
        }

    }, [navigate, session]);

    return decodedSession
}

export default useSession


