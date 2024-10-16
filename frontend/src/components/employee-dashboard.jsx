import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeMainDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login if no token
        }
    }, [navigate]);

    const employee = JSON.parse(localStorage.getItem('employee'));

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the JWT token
        localStorage.removeItem('employee'); // Remove employee details
        navigate('/'); // Redirect to login
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', margin: '100px 0 auto' }}>
                Employee Main Dashboard
            </h1>
            {employee && <h2 style={{ textAlign: 'center' }}>{`Welcome, ${employee.firstName} ${employee.lastName}`}</h2>}
            <button style={{ display: 'block', margin: '0 auto' }} onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default EmployeeMainDashboard;
