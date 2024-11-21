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

// Create HTTP server from express app
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server); // Use the Server constructor instead of default import

// Set up socket event listeners
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle login event (you can customize this to your logic)
    socket.on('login', async (employeeId) => {
        console.log(`Employee with ID ${employeeId} is now online`);
        // You can save employee's status in the database here
    });

    // Handle disconnection event
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use('/ems/admin', adminRoutes);
app.use('/ems/employee', employeeRoutes);

// Connect to MongoDB
mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Connection Success");

        // Start the server with Socket.io attached
        server.listen(PORT, () => {
            console.log(`Server is working on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
