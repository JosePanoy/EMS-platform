import React, { useEffect, useState } from 'react';
import "../../assets/css/employee-css/dashboard-displayAllEmployee.css";
import ArrowUpButton from '../subcomponent/ArrowUpButton';

function DashboardDisplayAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortedByName, setSortedByName] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");

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

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setFilterStatus(filterStatus === value ? "all" : value);
    };

    const filteredEmployees = employees.filter(employee =>
        (employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.userTeam.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterStatus === "all" || (filterStatus === "online" && employee.isOnline) || (filterStatus === "absent" && !employee.isOnline))
    );

    const sortedEmployees = sortedByName 
        ? [...filteredEmployees].sort((a, b) => a.firstName.localeCompare(b.firstName)) 
        : filteredEmployees;

    const departments = ['sales', 'marketing', 'call-representative', 'tech', 'software-development', 'maintainance'];

    const renderDepartmentGrid = (department) => {
        const departmentEmployees = sortedEmployees.filter(employee => employee.userTeam === department);
        return (
            <div className={`employee-grid-container ${department.toLowerCase().replace(' ', '-')}`} key={department}>
                <h2 style={{textAlign: 'left', marginBottom: '-5px', marginLeft: '50px'}}>{department.toUpperCase()}</h2>
                <div className="employee-grid">
                    {departmentEmployees.map((employee) => (
                        <div key={employee._id} className="employee-tile">
                            <div className="employee-tile-image">
                                <img
                                    src={employee.icon}
                                    alt={`${employee.firstName} ${employee.lastName}`}
                                />
                            </div>
                            <div className="employee-tile-info">
                                <p className="employee-tile-name">{employee.firstName} {employee.lastName}</p>
                                <p className="employee-tile-department">{employee.userTeam}</p>
                                <div className="employee-tile-status">
                                    <span 
                                        className="status-dot" 
                                        style={{
                                            backgroundColor: employee.isOnline ? '#54f000' : 'red'
                                        }}
                                    ></span> 
                                    {employee.isOnline ? 'Present' : 'Absent'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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
                            style={{ marginTop: '10px' }}
                        />
                        Sort by Name
                    </label>
                    <div className="employee-status-filter">
                        <label>
                            <input
                                type="radio"
                                name="statusFilter"
                                value="all"
                                checked={filterStatus === "all"}
                                onChange={handleStatusChange}
                            />
                            All
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="statusFilter"
                                value="online"
                                checked={filterStatus === "online"}
                                onChange={handleStatusChange}
                            />
                            Online
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="statusFilter"
                                value="absent"
                                checked={filterStatus === "absent"}
                                onChange={handleStatusChange}
                            />
                            Absent
                        </label>
                    </div>
                </div>

                {departments.map(department => renderDepartmentGrid(department))}
            </div>

            <ArrowUpButton />
        </>
    );
}

export default DashboardDisplayAllEmployee;
