import React, { useState } from 'react';
import axios from 'axios';
import "../../assets/css/subcomponent-css/UpdateEmployee-Modal.css";  

function UpdateEmployeeModal({ isOpen, onClose, employeeData, onUpdateSuccess }) {
    const [employee, setEmployee] = useState({ ...employeeData });
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
    
        let updateError = false;
        let updateSuccess = false;
    
        try {
            const response = await axios.put('http://localhost:8000/ems/employee/update', {
                ...employee,
                employeeId: employee._id.toString(),
            });
    
            if (response.status === 200) {
                updateSuccess = true;
                onUpdateSuccess(response.data);
            } else {
                updateError = true;
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            updateError = true;
        } finally {
            setIsSaving(false);
    
            if (updateSuccess) {
                alert('Employee updated successfully!');
            } else if (updateError) {
                alert('Error updating employee. Please try again.');
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
        <div className="update-employee-modal-overlay" onClick={handleClose}>
            <div className="update-employee-modal" onClick={handleModalClick}>
                <h2 className="update-employee-modal-title">Update Employee</h2>

                <form className="update-employee-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="update-employee-form-group">
                        <label htmlFor="firstName" className="update-employee-form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={employee.firstName || ''}
                            onChange={handleInputChange}
                            className="update-employee-form-input"
                        />
                    </div>
                    <div className="update-employee-form-group">
                        <label htmlFor="lastName" className="update-employee-form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={employee.lastName || ''}
                            onChange={handleInputChange}
                            className="update-employee-form-input"
                        />
                    </div>
                    <div className="update-employee-form-group">
                        <label htmlFor="email" className="update-employee-form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={employee.email || ''}
                            onChange={handleInputChange}
                            className="update-employee-form-input"
                        />
                    </div>
                    <div className="update-employee-form-group">
                        <label htmlFor="phoneNumber" className="update-employee-form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={employee.phoneNumber || ''}
                            onChange={handleInputChange}
                            className="update-employee-form-input"
                        />
                    </div>
                    <div className="update-employee-form-group">
                        <label htmlFor="address" className="update-employee-form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={employee.address || ''}
                            onChange={handleInputChange}
                            className="update-employee-form-input"
                        />
                    </div>
                    <div className="update-employee-actions">
                        <button type="button" className="update-employee-close-btn" onClick={handleClose}>Close</button>
                        <button
                            type="button"
                            className="update-employee-save-btn"
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

export default UpdateEmployeeModal;
