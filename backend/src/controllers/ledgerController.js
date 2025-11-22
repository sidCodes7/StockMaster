// ledger.controller.js
import LedgerEntry from "../models/LedgerEntry.js";

/**
 * Get ledger entries with filters
 */
export const getLedger = async (req, res) => {
  try {
    const q = {};
    if (req.query.productId) q.productId = req.query.productId;
    if (req.query.referenceId) q.referenceId = req.query.referenceId;
    if (req.query.operationType) q.operationType = req.query.operationType;
    const list = await LedgerEntry.find(q).sort({ createdAt: -1 }).limit(1000);
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get ledger entries filtered by product ID
 */
export const getLedgerByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const list = await LedgerEntry.find({ productId }).sort({ createdAt: -1 }).limit(1000);
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
