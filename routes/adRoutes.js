const express = require("express");
const multer = require("multer");
const { createAd, getAds } = require("../controllers/adController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const path = require("path");

const router = express.Router();

// Multer setup for file handling
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Define the filename for the uploaded files
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Unique filename with timestamp
  },
});

// Create an instance of multer with the defined storage configuration
const upload = multer({ storage });

// Route to create a new advertisement
// Requires authentication and handles image uploads
router.post("/create", authenticate, upload.single("image"), createAd);

// Route to get all advertisements
// Requires authentication and admin privileges
router.get("/all", authenticate, isAdmin, getAds);

module.exports = router;
