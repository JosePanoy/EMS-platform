//employee.routes.js
import express from 'express';
import { createEmployee, loginEmployee, getAllEmployees, deleteEmployees, 
    getEmployeeCount, updateEmployee, getDepartmentEmployeeCount, 
    getEmployeesByDepartment, logoutEmployee } from '../controller/employee.controller.js';

const router = express.Router();

router.post('/', createEmployee);
router.post('/login', loginEmployee); 
router.get('/', getAllEmployees);
router.delete('/', deleteEmployees);
router.get('/count', getEmployeeCount);
router.put('/update', updateEmployee); 
router.get('/department-count', getDepartmentEmployeeCount);
router.get('/employees/:department', getEmployeesByDepartment);
router.post('/logout', logoutEmployee);



export default router;
