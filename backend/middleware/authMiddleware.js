// middleware/authMiddleware.js
import Admin from '../model/admin.js';
import Employee from '../model/employee.js';

export const authenticateUser = async (req, res, next) => {
    const { idNum, password } = req.body;

    const admin = await Admin.findOne({ idNum });
    if (admin) {

        if (await admin.comparePassword(password)) {
            req.user = admin; 
            return next();
        }
    }

    const employee = await Employee.findOne({ idNum });
    if (employee) {
       
        if (await employee.comparePassword(password)) {
            req.user = employee; 
            return next();
        }
    }

    return res.status(401).json({ message: 'Invalid ID number or password' });
};
