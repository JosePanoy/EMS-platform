import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminMainDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login if no token
        }
    }, [navigate]);

    const admin = JSON.parse(localStorage.getItem('admin'));

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the JWT token
        localStorage.removeItem('admin'); // Remove admin details
        navigate('/'); // Redirect to login
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', margin: '100px 0 auto' }}>
                Admin Main Dashboard
            </h1>
            {admin && <h2 style={{ textAlign: 'center' }}>{`Welcome, ${admin.firstName} ${admin.lastName}`}</h2>}
            <button style={{ display: 'block', margin: '0 auto' }} onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default AdminMainDashboard;
