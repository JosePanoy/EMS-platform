// employeeAttendance.js
import mongoose from 'mongoose';

const employeeAttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    loginTime: { type: String, required: true },
    logoutTime: { type: String, default: null },
    status: { type: String, default: 'Present' }, 
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);

export default EmployeeAttendance;