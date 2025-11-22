import express from "express";
import {
  createTransfer,
  getTransfers,
  getTransferById,
  completeTransfer,
  deleteTransfer,
} from "../controllers/transferController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.post("/", authorizeRole("Inventory Manager", "Warehouse Staff", "Admin"), createTransfer);
router.get("/", getTransfers);
router.get("/:id", getTransferById);
router.put("/:id", authorizeRole("Inventory Manager", "Warehouse Staff", "Admin"), completeTransfer);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteTransfer);

export default router;
