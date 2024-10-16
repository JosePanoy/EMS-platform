import Employee from '../model/employee.js';

export const createEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};