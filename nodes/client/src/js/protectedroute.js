import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let location = useLocation();
    if (localStorage.getItem("auth-token")!="authed" && location.pathname!="/") {
        return <Navigate to="/" state={{ from: location}} replace />
    }
    else if  (localStorage.getItem("auth-token")=="authed" && location.pathname=="/") {
        return <Navigate to="/SHome" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;
