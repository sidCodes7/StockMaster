import express from "express";
import { getLedger, getLedgerByProduct } from "../controllers/ledgerController.js";
import { verifyToken, loadUserWithRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(loadUserWithRole);

router.get("/", getLedger);               // Full ledger
router.get("/product/:id", getLedgerByProduct); // Ledger filtered by product

export default router;
