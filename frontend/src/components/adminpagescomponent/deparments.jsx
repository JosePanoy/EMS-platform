import React, { useEffect, useState } from "react";
import "../../assets/css/subpages-css/departments.css";
import { useOutletContext } from 'react-router-dom';

import SalesTeam from "../../assets/img/departments/sales.png";
import MarketingTeam from "../../assets/img/departments/marketing.png";
import CallRepresentative from "../../assets/img/departments/call-representative.png";
import TechTeam from "../../assets/img/departments/tech-team.png";
import SoftwareDev from "../../assets/img/departments/software-dev.png";
import MaintainanceTeam from "../../assets/img/departments/maintainance.png"

function Departments() {
    const admin = useOutletContext();
    const [departmentCounts, setDepartmentCounts] = useState({
        sales: 0,
        marketing: 0,
        tech: 0,
        softwareDevelopment: 0,
        callRepresentative: 0,
        maintainance: 0,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/ems/employee/department-count")
            .then(response => response.json())
            .then(data => {
                const counts = {
                    sales: 0,
                    marketing: 0,
                    tech: 0,
                    softwareDevelopment: 0,
                    callRepresentative: 0,
                    maintainance: 0,
                };

                data.forEach(({ department, count }) => {
                    if (department === 'sales') counts.sales = count;
                    if (department === 'marketing') counts.marketing = count;
                    if (department === 'tech') counts.tech = count;
                    if (department === 'software-development') counts.softwareDevelopment = count;
                    if (department === 'call-representative') counts.callRepresentative = count;
                    if(department == 'maintainance') counts.maintainance = count;
                });

                setDepartmentCounts(counts);
            })
            .catch(error => console.error('Error fetching department counts:', error));
    }, []);

    const handleDepartmentClick = (departmentName) => {
        setSelectedDepartment(departmentName);
        setIsModalOpen(true);

        const formattedDepartmentName = departmentName.toLowerCase().replace(/\s+/g, '-').replace('-team', '');

        fetch(`http://localhost:8000/ems/employee/employees/${formattedDepartmentName}`)
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
                setFilteredEmployees(data);  // Initially show all employees
            })
            .catch(error => console.error('Error fetching employees:', error));
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value === "") {
            setFilteredEmployees(employees);
        } else {
            setFilteredEmployees(
                employees.filter(employee => 
                    (employee.firstName + " " + employee.lastName).toLowerCase().includes(event.target.value.toLowerCase())
                )
            );
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDepartment("");
        setEmployees([]);
        setFilteredEmployees([]);
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '50px auto' }}>Departments {admin.idNum}</h2>
            <div className="department-grid">
                <div className="department-box department-marketing" onClick={() => handleDepartmentClick('Marketing Team')}>
                    <img src={MarketingTeam} alt="Marketing Team" />
                    <div className="department-info">
                        <h3>Marketing Team</h3>
                        <p className="employee-count">{departmentCounts.marketing}</p>
                    </div>
                </div>
                <div className="department-box department-sales" onClick={() => handleDepartmentClick('Sales Team')}>
                    <img src={SalesTeam} alt="Sales Team" />
                    <div className="department-info">
                        <h3>Sales Team</h3>
                        <p className="employee-count">{departmentCounts.sales}</p>
                    </div>
                </div>
                <div className="department-box department-call-representative" onClick={() => handleDepartmentClick('Call Representative Team')}>
                    <img src={CallRepresentative} alt="Call Representative Team" />
                    <div className="department-info">
                        <h3>Call Representative Team</h3>
                        <p className="employee-count">{departmentCounts.callRepresentative}</p>
                    </div>
                </div>
                <div className="department-box department-tech" onClick={() => handleDepartmentClick('Tech Team')}>
                    <img src={TechTeam} alt="Tech Team" />
                    <div className="department-info">
                        <h3>Tech Team</h3>
                        <p className="employee-count">{departmentCounts.tech}</p>
                    </div>
                </div>
                
                <div className="department-box department-software-development" onClick={() => handleDepartmentClick('Software Development Team')}>
                    <img src={SoftwareDev} alt="Software Development Team" />
                    <div className="department-info">
                        <h3>Software Development Team</h3>
                        <p className="employee-count">{departmentCounts.softwareDevelopment}</p>
                    </div>
                </div>


                <div className="department-box department-maintainance" onClick={() => handleDepartmentClick('Maintainance Team')}>
                    <img src={MaintainanceTeam} alt="Maintainance Team" />
                    <div className="department-info">
                        <h3>Maintainance Crew</h3>
                        <p className="employee-count">{departmentCounts.maintainance}</p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="department-modal-overlay">
                    <div className="department-modal">
                        <h2>{selectedDepartment}</h2>
                        <input 
                            type="text" 
                            placeholder="Search Employee" 
                            className="employee-search-bar"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <div className="employee-list-container">
                            <ul className="employee-list">
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map(employee => (
                                        <li key={employee._id} className="employee-item">
                                            <img src={employee.icon} alt="Employee Icon" className="employee-icon" />
                                            {employee.firstName} {employee.lastName}
                                        </li>
                                    ))
                                ) : (
                                    <li>No employees found.</li>
                                )}
                            </ul>
                        </div>
                        <button className="department-close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Departments;
