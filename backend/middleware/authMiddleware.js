const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No or bad Authorization header");
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified user:", verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
