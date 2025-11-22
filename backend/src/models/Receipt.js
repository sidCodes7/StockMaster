import mongoose from "mongoose";

const receiptItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    quantity: Number,
    locationShortCode: String
  },
  { _id: false }
);

const receiptSchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true, unique: true },
    from: String,
    to: String,
    contactName: String,
    scheduleDate: Date,
    status: { type: String, default: "Waiting" },
    productName: String,
    quantity: Number,
    items: [receiptItemSchema],
    createdDate: { type: Date, default: Date.now },
    completedDate: Date,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("Receipt", receiptSchema);
