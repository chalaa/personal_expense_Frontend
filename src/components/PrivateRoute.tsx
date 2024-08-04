import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!localStorage.getItem('token')){
    return <Navigate to="/login" replace />;
  }
  else{
    const token = localStorage.getItem('token');
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const expirationTimestamp = token?jwtDecode(token).exp:null;
    if (!expirationTimestamp || expirationTimestamp < currentTimestampInSeconds ){
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default PrivateRoute;
