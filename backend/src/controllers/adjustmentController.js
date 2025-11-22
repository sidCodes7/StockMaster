// adjustment.controller.js
import Adjustment from "../models/Adjustment.js";
import inventoryService from "../services/inventoryServices.js";

/**
 * Create adjustment (Draft or Waiting). This endpoint records desired change.
 * If created with status Approved/Done it will apply immediately.
 *
 * Body: { referenceId, productId, productName, previousQty, newQty, difference, reason, adjustedBy, warehouseShortCode, locationShortCode, status }
 */

export const createAdjustment = async (req, res) => {
  try {
    const b = req.body;
    if (!b.productId || b.newQty == null || !b.warehouseShortCode) return res.status(400).json({ success: false, message: "productId, newQty and warehouseShortCode required" });

    const diff = b.newQty - (b.previousQty || 0);
    const adj = await Adjustment.create({
      referenceId: b.referenceId,
      productId: b.productId,
      productName: b.productName || null,
      previousQty: b.previousQty || null,
      newQty: b.newQty,
      difference: diff,
      reason: b.reason || null,
      adjustedBy: req.user?.id || b.adjustedBy || null,
      warehouseShortCode: b.warehouseShortCode,
      locationShortCode: b.locationShortCode || null,
      status: b.status || "Waiting"
    });

    // If status is Done apply immediately
    if (adj.status === "Done") {
      await inventoryService.setStockAbsolute({
        productId: adj.productId,
        warehouseShortCode: adj.warehouseShortCode,
        locationShortCode: adj.locationShortCode || null,
        newQty: adj.newQty,
        referenceId: adj.referenceId || adj._id,
        operationType: "ADJUSTMENT",
        userId: req.user?.id,
        reason: adj.reason
      });
    }

    return res.status(201).json({ success: true, data: adj });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const getAdjustments = async (req, res) => {
  try {
    const q = {};
    if (req.query.productId) q.productId = req.query.productId;
    if (req.query.status) q.status = req.query.status;
    const list = await Adjustment.find(q).sort({ createdAt: -1 }).limit(500);
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAdjustmentById = async (req, res) => {
  try {
    const a = await Adjustment.findById(req.params.id);
    if (!a) return res.status(404).json({ success: false, message: "Adjustment not found" });
    return res.json({ success: true, data: a });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update adjustment. If status flips to Done and it wasn't Done before -> apply stock.
 */
export const updateAdjustment = async (req, res) => {
  try {
    const a = await Adjustment.findById(req.params.id);
    if (!a) return res.status(404).json({ success: false, message: "Adjustment not found" });

    const prev = a.status;
    Object.assign(a, req.body);
    await a.save();

    if (prev !== "Done" && a.status === "Done") {
      await inventoryService.setStockAbsolute({
        productId: a.productId,
        warehouseShortCode: a.warehouseShortCode,
        locationShortCode: a.locationShortCode || null,
        newQty: a.newQty,
        referenceId: a.referenceId || a._id,
        operationType: "ADJUSTMENT",
        userId: req.user?.id,
        reason: a.reason
      });
    }

    return res.json({ success: true, data: a });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const deleteAdjustment = async (req, res) => {
  try {
    const a = await Adjustment.findById(req.params.id);
    if (!a) return res.status(404).json({ success: false, message: "Adjustment not found" });
    if (a.status === "Done") return res.status(400).json({ success: false, message: "Cannot delete completed adjustment" });
    await Adjustment.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Adjustment deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
