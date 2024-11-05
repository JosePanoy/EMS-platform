// admin.controller.js
import Admin from '../model/admin.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import employee from '../model/employee.js';

export const createAdmin = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum, icon, imageUpload } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPassword, 
            idNum,
            icon
        });

        if (imageUpload) {
            const imageBuffer = Buffer.from(imageUpload.split(",")[1], 'base64');
            const imagePath = path.join(__dirname, '../uploads/adminIcon', `${idNum}.png`);
            fs.writeFileSync(imagePath, imageBuffer);
            newAdmin.iconPath = imagePath;
        }

        await newAdmin.save();
        return res.status(201).json({ message: 'Admin registered successfully', newAdmin });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering admin', error });
    }
};

export const loginAdmin = async (req, res) => {
    const { idNum, password } = req.body;
    const admin = await Admin.findOne({ idNum });
    if (!admin) {
        return res.status(401).json({ message: 'Invalid ID number or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid ID number or password' });
    }
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Admin logged in successfully', token, admin });
};


export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching admins', error });
    }
};

export const deleteAdmins = async (req, res) => {
    const { ids } = req.body;

    try {
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'No IDs provided for deletion.' });
        }

        const result = await Admin.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No admins found with the provided IDs.' });
        }
        return res.status(200).json({ message: 'Admins deleted successfully.', deletedCount: result.deletedCount });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting admins', error });
    }
};

// get admin counts

export const getAdminCounts = async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments(); 
        return res.status(200).json({ adminCount }); 
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching admin count', error });
    }
};

// for update the admins data

export const updateAdmin = async (res,req) => {
    const {firstName, lastName, email, address, phoneNumber, adminId} = req.body; 
    
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message : 'Admin not found'})
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin && existingAdmin._id.toString() !== adminId) {
            return res.status(200).json({ message: 'Email already in use' });
        }

        admin.firstName = firstName || admin.firstName;
        admin.lastName = lastName || admin.lastName;
        admin.email = email || admin.email;
        admin.address = address || admin.address;
        admin.phoneNumber = phoneNumber || admin.phoneNumber;

        await admin.save();

        return res.status(200).json({ message: 'Admin updated Successfully', admin});
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ message: 'Error updating employee', error });
    }
}