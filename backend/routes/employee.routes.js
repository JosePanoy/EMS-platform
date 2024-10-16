import express from 'express';
import bcrypt from 'bcrypt';  // Import bcrypt for hashing passwords
import Employee from '../model/employee.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, userTeam, password, idNum } = req.body;

    try {
        // Check if the email is already registered
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

        // Create a new employee
        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            userTeam,
            password: hashedPassword, // Store the hashed password
            idNum
        });

        // Save the new employee
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
