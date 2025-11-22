import express from "express";
import {
  createAdjustment,
  getAdjustments,
  getAdjustmentById,
  deleteAdjustment
} from "../controllers/adjustmentController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.post("/", authorizeRole("Inventory Manager", "Admin"), createAdjustment);
router.get("/", getAdjustments);
router.get("/:id", getAdjustmentById);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteAdjustment);

export default router;
