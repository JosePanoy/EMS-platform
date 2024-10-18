//admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    idNum: { type: String, required: true },
    icon: { type: String, required: true } // for user profile or icon selected
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
