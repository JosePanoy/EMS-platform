import React from 'react';
import "../../assets/css/employee-css/employee-sidepanel.css";
import { Link } from 'react-router-dom';
import OverviewIcon from "../../assets/img/employee-department/overview.png"
import DashboardIcon from "../../assets/img/employee-department/dashboard.png";
import AttendanceIcon from "../../assets/img/employee-department/attendance.png";
import TaskIcon from "../../assets/img/employee-department/task.png";
import LeaveIcon from "../../assets/img/employee-department/leave.png";
import ProfileIcon from "../../assets/img/employee-department/profile.png";

function EmployeeSidePanel() {
    return (
        <div className="employee-sidepanel">
            <Link to="/employee" className="employee-sidepanel-item">
                <img src={DashboardIcon} alt="Department" className="employee-sidepanel-icon" />
                <span className="employee-sidepanel-text">Main Dashboard</span>
            </Link>
            <Link to="/employee/overview" className="employee-sidepanel-item">
                <img src={OverviewIcon} alt="Department" className="employee-sidepanel-icon" />
                <span className="employee-sidepanel-text">Overview</span>
            </Link>
            <Link to="/employee/attendance" className="employee-sidepanel-item">
                <img src={AttendanceIcon} alt="Attendance" className="employee-sidepanel-icon" />
                <span className="employee-sidepanel-text">Attendance</span>
            </Link>
            <Link to="/employee/task" className="employee-sidepanel-item">
                <img src={TaskIcon} alt="Task/Projects" className="employee-sidepanel-icon" />
                <span className="employee-sidepanel-text">Task/Projects</span>
            </Link>
            <Link to="/employee/leave" className="employee-sidepanel-item">
                <img src={LeaveIcon} alt="Leave" className="employee-sidepanel-icon" />
                <span className="employee-sidepanel-text">Leave</span>
            </Link>
            <Link to="/employee/profile" className="employee-sidepanel-item">
                <img src={ProfileIcon} alt="Profile" className="employee-sidepanel-icon" />
                <span className="employee-sidepanel-text">Profile</span>
            </Link>
        </div>
    );
}

export default EmployeeSidePanel;
