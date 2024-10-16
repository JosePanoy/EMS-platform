import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userTeam: { type: String, required: true },
    idNum: { type: String, required: true },
    password: { type: String, required: true }, // Ensure to hash passwords
});

export default mongoose.model('Employee', employeeSchema);