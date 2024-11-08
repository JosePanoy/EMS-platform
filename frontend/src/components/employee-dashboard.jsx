import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
