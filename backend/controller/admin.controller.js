// admin.controller.js
import Admin from '../model/admin.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'; 

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

    // Debugging logs
    console.log('ID Number:', idNum);
    console.log('Password:', password);
    console.log('Stored Password:', admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid ID number or password' });
    }

    res.status(200).json({ message: 'Admin logged in successfully', admin });
};
