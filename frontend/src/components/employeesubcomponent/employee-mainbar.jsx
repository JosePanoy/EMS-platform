import React, { useState, useEffect } from 'react';
import "../../assets/css/employee-css/employee-mainbar.css";
import { Link } from 'react-router-dom';

function EmployeeMainBar({ handleLogout }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="employee-mainbar-navbar">
            <Link to="/employee" className="employee-mainbar-nav-button">Main Dashboard</Link>
            <Link to="/employee/overview" className="employee-mainbar-nav-button">Overview</Link>
            <Link to="/employee/attendance" className="employee-mainbar-nav-button">Attendance</Link>
            <Link to="/employee/task" className="employee-mainbar-nav-button">Tasks/Projects</Link>
            <Link to="/employee/leave" className="employee-mainbar-nav-button">Leave</Link>
            <Link to="/employee/profile" className="employee-mainbar-nav-button">Profile</Link>
        </div>
    );
}

export default EmployeeMainBar;
