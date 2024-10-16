// employee.routes.js
import express from 'express';
import { createEmployee, loginEmployee } from '../controller/employee.controller.js';

const router = express.Router();

router.post('/', createEmployee);
router.post('/login', loginEmployee); // Add login route

export default router;
