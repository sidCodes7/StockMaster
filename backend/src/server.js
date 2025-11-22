import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import warehouseRoutes from "./routes/warehouseRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import adjustmentRoutes from "./routes/adjustmentRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config({ path: "../.env" });
const app = express();

// 🔧 MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 📦 DATABASE
connectDB();

// 🚀 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/adjustments", adjustmentRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 🏠 BASE ROUTE
app.get("/", (req, res) => {
  res.send("StockMaster IMS API is running...");
});

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ⚠️ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));
