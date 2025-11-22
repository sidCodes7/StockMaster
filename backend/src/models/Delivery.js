import mongoose from "mongoose";

const deliveryItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    quantity: Number,
    locationShortCode: String
  },
  { _id: false }
);

const deliverySchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true, unique: true },
    from: String,
    to: String,
    contact: String,
    scheduleDate: Date,
    status: { type: String, default: "Waiting" },
    deliveryAddress: String,
    operationType: String,
    responsible: String,
    productName: String,
    quantity: Number,
    items: [deliveryItemSchema],
    createdDate: { type: Date, default: Date.now },
    completedDate: Date,
    trackingNumber: String,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("Delivery", deliverySchema);
