//index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/admin.routes.js'; 
import employeeRoutes from './routes/employee.routes.js';
import http from 'http'; 
import { Server } from 'socket.io';
import Employee from './model/employee.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGOURL;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {

    socket.on('login', async (idNum) => {
        try {
            await Employee.updateMany({ isOnline: true }, { $set: { isOnline: false } });

            const employee = await Employee.findOne({ idNum: idNum });

            if (employee) {
                employee.isOnline = true;  
                await employee.save();
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    });

    socket.on('logout', async (idNum) => {
        try {
            const employee = await Employee.findOne({ idNum: idNum });

            if (employee) {
                employee.isOnline = false;  
                await employee.save();
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    });

    socket.on('disconnect', async () => {});
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use('/ems/admin', adminRoutes);
app.use('/ems/employee', employeeRoutes);

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Connection Success");
        server.listen(PORT, () => {
            console.log(`Server is working on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
