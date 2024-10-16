//employee.routes.js
import express from 'express';
import { createEmployee } from '../controller/employee.controller.js';

const router = express.Router();

router.post('/', createEmployee);

export default router;
