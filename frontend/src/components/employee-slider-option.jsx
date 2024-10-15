import { useState } from "react";
import "../assets/css/employee-slider.css";
import AdminLogo from "../assets/img/admin.png";
import EmployeeLogo from "../assets/img/employee.png";

function EmployeeSlider() {
    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePrev = () => {
        setCurrent(current === 0 ? 1 : 0);
    };

    const handleNext = () => {
        setCurrent(current === 0 ? 1 : 0);
    };

    const options = [
        { logo: AdminLogo, label: "ADMIN", buttonText: "Log In as Admin" },
        { logo: EmployeeLogo, label: "EMPLOYEE", buttonText: "Log In as Employee" }
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="unique-slider-container">
            <h2 className="slider-title">Type Of Employee</h2>
            <div className="slider-wrapper">
                <button className="unique-arrow unique-left-arrow" onClick={handlePrev}>
                    &lt;
                </button>
                <div className="unique-slider-content">
                    <div className="unique-logo-circle">
                        <img src={options[current].logo} alt={options[current].label} />
                    </div>
                    <p>{options[current].label}</p>
                    <button className="login-button" onClick={openModal}>
                        {options[current].buttonText}
                    </button>
                </div>
                <button className="unique-arrow unique-right-arrow" onClick={handleNext}>
                    &gt;
                </button>
            </div>
            {isModalOpen && (
                <div className="unique-modal-login-container">
    <div className="unique-modal-content">
        <span className="unique-close" onClick={closeModal}>&times;</span>
        <h2>{`Hi ${options[current].label}!`}</h2>
        <input type="text" placeholder="ID Number" />
        <input type="password" placeholder="Password" />
        <button className="unique-modal-login">Log In</button>
    </div>
</div>

            )}
        </div>
    );
}

export default EmployeeSlider;
