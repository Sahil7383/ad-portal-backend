const jwt = require("jsonwebtoken");

// Allowed domains for admin users
const allowedDomains = ["xyzcompany.com", "abccompany.com", "example.com"];

// Middleware to authenticate users based on JWT
exports.authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }

  // Extract the token from the header
  const token = authHeader.replace("Bearer ", "");
  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    // Handle invalid or expired token
    res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }
};

// Middleware to check if the authenticated user is an admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.email) {
    // Ensure the user object is present and has an email
    return res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }

  // Extract domain from user email
  const userDomain = req.user.email.split("@").pop();
  // Check if the domain is in the allowed list
  const isAllowed = allowedDomains.some((domain) =>
    userDomain.endsWith(domain)
  );

  if (isAllowed) {
    next(); // User is an admin, continue to the next middleware or route handler
  } else {
    res.status(403).json({ statusCode: 403, message: "Forbidden" }); // Use 403 for forbidden access
  }
};
