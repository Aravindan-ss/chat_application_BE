import express from "express";
import * as dotenv from "dotenv";
import routes from "./src/routes/route";
import { connectDB } from "./src/config/db";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  path: "/ws",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users: Record<string, string> = {};

io.on("connection", (socket) => {
  console.info("[INFO] New client connected:", socket.id);

  socket.on("register", (userName: string) => {
    users[userName] = socket.id;
    console.info(`[INFO] User registered: ${userName} => ${socket.id}`);
  });

  socket.on("privateMessage", ({ toUserId, fromUserId, message }) => {
    const recipientSocketId = users[toUserId];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receivePrivateMessage", {
        message,
        sender: fromUserId,
        timestamp: new Date(),
      });
      console.info(`[INFO] ${fromUserId} → ${toUserId}: ${message}`);
    } else {
      console.info(`[INFO] User ${toUserId} not connected`);
    }
  });

  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(users).find(
      (name) => users[name] === socket.id
    );
    if (disconnectedUser) {
      delete users[disconnectedUser];
      console.info(`[INFO] Disconnected: ${disconnectedUser}`);
    }
  });
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

app.get("/api/health", async (req, res) => {
  res.send({ status: "success" });
});

// Start server
server.listen(port, () => {
  console.info(`[INFO] Server running on http://localhost:${port}`);
  connectDB();
});
