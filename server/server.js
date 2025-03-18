const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const rateRoutes = require("./routes/rate");
const chatRoutes = require("./routes/chat");

app.get("/api/ping", (req, res) => {
  res.send("Server is running 👌");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user", rateRoutes);
app.use("/api/chat", chatRoutes);

// 🧠 MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Mongo Error:", err));

// 🔌 Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));