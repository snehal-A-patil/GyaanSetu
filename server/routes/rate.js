const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

// ✅ POST /user/rate/:id
router.post("/rate/:id", authMiddleware, async (req, res) => {
  const toUserId = req.params.id;
  const { stars, feedback } = req.body;

  try {
    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ msg: "User not found" });

    const alreadyRated = toUser.ratings.find(
      (r) => r.from.toString() === req.userId
    );
    if (alreadyRated) return res.status(400).json({ msg: "You already rated this user" });

    toUser.ratings.push({ from: req.userId, stars, feedback });
    await toUser.save();

    res.json({ msg: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to rate", error: err.message });
  }
});

// ✅ GET /user/ratings/:id
router.get("/ratings/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("ratings.from", "name");
    res.json(user.ratings);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch ratings", error: err.message });
  }
});

module.exports = router;
