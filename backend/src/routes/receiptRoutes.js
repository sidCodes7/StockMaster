import express from "express";
import {
  createReceipt,
  getReceipts,
  getReceiptById,
  validateReceipt,
  deleteReceipt,
} from "../controllers/receiptController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.post("/", authorizeRole("Inventory Manager", "Warehouse Staff", "Admin"), createReceipt);
router.get("/", getReceipts);
router.get("/:id", getReceiptById);
router.put("/:id", authorizeRole("Inventory Manager", "Warehouse Staff", "Admin"), validateReceipt);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteReceipt);

export default router;
