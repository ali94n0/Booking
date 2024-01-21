import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


function ProtectRoute({children}) {
    const{user,isAuth} = useAuth()

    if(!user || !isAuth)return <Navigate to={"/"}  replace/>
    return (
        children
    );
}

export default ProtectRoute;