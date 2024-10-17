// employee.controller.js
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


export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching employees', error });
    }
};




export const deleteEmployees = async (req, res) => {
    const { ids } = req.body;

    try {

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'No IDs provided for deletion.' });
        }

        const result = await Employee.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No employees found with the provided IDs.' });
        }
        return res.status(200).json({ message: 'Employees deleted successfully.', deletedCount: result.deletedCount });
    } catch (error) {

        return res.status(500).json({ message: 'Error deleting employees', error });
    }
};