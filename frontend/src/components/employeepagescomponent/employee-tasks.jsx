import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

function EmployeeTask() {
    const employee = useOutletContext();

    return(
        <>

        <h2 style={{ textAlign: 'center', margin: '100px 0 auto', fontWeight: '600' }}>
       Employee Task
        </h2>
        {employee && (
                <div style={{ textAlign: 'center' }}>
                    <p>ID: {employee.idNum}</p>
                    <p>Name: {employee.firstName} {employee.lastName}</p>
                </div>
            )}

        </>
    )
}

export default EmployeeTask; 