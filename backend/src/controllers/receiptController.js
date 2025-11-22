// receipt.controller.js
import Receipt from "../models/Receipt.js";
import inventoryService from "../services/inventoryServices.js";

/**
 * Create receipt (Draft/Waiting)
 * Body: { referenceId, from, to (warehouseShortCode), contactName, scheduleDate, status, items: [{ productId, quantity, locationShortCode? }], notes }
 *
 * When a receipt is validated (status -> Done), controller will call inventoryService.addStock for each item.
 */

export const createReceipt = async (req, res) => {
  try {
    const body = req.body;
    if (!body.to || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ success: false, message: "to (warehouse) and items required" });
    }

    const receipt = await Receipt.create({
      referenceId: body.referenceId,
      from: body.from || null,
      to: body.to,
      contactName: body.contactName || null,
      scheduleDate: body.scheduleDate || null,
      status: body.status || "Waiting",
      items: body.items,
      notes: body.notes || null
    });

    // If status is Done on creation, apply stock changes immediately.
    if (receipt.status === "Done") {
      for (const it of receipt.items) {
        await inventoryService.addStock({
          productId: it.productId,
          qty: it.quantity,
          warehouseShortCode: receipt.to,
          locationShortCode: it.locationShortCode || null,
          referenceId: receipt.referenceId || receipt._id,
          operationType: "RECEIPT",
          userId: req.user?.id,
          meta: { from: receipt.from }
        });
      }
    }

    return res.status(201).json({ success: true, data: receipt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const getReceipts = async (req, res) => {
  try {
    const q = {};
    if (req.query.status) q.status = req.query.status;
    if (req.query.referenceId) q.referenceId = req.query.referenceId;
    if (req.query.warehouseShortCode) q.to = req.query.warehouseShortCode;
    const list = await Receipt.find(q).sort({ createdAt: -1 }).limit(500);
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getReceiptById = async (req, res) => {
  try {
    const rec = await Receipt.findById(req.params.id);
    if (!rec) return res.status(404).json({ success: false, message: "Receipt not found" });
    return res.json({ success: true, data: rec });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Validate receipt. If status changes to Done and was not Done before -> apply stock.
 */
export const validateReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ success: false, message: "Receipt not found" });

    const prevStatus = receipt.status;
    Object.assign(receipt, req.body);
    await receipt.save();

    if (prevStatus !== "Done" && receipt.status === "Done") {
      // apply each item
      for (const it of receipt.items) {
        await inventoryService.addStock({
          productId: it.productId,
          qty: it.quantity,
          warehouseShortCode: receipt.to,
          locationShortCode: it.locationShortCode || null,
          referenceId: receipt.referenceId || receipt._id,
          operationType: "RECEIPT",
          userId: req.user?.id,
          meta: { from: receipt.from }
        });
      }
    }

    return res.json({ success: true, data: receipt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ success: false, message: "Receipt not found" });

    // Prevent deleting receipts that are Done
    if (receipt.status === "Done") return res.status(400).json({ success: false, message: "Cannot delete a completed receipt" });

    await Receipt.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Receipt deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
