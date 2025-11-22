import express from "express";
import {
  createWarehouse,
  getWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
} from "../controllers/warehouseController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);
router.use(loadUserWithRole);

// Only Inventory Manager and Admin can create/update/delete warehouses
router.post("/", authorizeRole("Inventory Manager", "Admin"), createWarehouse);
router.get("/", getWarehouses);
router.get("/:id", getWarehouseById);
router.put("/:id", authorizeRole("Inventory Manager", "Admin"), updateWarehouse);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteWarehouse);

export default router;
