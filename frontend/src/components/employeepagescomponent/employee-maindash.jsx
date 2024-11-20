import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import "../../assets/css/employee-css/dashboard-displayAllEmployee.css";
import ArrowUpButton from '../subcomponent/ArrowUpButton';

function DashboardDisplayAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortedByName, setSortedByName] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8000/ems/employee');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = () => {
        setSortedByName(prevState => !prevState);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.userTeam.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedEmployees = sortedByName 
        ? [...filteredEmployees].sort((a, b) => a.firstName.localeCompare(b.firstName)) 
        : filteredEmployees;

    return (
        <>
        <div>
            <div className="employee-search-container">
                <input
                    type="text"
                    className="employee-search-input"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <label className="employee-sort-checkbox">
                    <input
                        type="checkbox"
                        checked={sortedByName}
                        onChange={handleSortChange}
                        style={{marginTop: '10px'}}
                    />
                    Sort by Name
                </label>
            </div>

            <div className="dashboard-grid-container">
                {sortedEmployees.map((employee) => (
                    <div key={employee._id} className="dashboard-tile">
                        <div className="dashboard-tile-image">
                            <img
                                src={employee.icon}
                                alt={`${employee.firstName} ${employee.lastName}`}
                            />
                        </div>
                        <div className="dashboard-tile-info">
                            <p className="dashboard-tile-name">{employee.firstName} {employee.lastName}</p>
                            <p className="dashboard-tile-department">{employee.userTeam}</p>
                            <div className="dashboard-tile-status">
                                <span className="status-dot"></span> Present
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <ArrowUpButton />
        </>
    );
}

export default DashboardDisplayAllEmployee;
