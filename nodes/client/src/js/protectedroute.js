import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let location = useLocation();
    if (localStorage.getItem("user-token")!="authed" && location.pathname!="/") {
        return <Navigate to="/" state={{ from: location}} replace />
    }
    else if  (localStorage.getItem("user-token")=="authed" && location.pathname=="/") {
        return <Navigate to="/Home" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;
