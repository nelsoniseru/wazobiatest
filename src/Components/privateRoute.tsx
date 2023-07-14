import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard'


const ProtectedRoute = () => {
    const auth = !!localStorage.getItem("token");
    return auth ? <Dashboard/> : <Navigate to="/login" />;
}

export default ProtectedRoute;