// warehouse.controller.js
import Warehouse from "../models/Warehouse.js";

export const createWarehouse = async (req, res) => {
  try {
    const body = req.body;
    if (!body.warehouseName || !body.warehouseShortCode) return res.status(400).json({ success: false, message: "warehouseName and warehouseShortCode required" });
    const w = await Warehouse.create(body);
    return res.status(201).json({ success: true, data: w });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getWarehouses = async (req, res) => {
  try {
    const list = await Warehouse.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getWarehouseById = async (req, res) => {
  try {
    const w = await Warehouse.findById(req.params.id);
    if (!w) return res.status(404).json({ success: false, message: "Warehouse not found" });
    return res.json({ success: true, data: w });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateWarehouse = async (req, res) => {
  try {
    const w = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!w) return res.status(404).json({ success: false, message: "Warehouse not found" });
    return res.json({ success: true, data: w });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Warehouse deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
