import React, { useEffect, useState } from 'react';
import "../../assets/css/employee-css/dashboard-displayAllEmployee.css";
import ArrowUpButton from '../subcomponent/ArrowUpButton';
import { io } from 'socket.io-client';

function DashboardDisplayAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortedByName, setSortedByName] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
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

        socket.on('status-change', (data) => {
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee._id === data.employeeId
                        ? { ...employee, isOnline: data.isOnline }
                        : employee
                )
            );
        });

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

    const handleStatusChange = (event) => {
        setFilterStatus((prev) => (prev === event.target.value ? "all" : event.target.value));
    };

    const filteredEmployees = employees.filter((employee) =>
        (employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.userTeam.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterStatus === "all" || 
        (filterStatus === "online" && employee.isOnline) || 
        (filterStatus === "absent" && !employee.isOnline))
    );

    const sortedEmployees = sortedByName
        ? [...filteredEmployees].sort((a, b) => a.firstName.localeCompare(b.firstName))
        : filteredEmployees;

    const departments = ['sales', 'marketing', 'call-representative', 'tech', 'software-development', 'maintainance'];

    const calculateLoginStatus = (employee) => {
        const actualLoginTime = new Date();

        if (!employee.loginTime) return { status: 'Absent', color: 'red' };
    
        const [loginHour, loginMinute] = employee.loginTime.split(':');
        const loginDate = new Date();
        loginDate.setHours(parseInt(loginHour), parseInt(loginMinute), 0, 0);

        const diffInMinutes = Math.floor((actualLoginTime - loginDate) / (1000 * 60));

        if (diffInMinutes < -10) {
            return { status: 'Early Bird', color: 'darkyellowgreen' }; 
        } else if (diffInMinutes >= -10 && diffInMinutes < 0) {
            return { status: 'Just in Time', color: 'darkgreen' }; 
        } else if (diffInMinutes >= 0 && diffInMinutes <= 5) {
            return { status: 'In Time, Do Better', color: 'darkorange' }; 
        } else if (diffInMinutes > 5 && diffInMinutes <= 15) {
            return { status: 'Late', color: 'red' }; 
        } else {
            return { status: 'Absent', color: 'red' }; 
        }
    };
    

    const renderDepartmentGrid = (department) => {
        const departmentEmployees = sortedEmployees.filter((employee) => employee.userTeam === department);
        return (
            <div className={`employee-grid-container ${department.toLowerCase().replace(' ', '-')}`} key={department}>
                <h2 style={{ textAlign: 'left', marginBottom: '-5px', marginLeft: '50px' }}>{department.toUpperCase()}</h2>
                <div className="employee-grid">
                    {departmentEmployees.map((employee) => {
                        const { status, color } = calculateLoginStatus(employee);
                        return (
                            <div key={employee._id} className="employee-tile">
                                <div className="employee-tile-image">
                                    <img src={employee.icon} alt={`${employee.firstName} ${employee.lastName}`} />
                                </div>
                                <div className="employee-tile-info">
                                    <p className="employee-tile-name">{employee.firstName} {employee.lastName}</p>
                                    <p className="employee-tile-department">{employee.userTeam}</p>
                                    <div className="employee-tile-status">
                                        <span className="status-dot" style={{ backgroundColor: color }}></span>
                                        {status}
                                    </div>
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

                {departments.map((department) => renderDepartmentGrid(department))}
            </div>

            <ArrowUpButton />
        </>
    );
}

export default DashboardDisplayAllEmployee;
