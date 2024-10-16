import React, { useEffect, useState } from 'react';
import "../../assets/css/subcomponent-css/dashboardadminnavbar.css";
import LogoutPic from "../../assets/img/out.png";
import TimePic from "../../assets/img/save-time.png";
import ToggleSidePanel from "../../assets/img/assistant.png";
import MainDashIcon from "../../assets/img/main-dash.png";
import UserManagementIcon from "../../assets/img/user-management.png";
import AttendanceLeaveIcon from "../../assets/img/attendance.png";
import PerformanceIcon from "../../assets/img/performance-overview.png";
import InternalMessaging from "../../assets/img/internal-messaging.png";

function AdminDashNavbar({ admin, navigate }) {
    const [currentTime, setCurrentTime] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            setCurrentTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        };

        const intervalId = setInterval(updateTime, 1000);
        updateTime();

        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/');
    };

    const togglePanel = () => {
        setIsPanelOpen(prev => !prev);
    };

    return (
        <>
            <nav className="admin-navbar">
                <img src={ToggleSidePanel} alt="Toggle Side Panel" className="toggle-side-panel" onClick={togglePanel} />
                <div className="dashboard-overview">
                    {admin && <span className="admin-text">Admin # {admin.idNum}</span>}
                </div>
                <div className="time-container">
                    <img src={TimePic} alt="Time" className="time-pic" />
                    <span>{currentTime}</span>
                    <img src={LogoutPic} alt="Logout" className="logout-pic" onClick={handleLogout} />
                </div>
            </nav>
            <div className={`icon-panel`}>
                <div className="icon-wrapper">
                    <img src={MainDashIcon} alt="Main Dashboard" className="icon" />
                    <span className="tooltip">Dashboard</span>
                </div>
                <div className="icon-wrapper">
                    <img src={UserManagementIcon} alt="User Management" className="icon" />
                    <span className="tooltip">User Management</span>
                </div>
                <div className="icon-wrapper">
                    <img src={AttendanceLeaveIcon} alt="Attendance & Leave" className="icon" />
                    <span className="tooltip">Attendance & Leave</span>
                </div>
                <div className="icon-wrapper">
                    <img src={PerformanceIcon} alt="Performance Overview" className="icon" />
                    <span className="tooltip">Performance Overview</span>
                </div>
                <div className="icon-wrapper">
                    <img src={InternalMessaging} alt="Internal Messaging" className="icon" />
                    <span className="tooltip">Internal Messaging</span>
                </div>
            </div>
            <div className={`hidden-panel ${isPanelOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={togglePanel}>X</button>
                <button>
                    <img src={MainDashIcon} alt="Dashboard" className="button-icon" />
                    Dashboard Overview
                </button>
                <button>
                    <img src={UserManagementIcon} alt="User Management" className="button-icon" />
                    User Management
                </button>
                <button>
                    <img src={AttendanceLeaveIcon} alt="Attendance & Leave" className="button-icon" />
                    Attendance & Leave Management
                </button>
                <button>
                    <img src={PerformanceIcon} alt="Performance Overview" className="button-icon" />
                    Performance Overview
                </button>
                <button>
                    <img src={InternalMessaging} alt="Internal Messaging" className="button-icon" />
                    Internal Messaging and Notifications
                </button>
            </div>
        </>
    );
}

export default AdminDashNavbar;
