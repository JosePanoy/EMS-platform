// admin.routes.js
import express from 'express';
import { createAdmin, loginAdmin, getAllAdmins, deleteAdmins, getAdminCounts } from '../controller/admin.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createAdmin);
router.post('/login', loginAdmin); 
router.get('/', getAllAdmins); // api for displaying all admin
router.delete('/', deleteAdmins); 
router.get('/count', getAdminCounts); 


export default router;
