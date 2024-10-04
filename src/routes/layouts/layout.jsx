import { useEffect } from 'react';
import { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/Navbar';
import { AdminContext } from '../../context/AdminContext';
import { AuthContext } from '../../context/AuthoContext';
import HomePage from '../homePage/homePage';
import './layout.scss';

function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <NavBar></NavBar>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

function RequriedAuth() {
    const { currentUser } = useContext(AuthContext)
    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate("/login")
    //     }
    // }, [currentUser])
    return (
        !currentUser ?
            <Navigate to="/login" />
            :
            (
                <div className="layout">
                    <div className="navbar">
                        <NavBar></NavBar>
                    </div>
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            )
    );
}

function RequriedAdminAuth() {
    const { currentAdmin } = useContext(AdminContext)
    return (
        !currentAdmin ?
            <Navigate to="/admin-login" />
            :
            (
                <div>
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            )
    );
}

export { Layout, RequriedAuth, RequriedAdminAuth };