import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    locationName: { type: String, required: true },
    locationShortCode: { type: String, required: true, unique: true },
    warehouseShortCode: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
