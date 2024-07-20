const express = require("express");
const { login, signup } = require("../controllers/authController");

const router = express.Router();

// Route to handle user login
// Expects a POST request with user credentials in the request body
router.post("/login", login);

// Route to handle user signup
// Expects a POST request with user details (email and password) in the request body
router.post("/signup", signup);

module.exports = router;
