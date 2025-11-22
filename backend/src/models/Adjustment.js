import mongoose from "mongoose";

const adjustmentSchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true, unique: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    previousQty: Number,
    newQty: Number,
    difference: Number,
    reason: String,
    adjustedBy: String,
    warehouseShortCode: String,
    locationShortCode: String,
    status: { type: String, default: "Waiting" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Adjustment", adjustmentSchema);
