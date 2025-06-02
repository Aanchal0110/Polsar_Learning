const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save decoded data for access in route
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
