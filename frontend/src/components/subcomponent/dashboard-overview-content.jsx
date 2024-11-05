import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import "../../assets/css/subcomponent-css/dashboard-overview-content.css";

function DashboardOverviewContent() {
    const admin = useOutletContext();
    
    const [adminCount, setAdminCount] = useState(null);
    const [employeeCount, setEmployeeCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/ems/admin/count')
            .then((response) => {
                setAdminCount(response.data.adminCount);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching admin count');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/ems/employee/count')
            .then((response) => {
                setEmployeeCount(response.data.employeeCount);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching admin count');
                setLoading(false);
            });
    }, []);

    return (
        <div className="dashboard-grid">
            <div className="dashboard-box">
                <h3>Total Employees</h3>
                <div className='data'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        employeeCount
                    )}
                </div>
            </div>
            <div className="dashboard-box">
                <h3>Total Admins</h3>
                <div className="data">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        adminCount
                    )}
                </div>
            </div>
            <div className="dashboard-box">
                <h3>Attendance Rates</h3>
                <div className="data">still working</div>
            </div>
            <div className="dashboard-box">
                <h3>Employee Turnover Rate</h3>
                <div className="data">still working</div>
            </div>
            <div className="dashboard-box">
                <h3>Performance Metrics</h3>
                <div className="data">still working</div>
            </div>
            <div className="dashboard-box">
                <h3>Pending Requests</h3>
                <div className="data">still working</div>
            </div>
            <div className="dashboard-box">
                <h3>Department Breakdown</h3>
                <div className="data">still working</div>
            </div>
        </div>
    );
}

export default DashboardOverviewContent;
