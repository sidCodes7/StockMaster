import mongoose from "mongoose";

const warehouseStockSchema = new mongoose.Schema(
  {
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
    warehouseShortCode: String,
    quantity: Number,
    reserved: Number
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    unitCost: { type: Number, required: true },
    inventoryCount: { type: Number, default: 0 },
    freeToUseInventory: { type: Number, default: 0 },
    category: String,
    description: String,
    status: { type: String, default: "Active" },
    stock: [warehouseStockSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
