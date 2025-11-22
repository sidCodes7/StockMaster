import mongoose from "mongoose";

const transferItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    quantity: Number
  },
  { _id: false }
);

const transferSchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true, unique: true },
    fromWarehouse: String,
    toWarehouse: String,
    fromLocation: String,
    toLocation: String,
    scheduleDate: Date,
    status: { type: String, default: "Waiting" },
    items: [transferItemSchema],
    createdDate: { type: Date, default: Date.now },
    completedDate: Date,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", transferSchema);
