import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    loginId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Inventory Manager", "Warehouse Staff", "Admin"],
      required: true
    },
    isVerified: { type: Boolean, default: false },
    resetOTP: String,
    resetOTPExpiry: Date,
    lastLogin: Date,
    status: { type: String, default: "Active" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
