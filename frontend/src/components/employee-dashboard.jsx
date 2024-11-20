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
            <h1 style={{ textAlign: 'center', margin: '50px 0 auto' }}>
                Employee Main Dashboard
            </h1>
            {employee && <h2 style={{ textAlign: 'center' }}>{`Welcome, ${employee.firstName} ${employee.lastName} ${employee.idNum}`}</h2>}
            <Outlet context={employee} />
        </>
    );
}

export default EmployeeMainDashboard;
