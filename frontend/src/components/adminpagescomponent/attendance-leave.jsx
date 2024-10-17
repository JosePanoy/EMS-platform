import React from 'react'
import { useOutletContext } from 'react-router-dom';

function AttendanceLeaveManagement() {
    const admin = useOutletContext();
    return(
        <>

        <h2 style={{ textAlign: 'center', margin: '100px 0 auto' }}>
       Attendance & Leave Management
        </h2>


        </>
    )
}

export default AttendanceLeaveManagement;