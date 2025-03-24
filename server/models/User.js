const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  skillsToTeach: [String],
  skillsToLearn: [String],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  experience: { type: String },
  portfolio: { type: String },
  matchRequests: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    },
  ],
  ratings: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      stars: Number,
      feedback: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
