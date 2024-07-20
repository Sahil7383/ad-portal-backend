const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/authUtils");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/responseHelper");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return errorResponse(res, "Email already in use", null, 400);
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate a JWT token for the new user
    const token = generateToken(newUser);

    return successResponse(res, "User registered successfully", { token }, 201);
  } catch (error) {
    next(error);
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return errorResponse(res, "Invalid email or password", null, 401);
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid email or password", null, 401);
    }

    // Generate a JWT token for the user
    const token = generateToken(user);

    return successResponse(res, "Login successful", { token }, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
