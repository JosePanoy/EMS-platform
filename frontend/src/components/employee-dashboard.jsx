import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import EmployeeMainBar from './employeesubcomponent/employee-mainbar';
import EmployeeSidePanel from './employeesubcomponent/employee-sidepanel';
import EmployeeNavbar from './employeesubcomponent/employee-Navbar';


function EmployeeMainDashboard() {
    const navigate = useNavigate();

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
            <h1 style={{ textAlign: 'center', margin: '10px 0 auto',fontSize: '1.7rem', cursor: 'default' }}>
                Employee Main Dashboard
            </h1>

 
  
            <Outlet context={employee} />
        </>
    );
}

export default EmployeeMainDashboard;
