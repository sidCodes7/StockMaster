// location.controller.js
import Location from "../models/Location.js";

export const createLocation = async (req, res) => {
  try {
    const b = req.body;
    if (!b.locationName || !b.locationShortCode || !b.warehouseShortCode) return res.status(400).json({ success: false, message: "locationName, locationShortCode and warehouseShortCode required" });
    const l = await Location.create(b);
    return res.status(201).json({ success: true, data: l });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getLocations = async (req, res) => {
  try {
    const q = {};
    if (req.query.warehouseShortCode) q.warehouseShortCode = req.query.warehouseShortCode;
    const list = await Location.find(q).sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const l = await Location.findById(req.params.id);
    if (!l) return res.status(404).json({ success: false, message: "Location not found" });
    return res.json({ success: true, data: l });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const l = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!l) return res.status(404).json({ success: false, message: "Location not found" });
    return res.json({ success: true, data: l });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Location deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
