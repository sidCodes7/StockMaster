import express from "express";
import {
  createDelivery,
  getDeliveries,
  getDeliveryById,
  validateDelivery,
  deleteDelivery,
} from "../controllers/deliveryController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.post("/", authorizeRole("Inventory Manager", "Warehouse Staff", "Admin"), createDelivery);
router.get("/", getDeliveries);
router.get("/:id", getDeliveryById);
router.put("/:id", authorizeRole("Inventory Manager", "Warehouse Staff", "Admin"), validateDelivery);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteDelivery);

export default router;
