// employeeAttendance.js
import mongoose from 'mongoose';

const employeeAttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    loginTime: { type: String, required: true },
    status: { type: String, required: true },
    logoutTime: { type: String },
    logoutStatus: { type: String }
}, { timestamps: true });

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);

export default EmployeeAttendance;
