import React from "react";
import "../../assets/css/employee-css/employee-maindash.css";

function EmployeeMainDash({ employee }) {
    return (
        <div className="EmployeeMainDash__grid-container">
            <div className="EmployeeMainDash__grid-item EmployeeMainDash__box-1">
                <div className="EmployeeMainDash__info-container">
                    <img src={employee ? employee.icon : ''} alt="Employee Icon" className="EmployeeMainDash__icon" />
                    <div className="EmployeeMainDash__text-info">
                        <p className="EmployeeMainDash__name">
                            {employee ? `${employee.firstName} ${employee.lastName}` : "No employee info"}
                        </p>
                        <p className="EmployeeMainDash__team">
                            {employee ? `Department: ${employee.userTeam.charAt(0).toUpperCase() + employee.userTeam.slice(1)}` : "No team info"}
                        </p>
                    </div>
                </div>
                <div 
                    className="EmployeeMainDash__status" 
                    style={{
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        backgroundColor: employee && employee.isOnline ? 'yellowgreen' : 'red', 
                        borderRadius: '50%', 
                        width: '15px', 
                        height: '15px', 
                        border: '2px solid #E2F1E7'
                    }}
                ></div>
            </div>
            <div className="EmployeeMainDash__grid-item EmployeeMainDash__box-2">
                <h3>Task's & Assignments</h3>
     
                <p>{employee ? `Employee: ${employee.firstName}` : "No employee info"}</p>
            </div>
            <div className="EmployeeMainDash__grid-item EmployeeMainDash__box-3-10">
                <h3>Notifications</h3>
     
                <p>{employee ? `Employee: ${employee.firstName}` : "No employee info"}</p>
            </div>
            <div className="EmployeeMainDash__grid-item EmployeeMainDash__box-3-10">
                <h3>Performance Feedback</h3>
          
                <p>{employee ? `Employee: ${employee.firstName}` : "No employee info"}</p>
            </div>
            <div className="EmployeeMainDash__grid-item EmployeeMainDash__box-3-10">
                <h3>Payroll & Compensation</h3>
              
                <p>{employee ? `Employee: ${employee.firstName}` : "No employee info"}</p>
            </div>
            <div className="EmployeeMainDash__grid-item EmployeeMainDash__box-3-10">
                <h3>Search and FAQ's</h3>
        
                <p>{employee ? `Employee: ${employee.firstName}` : "No employee info"}</p>
            </div>
        </div>
    );
}

export default EmployeeMainDash;
