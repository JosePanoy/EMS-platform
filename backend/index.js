import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/admin.routes.js'; 
import employeeRoutes from './routes/employee.routes.js';
import http from 'http';  // Import http module
import { Server } from 'socket.io';  // Import the 'Server' class from socket.io

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGOURL;

const server = http.createServer(app);

// Add CORS configuration for Socket.IO here
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('login', async (employeeId) => {
        console.log(`Employee with ID ${employeeId} is now online`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

app.use(cors({ origin: 'http://localhost:5173' })); // CORS for general API requests
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
