import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    referenceId: String,
    date: { type: Date, default: Date.now },
    operationType: String, // Receipt, Delivery, Transfer, Adjustment
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    quantity: Number,
    from: String,
    to: String,
    status: String,
    contact: String
  },
  { timestamps: true }
);

export default mongoose.model("LedgerEntry", ledgerSchema);
