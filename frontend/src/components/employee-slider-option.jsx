// EmployeeSlider.js
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "../assets/css/employee-slider.css";
import AdminLogo from "../assets/img/admin.png";
import EmployeeLogo from "../assets/img/employee.png";

function EmployeeSlider() {
    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idNum, setIdNum] = useState(["", "", ""]);
    const [password, setPassword] = useState("");
    const inputRefs = useRef([useRef(null), useRef(null), useRef(null)]);
    const navigate = useNavigate(); 

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
        setIdNum(["", "", ""]);
        setPassword("");
    };

    const handleIdChange = (index, value) => {
        const newIdNum = [...idNum];
        const numericValue = value.replace(/[^0-9]/g, "");
        newIdNum[index] = numericValue;
        setIdNum(newIdNum);

        if (numericValue.length === 3 && index < idNum.length - 1) {
            inputRefs.current[index + 1].current.focus();
        }
    };

    const handleLogin = async () => {
        const idNumber = idNum.join("-");
        const role = options[current].label.toLowerCase(); 

        try {
            const response = await fetch(`http://localhost:8000/api/${role}/login`, { // Updated port
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idNum: idNumber, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Redirect based on user role
                if (role === "admin") {
                    navigate("/admin-dashboard"); // Ensure this matches the route
                } else {
                    navigate("/employee-dashboard"); // Ensure this matches the route
                }
            } else {
                const errorResponse = await response.json();
                alert(errorResponse.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
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
                        <label className="id-label">ID Number</label>
                        <div className="id-input-container">
                            {idNum.map((segment, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="XXX"
                                    maxLength={3}
                                    value={segment}
                                    onChange={(e) => handleIdChange(index, e.target.value)}
                                    ref={inputRefs.current[index]}
                                    className="id-input"
                                    style={{ marginRight: '5px' }}
                                />
                            ))}
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="unique-modal-login" onClick={handleLogin}>Log In</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeSlider;
