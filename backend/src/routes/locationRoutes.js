import express from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";
import { verifyToken, loadUserWithRole, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.post("/", authorizeRole("Inventory Manager", "Admin"), createLocation);
router.get("/", getLocations);
router.get("/:id", getLocationById);
router.put("/:id", authorizeRole("Inventory Manager", "Admin"), updateLocation);
router.delete("/:id", authorizeRole("Inventory Manager", "Admin"), deleteLocation);

export default router;
