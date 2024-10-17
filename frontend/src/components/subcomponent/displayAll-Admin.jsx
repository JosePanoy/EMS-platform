import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import "../../assets/css/subcomponent-css/displayAll-Admin.css";

function DisplayAllAdmin() {
    const [admins, setAdmins] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [selectedAdminIds, setSelectedAdminIds] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin');
                setAdmins(response.data);
                setFilteredAdmins(response.data);
            } catch (error) {
                console.error("Error fetching admins:", error);
            }
        };
        fetchAdmins();
    }, []);

    useEffect(() => {
        const results = admins.filter(admin =>
            `${admin.firstName} ${admin.idNum} ${admin.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdmins(results);
    }, [searchTerm, admins]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuVisible && menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
                setSelectedAdmin(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);

    const handleMenuClick = (admin) => {
        setSelectedAdmin(admin);
        setMenuVisible(!menuVisible);
    };

    const handleCheckboxChange = (id) => {
        setSelectedAdminIds(prev =>
            prev.includes(id) ? prev.filter(adminId => adminId !== id) : [...prev, id]
        );
    };

    const handleDeleteAdmins = () => {
        if (selectedAdminIds.length === 0) {
            alert("No admins selected for deletion.");
            return;
        }
        setModalVisible(true);
    };

    const handleMenuDeleteClick = () => {
        if (selectedAdmin) {
            setSelectedAdminIds([selectedAdmin._id]);
            setModalVisible(true);
        }
    };

    const handleConfirmDelete = async () => {
        const idsToDelete = selectedAdminIds.length > 0 ? selectedAdminIds : [selectedAdmin._id];
        try {
            await axios.delete('http://localhost:8000/api/admin', {
                data: { ids: idsToDelete }
            });
            const updatedAdmins = admins.filter(admin => !idsToDelete.includes(admin._id));
            setAdmins(updatedAdmins);
            setFilteredAdmins(updatedAdmins);
            setSelectedAdminIds([]);
            setSelectedAdmin(null);
        } catch (error) {
            console.error("Error deleting admins:", error);
        }
        setModalVisible(false);
    };

    return (
        <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'left' }}>Admins</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '5px 30px 5px 10px', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                        <FaSearch style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    </div>
                    <div className="add-admin-button" onClick={() => alert("Add Admin Member")}>
                        <FaPlus style={{ marginRight: '5px', color: '#00887A' }} />
                        <span>Add Admin Member</span>
                    </div>
                    <div className="delete-admin-button" onClick={handleDeleteAdmins}>
                        <FaTrash style={{ marginRight: '5px', color: '#872323' }} />
                        <span>Delete</span>
                    </div>
                </div>
            </div>
            <div className="table-scrollable">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Admin Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>ID #</th>
                            <th>Registered Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAdmins.map(admin => (
                            <tr key={admin._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedAdminIds.includes(admin._id)}
                                        onChange={() => handleCheckboxChange(admin._id)}
                                    />
                                </td>
                                <td>
                                    <img src={admin.icon} alt={`${admin.firstName} ${admin.lastName}`} />
                                    {admin.firstName} {admin.lastName}
                                </td>
                                <td>{admin.email}</td>
                                <td>{admin.address}</td>
                                <td>{admin.phoneNumber}</td>
                                <td>{admin.idNum}</td>
                                <td style={{ textAlign: 'center' }}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FaEllipsisV
                                            onClick={() => handleMenuClick(admin)}
                                            style={{ cursor: 'pointer', fontSize: '0.7rem', color: '#414141' }}
                                        />
                                        {menuVisible && selectedAdmin === admin && (
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
                        <p>Are you sure you want to delete the following admin(s)?</p>
                        <div className="modal-admin-list">
                            {selectedAdminIds.length > 0 ? (
                                selectedAdminIds.map(id => {
                                    const admin = admins.find(adm => adm._id === id);
                                    return (
                                        <p className="modal-admin-item" key={id}>
                                            <strong>Full Name:</strong> {admin.firstName} {admin.lastName}
                                            <br /> <strong>ID Number:</strong> {admin.idNum}
                                        </p>
                                    );
                                })
                            ) : (
                                <p>
                                    <strong>Full Name:</strong> {selectedAdmin?.firstName} {selectedAdmin?.lastName}
                                    <br /> <strong>ID Number:</strong> {selectedAdmin?.idNum}
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
        </div>
    );
}

export default DisplayAllAdmin;