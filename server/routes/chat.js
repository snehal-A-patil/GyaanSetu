const express = require("express");
const router = express.Router();
const ChatMessage = require("../models/ChatMessage");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Send message
router.post("/", authMiddleware, async (req, res) => {
  const { receiver, message } = req.body;
  const newMsg = new ChatMessage({
    sender: req.userId,
    receiver,
    message,
  });
  await newMsg.save();
  res.json({ msg: "Message sent", data: newMsg });
});

// Get chat history with a user
router.get("/:userId", authMiddleware, async (req, res) => {
  const messages = await ChatMessage.find({
    $or: [
      { sender: req.userId, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.userId },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
});

module.exports = router;
