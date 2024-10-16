import Employee from '../model/employee.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 

export const createEmployee = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum, userTeam, icon, imageUpload } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPassword,
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

export const loginEmployee = async (req, res) => {
    const { idNum, password } = req.body;
    const employee = await Employee.findOne({ idNum });
    if (!employee) {
        return res.status(401).json({ message: 'Invalid ID number or password' });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid ID number or password' });
    }
    const token = jwt.sign({ id: employee._id, role: 'employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Employee logged in successfully', token, employee });
};
