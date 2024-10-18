// employee.routes.js
import express from 'express';
import { createEmployee, loginEmployee, getAllEmployees, deleteEmployees } from '../controller/employee.controller.js';

const router = express.Router();

router.post('/', createEmployee);
router.post('/login', loginEmployee); 
router.get('/', getAllEmployees); // api for displaying all admin
router.delete('/', deleteEmployees);


export default router;
