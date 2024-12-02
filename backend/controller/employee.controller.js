//employee.controller.js
import Employee from '../model/employee.js';
import EmployeeAttendance from '../model/employeeAttendance.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const createEmployee = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, password, idNum, userTeam, icon, imageUpload, loginTime, logoutTime } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newLoginTime = loginTime ? moment(loginTime, ["h:mm A", "HH:mm"]).format("h:mm A") : "8:00 AM";
        const newLogoutTime = logoutTime ? moment(logoutTime, ["h:mm A", "HH:mm"]).format("h:mm A") : "5:00 PM"; 

        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPassword,
            idNum,
            userTeam,
            icon,
            loginTime: newLoginTime,  
            logoutTime: newLogoutTime, 
            isOnline: false,  
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

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];

    try {
        const actualLoginTimeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeDifference = (currentDate - new Date(`${currentDateString}T${employee.loginTime}`)) / (1000 * 60);
        let status = 'Present';

        if (timeDifference <= -15) status = 'Early Bird';
        else if (timeDifference > -15 && timeDifference < 0) status = 'Just In Time';
        else if (timeDifference >= 0 && timeDifference <= 5) status = 'In Time, Do Better';
        else if (timeDifference > 5 && timeDifference <= 15) status = 'Late';
        else if (timeDifference > 15 && timeDifference <= 30) status = 'Absent';

        const existingAttendance = await EmployeeAttendance.findOne({ employeeId: employee._id, date: currentDateString });

        if (existingAttendance) {
            existingAttendance.loginTime = actualLoginTimeString;
            existingAttendance.status = status;
            existingAttendance.logoutTime = null;
            existingAttendance.logoutStatus = null;
            await existingAttendance.save();
        } else {
            const newAttendance = new EmployeeAttendance({
                employeeId: employee._id,
                date: currentDateString,
                loginTime: actualLoginTimeString,
                status,
                logoutTime: null,
                logoutStatus: null,
            });
            await newAttendance.save();
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error recording attendance' });
    }

    employee.lastLoginDate = currentDate;
    employee.isOnline = true;
    await employee.save();

    const token = jwt.sign({ id: employee._id, role: 'employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Employee logged in successfully', token, employee });
};

export const logoutEmployee = async (req, res) => {
    const { idNum } = req.body;

    const employee = await Employee.findOne({ idNum });
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];

    try {
        const existingAttendance = await EmployeeAttendance.findOne({ employeeId: employee._id, date: currentDateString });

        if (existingAttendance) {
            const actualLogoutTimeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            existingAttendance.logoutTime = actualLogoutTimeString;
            existingAttendance.logoutStatus = 'Logged Out';
            await existingAttendance.save();

            employee.isOnline = false;
            await employee.save();

            return res.status(200).json({ message: 'Employee logged out successfully', status: 'Logged Out' });
        } else {
            return res.status(400).json({ message: 'No attendance record found for today' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error during logout process' });
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

export const getEmployeeCount = async(req,res) => {
    try {
        const employeeCount = await Employee.countDocuments();
        return res.status(200).json({employeeCount});
    } catch (error) {
        return res.status(500).json({message : 'Error fetching number of employees', error})
    }
};

export const updateEmployee = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumber, employeeId } = req.body;

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee && existingEmployee._id.toString() !== employeeId) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        employee.firstName = firstName || employee.firstName;
        employee.lastName = lastName || employee.lastName;
        employee.email = email || employee.email;
        employee.address = address || employee.address;
        employee.phoneNumber = phoneNumber || employee.phoneNumber;

        await employee.save();

        return res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ message: 'Error updating employee', error });
    }
};

export const getDepartmentEmployeeCount = async (req, res) => {
    try {
        const departmentCounts = await Employee.aggregate([
            {
                $group: {
                    _id: "$userTeam", 
                    count: { $sum: 1 } 
                }
            }
        ]);

        const formattedCounts = departmentCounts.map(department => ({
            department: department._id,
            count: department.count
        }));

        return res.status(200).json(formattedCounts);
    } catch (error) {
        return res.status(500).json({ message: 'Error counting employees by department', error });
    }
};

export const getEmployeesByDepartment = async (req, res) => {
    const { department } = req.params;

    try {
        const employees = await Employee.find({ userTeam: department });

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found in this department' });
        }

        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching employees', error });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching employees', error });
    }
};
