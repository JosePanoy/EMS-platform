import express from 'express';
import bcrypt from 'bcrypt';  // Import bcrypt for hashing passwords
import Admin from '../model/admin.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum } = req.body;

    try {
        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

        // Create a new admin
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPassword, // Store the hashed password
            idNum
        });

        // Save the new admin
        await newAdmin.save();
        res.status(201).json(newAdmin); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
