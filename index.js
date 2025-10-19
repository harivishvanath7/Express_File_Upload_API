const express = require("express");
const {upload} = require("./config/upload.js");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

const folderLocation = path.join(__dirname, "uploads");
app.use("/uploads", express.static(folderLocation));

app.get("/", (req, res) => {
    res.send("Welcome to File Upload API!!");
});

// Single File Upload
app.post("/upload/file", upload.single("image") , (req, res) => {
    return res.json({message: "File Uploaded!!", data: req.file});
})

// Multiple File Uploads
app.post("/upload/files", upload.array("images", 10), (req, res) => {
    return res.json({message: "Files Uploaded!!", data: req.files});
})

// Error handling middleware
app.use((err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                return res.status(400).send("Error: File too large!!, max size: 2MB.");
            default:
                return res.status(400).send(`Multer Error : ${err.message}`);
        }
    } else {
        return res.status(400).json({error: err.message});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`); 
});