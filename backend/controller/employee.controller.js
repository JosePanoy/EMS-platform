//employee.controller.js
import Employee from '../model/employee.js';
import fs from 'fs';
import path from 'path';

export const createEmployee = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum, userTeam, icon, imageUpload } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password,
            idNum,
            userTeam,
            icon
        });

        if (imageUpload) {
            const imageBuffer = Buffer.from(imageUpload.split(",")[1], 'base64');
            const imagePath = path.join(__dirname, '../uploads/employeeIcon', `${idNum}.png`);
            fs.writeFileSync(imagePath, imageBuffer);
            newEmployee.iconPath = imagePath;
        }

        await newEmployee.save();
        return res.status(201).json({ message: 'Employee registered successfully', newEmployee });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering employee', error });
    }
};
