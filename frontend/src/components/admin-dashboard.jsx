import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashNavbar from './subcomponent/dashboardAdminNavbar';

function AdminMainDashboard() {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('admin'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <>
            <AdminDashNavbar admin={admin} navigate={navigate} />
            <h1 style={{ textAlign: 'center', margin: '100px 0 auto' }}>
                Admin Main Dashboard
            </h1>
            {admin && <h2 style={{ textAlign: 'center' }}>{`Welcome, ${admin.firstName} ${admin.lastName}`}</h2>}
        </>
    );
}

export default AdminMainDashboard;
