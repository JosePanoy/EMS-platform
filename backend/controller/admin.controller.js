//admin.controller.js
import Admin from '../model/admin.js';
import fs from 'fs';
import path from 'path';

export const createAdmin = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum, icon, imageUpload } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password,
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
