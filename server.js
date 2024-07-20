require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adRoutes = require("./routes/adRoutes");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

// Create an instance of an Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Serve static files (such as images) from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register API routes for authentication
app.use("/api", authRoutes);

// Register API routes for advertisements
app.use("/api/ads", adRoutes);

// Test route to check if the server is running
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Use the custom error handler middleware for handling errors
app.use(errorHandler);

// Synchronize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
});
