import React, { useState } from 'react';
import axios from 'axios';
import "../../assets/css/subcomponent-css/UpdateAdmin-Modal.css";  

function UpdateAdminModal({ isOpen, onClose, adminData, onUpdateSuccess }) {
    const [admin, setAdmin] = useState({ ...adminData });
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
    
        let updateError = false;
        let updateSuccess = false;
    
        try {
            const response = await axios.put('http://localhost:8000/ems/admin/update', {
                ...admin,
                adminId: admin._id.toString(),
            });
    
            if (response.status === 200) {
                updateSuccess = true;
                onUpdateSuccess(response.data);
            } else {
                updateError = true;
            }
        } catch (error) {
            console.error("Error updating admin:", error);
            updateError = true;
        } finally {
            setIsSaving(false);
    
            if (updateSuccess) {
                alert('Admin updated successfully!');
            } else if (updateError) {
                alert('Error updating admin. Please try again.');
            }
        }
    };
    
    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    const handleModalClick = (e) => {
        e.stopPropagation();  
    };

    return (
        <div className="update-admin-modal-overlay" onClick={handleClose}>
            <div className="update-admin-modal" onClick={handleModalClick}>
                <h2 className="update-admin-modal-title">Update Admin</h2>

                <form className="update-admin-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="update-admin-form-group">
                        <label htmlFor="firstName" className="update-admin-form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={admin.firstName || ''}
                            onChange={handleInputChange}
                            className="update-admin-form-input"
                        />
                    </div>
                    <div className="update-admin-form-group">
                        <label htmlFor="lastName" className="update-admin-form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={admin.lastName || ''}
                            onChange={handleInputChange}
                            className="update-admin-form-input"
                        />
                    </div>
                    <div className="update-admin-form-group">
                        <label htmlFor="email" className="update-admin-form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={admin.email || ''}
                            onChange={handleInputChange}
                            className="update-admin-form-input"
                        />
                    </div>
                    <div className="update-admin-form-group">
                        <label htmlFor="phoneNumber" className="update-admin-form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={admin.phoneNumber || ''}
                            onChange={handleInputChange}
                            className="update-admin-form-input"
                        />
                    </div>
                    <div className="update-admin-form-group">
                        <label htmlFor="address" className="update-admin-form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={admin.address || ''}
                            onChange={handleInputChange}
                            className="update-admin-form-input"
                        />
                    </div>
                    <div className="update-admin-actions">
                        <button type="button" className="update-admin-close-btn" onClick={handleClose}>Close</button>
                        <button
                            type="button"
                            className="update-admin-save-btn"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateAdminModal;
