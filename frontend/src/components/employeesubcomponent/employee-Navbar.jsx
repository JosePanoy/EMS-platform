import React, { useState, useEffect } from 'react';
import "../../assets/css/employee-css/employee-Navbar.css";
import timelogo from "../../assets/img/save-time.png";
import LogoutBTN from "../../assets/img/out.png";
import loadingGIF from "../../assets/img/gif/loading.gif";

function EmployeeNavbar({ handleLogout, employee }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleConfirmLogout = async () => {
        setLoading(true);
        try {
            // Removed the feature to send logout time to backend

            setTimeout(() => {
                handleLogout();
                setShowModal(false);
                setLoading(false);
            }, 3000);
        } catch (error) {
            console.error('Error during logout process:', error);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="employee-navbar-container">
                <div className="employee-id-container">
                    <span style={{ cursor: 'default' }} className="employee-id">Employee ID#: {employee?.idNum}</span>
                </div>
                <div className="right-section">
                    <div className="employee-time-container">
                        <img src={timelogo} alt="Time Logo" className="employee-time-logo" />
                        <span className="employee-time">{time}</span>
                    </div>
                    <div className="logout-container" onClick={handleShowModal}>
                        <img src={LogoutBTN} alt="Logout Icon" className="logout-icon" />
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="employee-navbar-modal">
                    <div className="employee-navbar-modal-content">
                        {loading ? (
                            <div className="loading-container">
                                <img src={loadingGIF} alt="Loading" className="loading-gif" />
                                <p>Logging out...</p>
                            </div>
                        ) : (
                            <>
                                <p>Please confirm log out 😊</p>
                                <div className="employee-navbar-modal-actions">
                                    <button onClick={handleCloseModal}>Cancel</button>
                                    <button onClick={handleConfirmLogout}>Confirm</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default EmployeeNavbar;
