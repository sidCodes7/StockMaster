import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.post("/", authorizeRole("Inventory Manager", "Admin"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authorizeRole("Inventory Manager", "Admin"), updateProduct);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteProduct);

export default router;
