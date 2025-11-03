import React, { useState } from "react";
import axios from "axios";
import { motion as Motion } from "framer-motion";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const MAX_SIZE_MB = 5; // Max file size limit (5MB)
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  // ✅ File validation helper
  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("❌ Invalid file type. Please upload only JPG, PNG, or GIF files.");
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`⚠️ File too large. Max allowed size is ${MAX_SIZE_MB} MB.`);
      return false;
    }
    return true;
  };

  const handleSingleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
    }
  };

  const handleMultipleChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => validateFile(file));

    if (validFiles.length > 0) {
      setMultipleFiles(validFiles);
      setError("");
    } else {
      setMultipleFiles([]);
    }
  };

  const handleSingleUpload = async () => {
    if (!file) return setError("Please select a valid file.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Error uploading file.");
      setMessage("");
    }
  };

  const handleMultipleUpload = async () => {
    if (multipleFiles.length === 0)
      return setError("Please select valid files to upload.");

    const formData = new FormData();
    multipleFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post("http://localhost:3000/upload/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Error uploading files.");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-amber-200 via-yellow-200 to-orange-300 p-6">
      <Motion.h1
        className="text-4xl font-extrabold text-gray-800 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        File Upload App 🚀
      </Motion.h1>

      {/* Single File Upload */}
      <Motion.div
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-5 border border-gray-100 hover:shadow-xl transition-all"
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="font-semibold text-xl text-gray-700">Single File Upload</h2>

        <div className="flex flex-col items-center gap-3">
          <input
            type="file"
            onChange={handleSingleChange}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <button
            onClick={handleSingleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md"
          >
            Upload
          </button>
        </div>
      </Motion.div>

      {/* Multiple File Upload */}
      <Motion.div
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-5 border border-gray-100 hover:shadow-xl transition-all mt-8"
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="font-semibold text-xl text-gray-700">Multiple File Upload</h2>

        <div className="flex flex-col items-center gap-3">
          <input
            type="file"
            multiple
            onChange={handleMultipleChange}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <button
            onClick={handleMultipleUpload}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-medium shadow-md"
          >
            Upload Files
          </button>
        </div>
      </Motion.div>

      {/* ✅ Success Message */}
      {message && (
        <Motion.p
          className="text-center text-green-700 font-semibold mt-6 bg-green-50 px-6 py-2 rounded-lg shadow-sm border border-green-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ {message}
        </Motion.p>
      )}

      {/* ❌ Error Message */}
      {error && (
        <Motion.p
          className="text-center text-red-700 font-semibold mt-6 bg-red-50 px-6 py-2 rounded-lg shadow-sm border border-red-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </Motion.p>
      )}
    </div>
  );
};

export default FileUpload;
