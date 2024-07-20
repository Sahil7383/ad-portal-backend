const jwt = require("jsonwebtoken");

// List of allowed domains for admin users
const allowedDomains = ["xyzcompany.com", "abccompany.com", "example.com"];

/**
 * Generates a JSON Web Token (JWT) for the user.
 * @param {object} user - The user object.
 * @param {string} user.id - The user's ID.
 * @param {string} user.email - The user's email.
 * @returns {string} The generated JWT.
 */
const generateToken = (user) => {
  // Extract the domain part of the email address
  const userDomain = user.email.split("@").pop();

  // Determine if the user is an admin based on their domain
  const isAdmin = allowedDomains.some((domain) => userDomain.endsWith(domain));

  // Create a JWT with user ID, email, and admin status
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin },
    process.env.JWT_SECRET, // Secret key for signing the token
    {
      expiresIn: "24h", // Token expiration time
    }
  );
};

/**
 * Verifies a JSON Web Token (JWT).
 * @param {string} token - The JWT to verify.
 * @returns {object} The decoded payload if verification is successful.
 * @throws {Error} Throws an error if verification fails.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
