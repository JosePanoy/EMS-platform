import React, { useState, useEffect } from 'react';
import "../../assets/css/employee-css/employee-mainbar.css";

import { Link, useNavigate } from 'react-router-dom';

function EmployeeMainBar({ handleLogout }) {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="employee-mainbar-navbar">
            <Link  to="/employee"  className="employee-mainbar-nav-button">Dashboard</Link>
            <Link to="attendance" className="employee-mainbar-nav-button">Attendance</Link>
            <Link to="task" className="employee-mainbar-nav-button">Tasks/Projects</Link>
            <Link to="leave" className="employee-mainbar-nav-button">Leave</Link>
            <Link to="profile" className="employee-mainbar-nav-button">Profile</Link>


        </div>
    );
}

export default EmployeeMainBar;
