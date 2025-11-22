// transfer.controller.js
import Transfer from "../models/Transfer.js";
import inventoryService from "../services/inventoryServices.js";

/**
 * Create transfer.
 * Body: { referenceId, fromWarehouse, fromLocation?, toWarehouse, toLocation?, scheduleDate, status, items: [{ productId, quantity }], notes }
 * When status becomes Done, call inventoryService.moveStock for each item.
 */

export const createTransfer = async (req, res) => {
  try {
    const body = req.body;
    if (!body.fromWarehouse || !body.toWarehouse || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ success: false, message: "fromWarehouse, toWarehouse and items required" });
    }

    const tr = await Transfer.create({
      referenceId: body.referenceId,
      fromWarehouse: body.fromWarehouse,
      toWarehouse: body.toWarehouse,
      fromLocation: body.fromLocation || null,
      toLocation: body.toLocation || null,
      scheduleDate: body.scheduleDate || null,
      status: body.status || "Waiting",
      items: body.items,
      notes: body.notes || null
    });

    if (tr.status === "Done") {
      for (const it of tr.items) {
        await inventoryService.moveStock({
          productId: it.productId,
          qty: it.quantity,
          fromWarehouse: tr.fromWarehouse,
          toWarehouse: tr.toWarehouse,
          fromLocation: tr.fromLocation || null,
          toLocation: tr.toLocation || null,
          referenceId: tr.referenceId || tr._id,
          userId: req.user?.id
        });
      }
    }

    return res.status(201).json({ success: true, data: tr });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const getTransfers = async (req, res) => {
  try {
    const q = {};
    if (req.query.status) q.status = req.query.status;
    const list = await Transfer.find(q).sort({ createdAt: -1 }).limit(500);
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTransferById = async (req, res) => {
  try {
    const t = await Transfer.findById(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Transfer not found" });
    return res.json({ success: true, data: t });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const completeTransfer = async (req, res) => {
  try {
    const t = await Transfer.findById(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Transfer not found" });

    const prev = t.status;
    Object.assign(t, req.body);
    await t.save();

    if (prev !== "Done" && t.status === "Done") {
      for (const it of t.items) {
        await inventoryService.moveStock({
          productId: it.productId,
          qty: it.quantity,
          fromWarehouse: t.fromWarehouse,
          toWarehouse: t.toWarehouse,
          fromLocation: t.fromLocation || null,
          toLocation: t.toLocation || null,
          referenceId: t.referenceId || t._id,
          userId: req.user?.id
        });
      }
    }

    return res.json({ success: true, data: t });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const deleteTransfer = async (req, res) => {
  try {
    const t = await Transfer.findById(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Transfer not found" });
    if (t.status === "Done") return res.status(400).json({ success: false, message: "Cannot delete completed transfer" });
    await Transfer.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Transfer deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};