import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyToken, loadUserWithRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.get("/", getDashboardStats);

export default router;
