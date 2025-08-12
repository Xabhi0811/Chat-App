import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './db/db.js';
import router from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Connect DB
connectDB();

// Setup socket.io
export const io = new Server(server, {
    cors: { origin: "*" }
});

export const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected:", userId);

    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected:", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes
app.use('/api/status', (req, res) => res.send("Server is live"));
app.use("/api/auth",router);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
