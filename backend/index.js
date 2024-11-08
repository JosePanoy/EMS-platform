import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/admin.routes.js'; 
import employeeRoutes from './routes/employee.routes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGOURL;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' })); 
app.use('/ems/admin', adminRoutes);
app.use('/ems/employee', employeeRoutes);

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Connection Success");
        app.listen(PORT, () => {
            console.log(`Server is working on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
