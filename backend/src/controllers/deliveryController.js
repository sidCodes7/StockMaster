// delivery.controller.js
import Delivery from "../models/Delivery.js";
import inventoryService from "../services/inventoryServices.js";

/**
 * Create delivery. Items should reference productId and quantity.
 * If created with status Done, the stock will be decreased immediately.
 */
export const createDelivery = async (req, res) => {
  try {
    const body = req.body;
    if (!body.from || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ success: false, message: "from (warehouse) and items required" });
    }

    const delivery = await Delivery.create({
      referenceId: body.referenceId,
      from: body.from,
      to: body.to || null,
      contact: body.contact || null,
      scheduleDate: body.scheduleDate || null,
      status: body.status || "Waiting",
      deliveryAddress: body.deliveryAddress || null,
      operationType: body.operationType || "Standard Delivery",
      responsible: body.responsible || null,
      items: body.items,
      notes: body.notes || null,
    });

    if (delivery.status === "Done") {
      for (const it of delivery.items) {
        await inventoryService.reduceStock({
          productId: it.productId,
          qty: it.quantity,
          warehouseShortCode: delivery.from,
          locationShortCode: it.locationShortCode || null,
          referenceId: delivery.referenceId || delivery._id,
          operationType: "DELIVERY",
          userId: req.user?.id,
          meta: { to: delivery.to }
        });
      }
    }

    return res.status(201).json({ success: true, data: delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const getDeliveries = async (req, res) => {
  try {
    const q = {};
    if (req.query.status) q.status = req.query.status;
    if (req.query.referenceId) q.referenceId = req.query.referenceId;
    if (req.query.warehouseShortCode) q.from = req.query.warehouseShortCode;
    const list = await Delivery.find(q).sort({ createdAt: -1 }).limit(500);
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getDeliveryById = async (req, res) => {
  try {
    const d = await Delivery.findById(req.params.id);
    if (!d) return res.status(404).json({ success: false, message: "Delivery not found" });
    return res.json({ success: true, data: d });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Validate delivery. If status transitions to Done (and wasn't Done), apply stock reductions.
 */
export const validateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ success: false, message: "Delivery not found" });

    const prev = delivery.status;
    Object.assign(delivery, req.body);
    await delivery.save();

    if (prev !== "Done" && delivery.status === "Done") {
      for (const it of delivery.items) {
        await inventoryService.reduceStock({
          productId: it.productId,
          qty: it.quantity,
          warehouseShortCode: delivery.from,
          locationShortCode: it.locationShortCode || null,
          referenceId: delivery.referenceId || delivery._id,
          operationType: "DELIVERY",
          userId: req.user?.id,
          meta: { to: delivery.to }
        });
      }
    }

    return res.json({ success: true, data: delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ success: false, message: "Delivery not found" });
    if (delivery.status === "Done") return res.status(400).json({ success: false, message: "Cannot delete completed delivery" });

    await Delivery.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Delivery deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
