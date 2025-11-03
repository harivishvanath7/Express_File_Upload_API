# Node.js File Upload API with Multer

A simple Node.js API for uploading single or multiple files (images and PDFs) using **Express** and **Multer**.

---

## Features

- Single file upload (`.jpeg`, `.jpg`, `.png`, `.pdf`)
- Multiple file uploads (up to 10 files at a time)
- Automatic file renaming using UUID to avoid conflicts
- File size limit: 2 MB
- Error handling for invalid file types and size

---

## Tech Stack

- Node.js
- Express.js
- Multer
- UUID
- Path module

---

## Project Structure

```
project-folder/
├─ config/
│  └─ upload.js         # Multer configuration
├─ uploads/             # Uploaded files will be stored here
├─ index.js             # Main server file
├─ package.json
└─ README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create an `uploads` folder in the project root:

```bash
mkdir uploads
```

4. Start the server:

```bash
npm start
```

Server will run at `http://localhost:3000`

---

## API Endpoints

### 1. Single File Upload

**POST** `/upload/file`  

- Form Data Key: `image`  
- Allowed Types: `jpeg, jpg, png, pdf`  
- Max Size: 2MB  

**Response Example:**
```json
{
  "message": "File Uploaded!!",
  "data": {
    "fieldname": "image",
    "originalname": "example.png",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "uploads/",
    "filename": "uuid-generated-name.png",
    "path": "uploads/uuid-generated-name.png",
    "size": 12345
  }
}
```

---

### 2. Multiple File Uploads

**POST** `/upload/files`  

- Form Data Key: `images`  
- Max Files: 10  

**Response Example:**
```json
{
  "message": "Files Uploaded!!",
  "data": [
    {
      "fieldname": "images",
      "originalname": "example1.png",
      "filename": "uuid-generated-name1.png",
      ...
    },
    {
      "fieldname": "images",
      "originalname": "example2.jpg",
      "filename": "uuid-generated-name2.jpg",
      ...
    }
  ]
}
```

---

## Error Handling

- Invalid file type:
```json
{
  "error": "Only JPEG, PNG, or PDF files are allowed"
}
```

- File too large (>2MB):
```text
Error: File too large!!, max size: 2MB.
```

---

## License

MIT License