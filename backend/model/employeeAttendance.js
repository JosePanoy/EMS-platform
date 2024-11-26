// employeeAttendance.js
import mongoose from 'mongoose';

const EmployeeAttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    loginTime: {
        type: String,
        required: true
    },
    logoutTime: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Early Bird', 'Just In Time', 'In Time, Do Better', 'Late', 'Absent', 'Present'],
        default: 'Present'
    }
}, {
    timestamps: true
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);

export default EmployeeAttendance;
