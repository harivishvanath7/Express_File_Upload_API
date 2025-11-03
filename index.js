const express = require("express");
const { upload } = require("./config/upload.js");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow CORS only for development
app.use(
  cors({
    origin: ["http://localhost:5173"], // for local dev
    methods: ["GET", "POST"],
  })
);

// ✅ Serve frontend build (React app)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ For Serving Uploaded Files
const folderLocation = path.join(__dirname, "uploads");
app.use("/uploads", express.static(folderLocation));

// ✅ Logging requests (optional)
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

// ✅ Routes
app.get("/api", (req, res) => {
  res.send("Welcome to File Upload API!!");
});

// ✅ Single File Upload
app.post("/upload/file", upload.single("image"), (req, res) => {
  return res.json({ message: "File Uploaded!!", data: req.file });
});

// ✅ Multiple File Upload
app.post("/upload/files", upload.array("images", 10), (req, res) => {
  return res.json({ message: "Files Uploaded!!", data: req.files });
});

// ✅ Error Handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({ message: "Error: File too large! (max 2MB)" });
      default:
        return res.status(400).json({ message: `Multer Error: ${err.message}` });
    }
  } else {
    return res.status(400).json({ message: err.message });
  }
});

// ✅ React frontend fallback (for Vite build)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
