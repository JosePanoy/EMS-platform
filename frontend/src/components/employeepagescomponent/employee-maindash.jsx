import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import "../../assets/css/employee-css/dashboard-displayAllEmployee.css";

function DashboardDisplayAllEmployee() {
    const [employees, setEmployees] = useState([]);

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

    return (
        <div className="dashboard-grid-container">
            {employees.map((employee) => (
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
    );
}

export default DashboardDisplayAllEmployee;
