import React, { useState, useEffect } from 'react';
import "../../assets/css/employee-css/employee-Navbar.css";
import timelogo from "../../assets/img/save-time.png";
import LogoutBTN from "../../assets/img/out.png";
import loadingGIF from "../../assets/img/gif/loading.gif";
import axios from 'axios';

function EmployeeNavbar({ handleLogout, employee }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logoutStatus, setLogoutStatus] = useState("");

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // Show the logout confirmation modal
    const handleShowModal = () => setShowModal(true);
    
    // Close the modal without logging out
    const handleCloseModal = () => setShowModal(false);

    // Handle the logout confirmation
    const handleConfirmLogout = async () => {
        setLoading(true);

        // Simulate a 3-second delay before logging out
        setTimeout(async () => {
            try {
                const response = await axios.post("http://localhost:8000/ems/employee/logout", {
                    idNum: employee.idNum
                });

                if (response.status === 200) {
                    setLogoutStatus(response.data.status);
                    setShowModal(false); // Close the modal
                    handleLogout(); // Execute the logout logic passed via props
                }
            } catch (error) {
                console.error('Error during logout process:', error);
                setLoading(false);
                if (error.response) {
                    alert(`Error: ${error.response.data.message}`);
                } else if (error.request) {
                    alert('Error: Network issue. Please check your server.');
                } else {
                    alert('Error: An unexpected issue occurred.');
                }
            }
        }, 3000); // 3-second delay before logging out
    };

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

            {logoutStatus && (
                <div className="logout-status">
                    <p>Logout Status: {logoutStatus}</p>
                </div>
            )}
        </>
    );
}

export default EmployeeNavbar;
