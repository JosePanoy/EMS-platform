import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import EmployeeMainBar from './employeesubcomponent/employee-mainbar';
import EmployeeSidePanel from './employeesubcomponent/employee-sidepanel';
import EmployeeNavbar from './employeesubcomponent/employee-Navbar';
import EmployeeMainDash from './employeesubcomponent/employee-maindash';

function EmployeeMainDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const employee = JSON.parse(localStorage.getItem('employee'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('employee');
        navigate('/');
    };

    return (
        <>
            <EmployeeNavbar handleLogout={handleLogout} employee={employee} />
            <EmployeeMainBar />
            <EmployeeSidePanel />
            
            {/* Only show EmployeeMainDash on /employee route */}
            {location.pathname === '/employee' && <EmployeeMainDash employee={employee} />}
            
            <Outlet context={employee} />
        </>
    );
}

export default EmployeeMainDashboard;
