import express from "express";
import {
  signup,
  signin,
  requestPasswordReset,
  verifyOTP,
  resetPassword,
  getCurrentUser,
  logout
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

// Protected routes
router.get("/me", verifyToken, getCurrentUser);

export default router;
