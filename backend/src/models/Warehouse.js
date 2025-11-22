import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    warehouseName: { type: String, required: true },
    warehouseShortCode: { type: String, required: true, unique: true },
    address: String,
    capacity: Number,
    currentStock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Warehouse", warehouseSchema);
