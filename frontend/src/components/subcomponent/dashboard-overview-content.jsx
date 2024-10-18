import React from 'react';
import { useOutletContext } from 'react-router-dom';
import "../../assets/css/subcomponent-css/dashboard-overview-content.css";

function DashboardOverviewContent() {
    const admin = useOutletContext();

    return (
        <div className="dashboard-grid">
            <div className="dashboard-box">
                <h3>Total Employees</h3>
                <div className="data">1200</div>
            </div>
            <div className="dashboard-box">
                <h3>Attendance Rates</h3>
                <div className="data">920%</div>
            </div>
            <div className="dashboard-box">
                <h3>Employee Turnover Rate</h3>
                <div className="data">105%</div>
            </div>
            <div className="dashboard-box">
                <h3>Performance Metrics</h3>
                <div className="data">850%</div>
            </div>
            <div className="dashboard-box">
                <h3>Pending Requests</h3>
                <div className="data">3</div>
            </div>
            <div className="dashboard-box">
                <h3>Department Breakdown</h3>
                <div className="data">Sales, HR, IT</div>
            </div>
        </div>
    );
}

export default DashboardOverviewContent;
