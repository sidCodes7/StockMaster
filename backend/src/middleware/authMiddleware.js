import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Verify JWT Token
 */
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * Load full user from database (for role checking)
 */
export const loadUserWithRole = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user.role = user.role;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error loading user role" });
  }
};

/**
 * Check if user has required role
 * Usage: authorizeRole("Inventory Manager", "Admin")
 */
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: "User not authenticated or role not loaded" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Required roles: ${roles.join(", ")}. Your role: ${req.user.role}` 
      });
    }

    next();
  };
};
