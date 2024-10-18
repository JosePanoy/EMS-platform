import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaPlus, FaTrash } from 'react-icons/fa';
import AddEmployeeModal from './addEmployeeModal';
import "../../assets/css/subcomponent-css/displayAll-Employee.css";

function DisplayAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [addEmployeeModalVisible, setAddEmployeeModalVisible] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/employee');
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();

        const intervalId = setInterval(fetchEmployees, 5000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const results = employees.filter(employee =>
            `${employee.firstName} ${employee.idNum} ${employee.email} ${employee.address} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(results);
    }, [searchTerm, employees]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuVisible && menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
                setSelectedEmployee(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);

    const handleMenuClick = (employee) => {
        setSelectedEmployee(employee);
        setMenuVisible(!menuVisible);
    };

    const handleCheckboxChange = (id) => {
        setSelectedEmployeeIds(prev =>
            prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
        );
    };

    const handleDeleteEmployees = async () => {
        if (selectedEmployeeIds.length === 0) {
            alert("No employees selected for deletion.");
            return;
        }
        setModalVisible(true);
    };

    const handleMenuDeleteClick = () => {
        if (selectedEmployee) {
            setSelectedEmployeeIds([selectedEmployee._id]);
            setModalVisible(true);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const idsToDelete = selectedEmployeeIds.length > 0 ? selectedEmployeeIds : [selectedEmployee._id];
            await axios.delete('http://localhost:8000/api/employee', {
                data: { ids: idsToDelete }
            });
            const updatedEmployees = employees.filter(emp => !idsToDelete.includes(emp._id));
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
            setSelectedEmployeeIds([]);
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Error deleting employees:", error);
        }
        setModalVisible(false);
    };

    const handleEmployeeAdded = (newEmployee) => {
        setEmployees(prev => [...prev, newEmployee]);
        setFilteredEmployees(prev => [...prev, newEmployee]);
    };

    return (
        <div className="employee-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'left' }}>Employees</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '7px 50px 7px 5px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '-1px' }}
                        />
                    </div>
                    <div className="add-employee-button" onClick={() => setAddEmployeeModalVisible(true)}>
                        <FaPlus style={{ marginRight: '5px', color: '#00887A' }} />
                        <span>Add Employee</span>
                    </div>
                    <div className="delete-employee-button" onClick={handleDeleteEmployees}>
                        <FaTrash style={{ marginRight: '5px', color: '#872323' }} />
                        <span>Delete</span>
                    </div>
                </div>
            </div>
            <div className="table-scrollable">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Employee Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>ID #</th>
                            <th>Registered Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployeeIds.includes(employee._id)}
                                        onChange={() => handleCheckboxChange(employee._id)}
                                    />
                                </td>
                                <td>
                                    <img src={employee.icon} alt={`${employee.firstName} ${employee.lastName}`} />
                                    {employee.firstName} {employee.lastName}
                                </td>
                                <td>{employee.email}</td>
                                <td>{employee.address}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.idNum}</td>
                                <td style={{ textAlign: 'center' }}>{new Date(employee.createdAt).toLocaleDateString()}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FaEllipsisV
                                            onClick={() => handleMenuClick(employee)}
                                            style={{ cursor: 'pointer', fontSize: '0.7rem', color: '#414141' }}
                                        />
                                        {menuVisible && selectedEmployee === employee && (
                                            <div className="menu-panel" ref={menuRef}>
                                                <div onClick={() => alert("View Profile")} style={{ cursor: 'pointer', marginBottom: '5px', fontSize: '0.9rem' }}>View Profile</div>
                                                <div onClick={() => alert("Update")} style={{ cursor: 'pointer', marginBottom: '5px', fontSize: '0.9rem' }}>Update</div>
                                                <div onClick={handleMenuDeleteClick} style={{ cursor: 'pointer', marginBottom: '5px', fontSize: '0.9rem' }}>Delete</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete the following employee(s)?</p>
                        <div className="modal-employee-list">
                            {selectedEmployeeIds.length > 0 ? (
                                selectedEmployeeIds.map(id => {
                                    const employee = employees.find(emp => emp._id === id);
                                    return (
                                        <p className="modal-employee-item" key={id}>
                                            <strong>Full Name:</strong> {employee.firstName} {employee.lastName}
                                            <br /><strong>ID Number:</strong> {employee.idNum}
                                        </p>
                                    );
                                })
                            ) : (
                                <p>
                                    <strong>Full Name:</strong> {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                                    <br /><strong>ID Number:</strong> {selectedEmployee?.idNum}
                                </p>
                            )}
                        </div>
                        <div className="modal-actions">
                            <button onClick={() => setModalVisible(false)}>Cancel</button>
                            <button onClick={handleConfirmDelete}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            {addEmployeeModalVisible && (
                <AddEmployeeModal 
                    isOpen={addEmployeeModalVisible} 
                    onClose={() => setAddEmployeeModalVisible(false)} 
                    onEmployeeAdded={handleEmployeeAdded} 
                />
            )}
        </div>
    );
}

export default DisplayAllEmployee;
