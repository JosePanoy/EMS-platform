import React, { useState, useEffect } from 'react';
import "../../assets/css/employee-css/employee-Navbar.css";
import timelogo from "../../assets/img/save-time.png";
import LogoutBTN from "../../assets/img/out.png";

function EmployeeNavbar({ handleLogout, employee }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="employee-navbar-container">
            <div className="employee-id-container">
                <span className="employee-id">Employee ID#: {employee?.idNum}</span>
            </div>
            <div className="right-section">
                <div className="employee-time-container">
                    <img src={timelogo} alt="Time Logo" className="employee-time-logo" />
                    <span className="employee-time">{time}</span>
                </div>
                <div className="logout-container" onClick={handleLogout}>
                    <img src={LogoutBTN} alt="Logout Icon" className="logout-icon" />
                </div>
            </div>
        </div>
        </>
    );
}

export default EmployeeNavbar;
