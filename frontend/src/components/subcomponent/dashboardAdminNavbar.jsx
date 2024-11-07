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
import { Link, useNavigate } from 'react-router-dom';
import LoadingGif from "../../assets/img/gif/loading.gif";
import DepartmentLogo from "../../assets/img/departments.png"

function AdminDashNavbar({ admin }) {
    const [currentTime, setCurrentTime] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            navigate('/', { replace: true });
        }, 2500);
    };

    const cancelLogout = () => {
        setIsLogoutModalOpen(false);
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
                    <img src={LogoutPic} alt="Logout" className="logout-pic" onClick={handleLogout} style={{ cursor: 'pointer' }} />
                </div>
            </nav>

            <div className="icon-panel">
                <Link to="/admin/overview" className="icon-wrapper">
                    <img src={MainDashIcon} alt="Main Dashboard" className="icon" />
                    <span className="tooltip">Dashboard</span>
                </Link>
                <Link to="/admin/user-management" className="icon-wrapper">
                    <img src={UserManagementIcon} alt="User Management" className="icon" />
                    <span className="tooltip">User Management</span>
                </Link>
                <Link to="/admin/attendance-leave" className="icon-wrapper">
                    <img src={AttendanceLeaveIcon} alt="Attendance & Leave" className="icon" />
                    <span className="tooltip">Attendance & Leave</span>
                </Link>
                <Link to="/admin/performance-overview" className="icon-wrapper">
                    <img src={PerformanceIcon} alt="Performance Overview" className="icon" />
                    <span className="tooltip">Performance Overview</span>
                </Link>
                <Link to="/admin/departments" className="icon-wrapper">
                    <img src={DepartmentLogo} alt="Departments" className="icon" />
                    <span className="tooltip">Departments</span>
                </Link>
                
                <Link to="/admin/messaging-notification" className="icon-wrapper">
                    <img src={InternalMessaging} alt="Internal Messaging" className="icon" />
                    <span className="tooltip">Internal Messaging</span>
                </Link>
            </div>

            <div className="nav-links">
                <Link to="/admin/overview" className="nav-link">Dashboard Overview</Link>
                <Link to="/admin/user-management" className="nav-link">User Management</Link>
                <Link to="/admin/performance-overview" className="nav-link">Performance Overview</Link>
                <Link to="/admin/departments" className="nav-link">Departments</Link>
                <Link to="/admin/attendance-leave" className="nav-link">Attendance & Leave Management</Link>
                <Link to="/admin/messaging-notification" className="nav-link">Internal Messaging & Notifications</Link>
            </div>

            <div className={`hidden-panel ${isPanelOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={togglePanel}>X</button>
                <Link to="/admin/overview" className="hidden-panel-button">
                    <img src={MainDashIcon} alt="Dashboard" className="button-icon" />
                    Dashboard Overview
                </Link>
                <Link to="/admin/user-management" className="hidden-panel-button">
                    <img src={UserManagementIcon} alt="User Management" className="button-icon" />
                    User Management
                </Link>
                <Link to="/admin/attendance-leave" className="hidden-panel-button">
                    <img src={AttendanceLeaveIcon} alt="Attendance & Leave" className="button-icon" />
                    Attendance & Leave Management
                </Link>
                <Link to="/admin/performance-overview" className="hidden-panel-button">
                    <img src={PerformanceIcon} alt="Performance Overview" className="button-icon" />
                    Performance Overview
                </Link>
                <Link to="/admin/departments" className="hidden-panel-button">
                    <img src={DepartmentLogo} alt="Departments" className="button-icon" />
                    Departments
                </Link>
                <Link to="/admin/messaging-notification" className="hidden-panel-button">
                    <img src={InternalMessaging} alt="Internal Messaging" className="button-icon" />
                    Internal Messaging and Notifications
                </Link>
            </div>

            {isLogoutModalOpen && (
                <div className="logout-modal">
                    <div className="logout-modal-content">
                        {!isLoading ? (
                            <>
                                <h2>Confirm Logout</h2>
                                <p>Are you sure you want to logout? 🤔</p>
                                <button className="confirm" onClick={confirmLogout}>Confirm</button>
                                <button className="cancel" onClick={cancelLogout}>Cancel</button>
                            </>
                        ) : (
                            <div className="loading-modal">
                                <img src={LoadingGif} alt="Loading..." />
                                <p>Logging out...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </>
    );
}

export default AdminDashNavbar;
