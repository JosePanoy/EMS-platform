// admin.routes.js
import express from 'express';
import { createAdmin, loginAdmin } from '../controller/admin.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createAdmin);
router.post('/login', loginAdmin); // Add login route

export default router;
