import React, { useEffect, useState } from 'react';
import "../../assets/css/employee-css/dashboard-displayAllEmployee.css";
import ArrowUpButton from '../subcomponent/ArrowUpButton';
import { io } from 'socket.io-client';

function DashboardDisplayAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortedByName, setSortedByName] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const socket = io('http://localhost:8000');

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

        return () => {
            socket.off('status-change');
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = () => {
        setSortedByName((prevState) => !prevState);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const capitalizeDepartmentName = (name) => {
        return name
            .split('-')  
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-');
    };

    const filteredEmployees = employees.filter((employee) =>
        (employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.userTeam.toLowerCase().includes(searchQuery.toLowerCase()))
    ).filter((employee) => {
        if (statusFilter === "all") return true;
        if (statusFilter === "present" && employee.isOnline === true) return true;
        if (statusFilter === "absent" && employee.isOnline === false) return true;
        return false;
    });

    const sortedEmployees = sortedByName
        ? [...filteredEmployees].sort((a, b) => a.firstName.localeCompare(b.firstName))
        : filteredEmployees;

    const departments = ['sales', 'marketing', 'call-representative', 'tech', 'software-development', 'maintainance'];

    const renderDepartmentGrid = (department) => {
        const departmentEmployees = sortedEmployees.filter((employee) => employee.userTeam === department);
        return (
            <div className={`employee-grid-container ${department.toLowerCase().replace(' ', '-')}`} key={department}>
                <h2 style={{ textAlign: 'left', marginBottom: '-5px', marginLeft: '50px', fontSize: '1rem', cursor: 'default' }}>{department.toUpperCase()}</h2>
                <div className="employee-grid">
                    {departmentEmployees.map((employee) => {
                        return (
                            <div key={employee._id} className="employee-tile">
                                <div className="employee-status" style={{ backgroundColor: employee.isOnline ? '#56cd00' : '#7c0000' }}></div>
                                <div className="employee-tile-image">
                                    <img src={employee.icon} alt={`${employee.firstName} ${employee.lastName}`} />
                                </div>
                                <div className="employee-tile-info">
                                    <p className="employee-tile-name">{employee.firstName} {employee.lastName}</p>
                                    <p className="employee-tile-department">{capitalizeDepartmentName(employee.userTeam)}</p>
                                </div>
                            </div>
                        );
                    })}
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
                            <input style={{marginTop: '10px'}}
                                type="radio"
                                value="all"
                                checked={statusFilter === "all"}
                                onChange={handleStatusFilterChange}
                            />
                            All
                        </label>
                        <label>
                            <input
                                style={{marginTop: '10px'}}
                                type="radio"
                                value="present"
                                checked={statusFilter === "present"}
                                onChange={handleStatusFilterChange}
                            />
                            Present
                        </label>
                        <label>
                            <input
                                style={{marginTop: '10px'}}
                                type="radio"
                                value="absent"
                                checked={statusFilter === "absent"}
                                onChange={handleStatusFilterChange}
                            />
                            Absent
                        </label>
                    </div>
                </div>

                {departments.map((department) => renderDepartmentGrid(department))}
            </div>

            <ArrowUpButton />
        </>
    );
}

export default DashboardDisplayAllEmployee;
