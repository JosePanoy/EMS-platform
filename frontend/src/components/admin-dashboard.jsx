import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; 
import AdminDashNavbar from './subcomponent/dashboardAdminNavbar';


function AdminMainDashboard() {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            navigate('/');
        }
    }, [admin, navigate]);

    return (
        <>
            <AdminDashNavbar admin={admin} />



       {/* Dont touch this -> */}  <Outlet context={admin} /> 
        </>
    );
}

export default AdminMainDashboard;
