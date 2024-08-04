import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  
  if (!localStorage.getItem('token')){
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
