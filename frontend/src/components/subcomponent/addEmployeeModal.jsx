import { useState } from "react";
import "../../assets/css/subcomponent-css/addEmployeeModal.css";
import Resizer from 'react-image-file-resizer';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import boy1 from "../../assets/img/employee/boy1.png";
import boy2 from "../../assets/img/employee/boy2.png";
import boy3 from "../../assets/img/employee/boy3.png";
import girl1 from "../../assets/img/employee/girl1.png";
import girl2 from "../../assets/img/employee/girl2.png";
import girl3 from "../../assets/img/employee/girl3.png";
import SuperAdmin from "../../assets/img/employee/superadmin.png";

function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userTeam, setUserTeam] = useState("");
    const [idNum, setIdNum] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [iconPanelVisible, setIconPanelVisible] = useState(false);
    const [warning, setWarning] = useState("");
    const [idGenerated, setIdGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const generateIdNum = () => {
        if (idGenerated) {
            setWarning("Generating ID # can only happen once.");
            return;
        }
        const randomId = `${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        setIdNum(randomId);
        setIdGenerated(true);
        setWarning('');
    };

    const handleIconSelect = (icon) => {
        setSelectedIcon(icon);
        setImageUpload(null);
        setIconPanelVisible(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            Resizer.imageFileResizer(
                file,
                300,
                350,
                'JPEG',
                100,
                0,
                (uri) => {
                    setImageUpload(uri);
                    setSelectedIcon(null);
                },
                'base64'
            );
        } else {
            setWarning('Please upload an image in PNG, JPG, or JPEG format.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setWarning('');
        setSuccessMessage('');

        if (!firstName || !lastName || !email || !address || !phone || !userTeam || !password || !confirmPassword) {
            setWarning('Please fill in all required fields and select an icon.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setWarning('Passwords do not match.');
            setLoading(false);
            return;
        }

        const icon = imageUpload || selectedIcon;

        if (!icon) {
            setWarning('Please choose a profile icon or upload an image.');
            setLoading(false);
            return;
        }

        const dataToSend = {
            firstName,
            lastName,
            email,
            address,
            phoneNumber: phone,
            userTeam,
            password,
            idNum,
            icon
        };

        try {
            const response = await fetch('http://localhost:8000/ems/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const newEmployee = await response.json();
            onEmployeeAdded(newEmployee);
            setSuccessMessage('Employee added successfully!');
            setTimeout(onClose, 3000);
        } catch (error) {
            setWarning(error.message);
            setTimeout(() => setWarning(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="add-employee-modal-overlay">
            <div className="add-employee-modal-container">
                <div className="add-employee-modal-header">
                    <h2>Add Employee</h2>
                    <button className="add-employee-close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="add-employee-form-grid">
                        <div className="add-employee-form-column">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <div className="add-employee-password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button style={{ background: 'none', border: 'none', color: '#00887A' }} className="add-employee-password-toggle" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="add-employee-password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button style={{ background: 'none', border: 'none', color: '#00887A' }} className="add-employee-password-toggle" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {warning && <span className="add-employee-warning">{warning}</span>}
                            {successMessage && <span className="add-employee-success">{successMessage}</span>}
                        </div>
                        
                        <div className="add-employee-form-column">
                        <button type="button" onClick={generateIdNum}>Generate ID Number</button>
                            <input
                                type="text"
                                placeholder="ID Number"
                                value={idNum}
                                readOnly
                            />
                            <select
                                value={userTeam}
                                onChange={(e) => setUserTeam(e.target.value)}
                                required
                            >
                                <option value="">Select Team</option>
                                <option value="sales">Sales Team</option>
                                <option value="marketing">Marketing Team</option>
                                <option value="tech">Tech Team</option>
                                <option value="software-development">Software Development Team</option>
                                <option value="call-representative">Call Representative Team</option>
                                <option value="maintainance">Maintainance Team</option>
                            </select>


                            <button type="button" onClick={() => setIconPanelVisible(!iconPanelVisible)}>Choose Icon</button>
                            {iconPanelVisible && (
                                <div className="add-employee-icon-panel">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    <div className="add-employee-icon-selection">
                                        <img src={boy1} alt="Boy 1" onClick={() => handleIconSelect(boy1)} />
                                        <img src={boy2} alt="Boy 2" onClick={() => handleIconSelect(boy2)} />
                                        <img src={boy3} alt="Boy 3" onClick={() => handleIconSelect(boy3)} />
                                        <img src={girl1} alt="Girl 1" onClick={() => handleIconSelect(girl1)} />
                                        <img src={girl2} alt="Girl 2" onClick={() => handleIconSelect(girl2)} />
                                        <img src={girl3} alt="Girl 3" onClick={() => handleIconSelect(girl3)} />
                                        <img src={SuperAdmin} alt="Super Admin" onClick={() => handleIconSelect(SuperAdmin)} />
                                    </div>
                                </div>
                            )}
                            {selectedIcon && (
                                <div className="add-employee-icon-display-container">
                                    <img src={selectedIcon} alt="Selected Icon" className="add-employee-selected-icon" />
                                </div>
                            )}
                            {imageUpload && (
                                <div className="add-employee-icon-display-container">
                                    <img src={imageUpload} alt="Uploaded Icon" className="add-employee-selected-icon" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="add-employee-modal-actions">
                        <button type="submit" className="add-employee-submit-button">Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeeModal;
