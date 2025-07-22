const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const AudioFile = require("../models/AudioFile");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const audio = new AudioFile({
      filename: req.file.filename,
      path: req.file.path,
      // uploadedBy: req.user._id (to be added after auth)
    });

    await audio.save();

    res.json({
      success: true,
      path: req.file.path,
      audioId: audio._id,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;
