// product.controller.js
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const body = req.body;
    if (!body.productName || !body.unitCost) {
      return res.status(400).json({ success: false, message: "productName and unitCost required" });
    }

    const product = await Product.create({
      productName: body.productName,
      unitCost: body.unitCost,
      category: body.category || null,
      description: body.description || null,
      status: body.status || "Active",
      inventoryCount: 0,
      freeToUseInventory: 0,
      stock: []
    });

    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const q = {};
    if (req.query.status) q.status = req.query.status;
    if (req.query.category) q.category = req.query.category;
    const list = await Product.find(q).sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
