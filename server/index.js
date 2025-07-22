require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.use('/uploads', express.static('uploads'));
// Test route
app.get("/", (req, res) => res.send("APIh working"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch((err) => console.error("❌ DB connection failed:", err));
