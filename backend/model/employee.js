// employee.model.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    phoneNumber: String,
    userTeam: String,
    idNum: { type: String, unique: true },
    password: String,
    icon: String,
    isOnline: Boolean,
    loginTime: String,
    logoutTime: String,
    lastLoginDate: Date,  // Add this field to track the last login date
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
