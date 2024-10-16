import Admin from '../model/admin.js';

export const createAdmin = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum } = req.body;

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
            password, // Don't forget to hash this
            idNum
        });

        await newAdmin.save();
        return res.status(201).json(newAdmin);
    } catch (error) {
        console.error('Error creating admin:', error); // Log the error
        return res.status(500).json({ message: 'Server error' });
    }
};
