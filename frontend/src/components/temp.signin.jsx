import React, { useState } from 'react';
import '../assets/css/temp-signin.css';
import { Link } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';

import boy1 from "../assets/img/employee/boy1.png";
import boy2 from "../assets/img/employee/boy2.png";
import boy3 from "../assets/img/employee/boy3.png";
import girl1 from "../assets/img/employee/girl1.png";
import girl2 from "../assets/img/employee/girl2.png";
import girl3 from "../assets/img/employee/girl3.png";
import SuperAdmin from "../assets/img/employee/superadmin.png";

function TempSignIn() {
    const [warning, setWarning] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userTeam, setUserTeam] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [idNum, setIdNum] = useState('');

    const generateIdNum = () => {
        const randomId = `${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        setIdNum(randomId);
        setWarning('');
    };

    const handleIconSelect = (icon) => {
        setSelectedIcon(icon);
        setShowModal(false);
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
            },
            'base64' 
        );
    } else {
        setWarning('Please upload an image in PNG, JPG, or JPEG format.');
    }
};

    const resetForm = () => {
        setIdNum('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddress('');
        setPhoneNumber('');
        setUserTeam('');
        setPassword('');
        setConfirmPassword('');
        setSelectedIcon(null);
        setImageUpload(null);
        setWarning('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setWarning('');
        setSuccessMessage('');

        if (!firstName || !lastName || !email || !address || !phoneNumber || !userTeam || !password || !confirmPassword) {
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
            phoneNumber,
            userTeam,
            password,
            idNum,
            icon
        };

        try {
            const endpoint = userTeam === 'admin' ? 'http://localhost:8000/api/admin' : 'http://localhost:8000/api/employee';
            const response = await fetch(endpoint, {
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

            setSuccessMessage('Successfully signed in!');
            setTimeout(resetForm, 3000);
        } catch (error) {
            setWarning(error.message);
            setTimeout(() => setWarning(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Link to="/">Home</Link>
            <div className="temp-signin-container">
                <h1 style={{ textAlign: 'center' }}>Sign In Page</h1>
                <form className="temp-signin-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" className="temp-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" placeholder="Last Name" className="temp-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" placeholder="Email" className="temp-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Address" className="temp-input" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="text" placeholder="Phone Number" className="temp-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <input type="password" placeholder="Password" className="temp-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" className="temp-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <select className="temp-select" value={userTeam} onChange={(e) => setUserTeam(e.target.value)} required>
                        <option value="">Select Team</option>
                        <option value="sales">Sales Team</option>
                        <option value="marketing">Marketing Team</option>
                        <option value="tech">Tech Team</option>
                        <option value="software-development">Software Development Team</option>
                        <option value="call-representative">Call Representative Team</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="button" className="temp-button" onClick={generateIdNum}>Generate ID Num</button>
                    <span className="temp-id-display">{idNum}</span>
                    <button type="button" className="temp-button" onClick={() => setShowModal(true)}>Choose Profile Icon</button>
                    {selectedIcon && <img src={selectedIcon} alt="Profile Icon" className="temp-selected-icon" />}
                    {imageUpload && <img src={imageUpload} alt="Uploaded" className="temp-uploaded-icon" />}
                    <button type="submit" className="temp-button" disabled={loading}>{loading ? 'Submitting...' : 'Sign In'}</button>
                    {warning && <span className="temp-warning">{warning}</span>}
                    {successMessage && <span className="temp-success" style={{ color: 'green', textAlign: 'center', fontSize: '0.9rem' }}>{successMessage}</span>}
                </form>
            </div>

            {showModal && (
                <div className="temp-modal">
                    <div className="temp-modal-content">
                        <h2>Select a Profile Icon</h2>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="temp-file-input" />
                        <div className="temp-icon-selection">
                            <p>You can choose your preferred icon!😊</p>
                            <img src={boy1} alt="Boy 1" onClick={() => handleIconSelect(boy1)} />
                            <img src={boy2} alt="Boy 2" onClick={() => handleIconSelect(boy2)} />
                            <img src={boy3} alt="Boy 3" onClick={() => handleIconSelect(boy3)} />
                            <img src={girl1} alt="Girl 1" onClick={() => handleIconSelect(girl1)} />
                            <img src={girl2} alt="Girl 2" onClick={() => handleIconSelect(girl2)} />
                            <img src={girl3} alt="Girl 3" onClick={() => handleIconSelect(girl3)} />
                            <img src={SuperAdmin} alt="Super Admin" onClick={() => handleIconSelect(SuperAdmin)} />
                        </div>
                        <button onClick={() => setShowModal(false)} className="temp-button">Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default TempSignIn;
