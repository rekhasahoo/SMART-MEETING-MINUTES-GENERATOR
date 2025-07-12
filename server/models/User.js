const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  audioFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "AudioFile" }]
});

module.exports = mongoose.model("User", userSchema);
