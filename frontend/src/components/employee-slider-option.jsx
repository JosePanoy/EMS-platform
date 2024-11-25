import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../assets/css/employee-slider.css";
import AdminLogo from "../assets/img/admin.png";
import EmployeeLogo from "../assets/img/employee.png";
import LoadingGif from "../assets/img/gif/loading.gif";
import io from 'socket.io-client';

function EmployeeSlider() {
    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idNum, setIdNum] = useState(["", "", ""]);
    const [password, setPassword] = useState("");
    const inputRefs = useRef([useRef(null), useRef(null), useRef(null)]);
    const passwordInputRef = useRef(null);
    const navigate = useNavigate();
    const socket = useRef(io("http://localhost:8000")).current;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(current === 0 ? "/admin" : "/employee-dashboard");
        }

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [navigate, current, socket]);

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
        setIsLoading(false);
    };

    const handleIdChange = (index, value) => {
        const newIdNum = [...idNum];
        const numericValue = value.replace(/[^0-9]/g, "");
        newIdNum[index] = numericValue;
        setIdNum(newIdNum);

        if (numericValue.length === 3 && index < idNum.length - 1) {
            inputRefs.current[index + 1].current.focus();
        }

        if (newIdNum.every(segment => segment.length === 3)) {
            passwordInputRef.current.focus();
        }
    };

    const handleLogin = async () => {
        const idNumber = idNum.join("-");
        const role = options[current].label.toLowerCase(); 
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/ems/${role}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idNum: idNumber, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem(role === "admin" ? 'admin' : 'employee', JSON.stringify(data.admin || data.employee));
                socket.emit('login', idNumber);
                setTimeout(() => {
                    closeModal();
                    navigate(role === "admin" ? "/admin" : "/employee");
                }, 3000);
            } else {
                setTimeout(() => {
                    alert("Wrong password or ID number. Try again ☹️");
                    setIsLoading(false);
                    closeModal();
                }, 2500);
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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
                        <button className="unique-close" onClick={closeModal}>×</button>
                        {isLoading ? (
                            <div className="loading-modal">
                                <img src={LoadingGif} alt="Loading..." />
                                <p>Processing...</p>
                            </div>
                        ) : (
                            <>
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
                                    ref={passwordInputRef}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <button className="unique-modal-login" onClick={handleLogin}>Log In</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeSlider;
