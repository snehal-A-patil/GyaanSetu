const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Auth middleware
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

// ✅ Get profile
router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// ✅ Get suggested matches
// ✅ Get suggested matches including matchRequests
router.get("/matches", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    const matches = await User.find({
      _id: { $ne: req.userId },
      skillsToTeach: { $in: currentUser.skillsToLearn },
      skillsToLearn: { $in: currentUser.skillsToTeach },
    }).select("name bio skillsToTeach skillsToLearn matchRequests");

    res.json(matches);
  } catch (err) {
    res.status(500).json({ msg: "Matchmaking failed", error: err.message });
  }
});


// ✅ Update profile
router.post("/profile", authMiddleware, async (req, res) => {
  const { name, bio, skillsToTeach, skillsToLearn, experience, portfolio } = req.body;

  await User.findByIdAndUpdate(req.userId, {
    name,
    bio,
    skillsToTeach,
    skillsToLearn,
    experience,
    portfolio,
  });

  res.json({ msg: "Profile updated" });
});

// ✅ Send match request (updated to sync both users)
router.post("/request/:id", authMiddleware, async (req, res) => {
  const receiverId = req.params.id;
  const senderId = req.userId;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver) return res.status(404).json({ msg: "User not found" });

    const alreadyRequested = sender.matchRequests?.some(
      (r) => r.userId.toString() === receiverId
    );
    if (alreadyRequested) {
      return res.status(400).json({ msg: "Request already sent" });
    }

    // Update both users
    sender.matchRequests.push({ userId: receiverId, status: "sent" });
    receiver.matchRequests.push({ userId: senderId, status: "pending" });

    await sender.save();
    await receiver.save();

    res.json({ msg: "Match request sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Approve/reject a request
router.post("/respond/:id", authMiddleware, async (req, res) => {
  const currentUser = await User.findById(req.userId);
  const requestId = req.params.id;
  const { action } = req.body; // "accepted" or "rejected"

  const request = currentUser.matchRequests.find((r) => r.userId.toString() === requestId);
  if (!request) return res.status(404).json({ msg: "Request not found" });

  request.status = action;
  await currentUser.save();

  res.json({ msg: `Request ${action}` });
});

// ✅ Get incoming requests for logged-in user
router.get("/incoming-requests", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "matchRequests.userId",
      "name email bio experience portfolio skillsToTeach skillsToLearn"
    );

    const pending = user.matchRequests.filter((r) => r.status === "pending");

    res.json(pending);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load requests", error: err.message });
  }
});


module.exports = router;
