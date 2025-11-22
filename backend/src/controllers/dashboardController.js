// dashboard.controller.js
import Receipt from "../models/Receipt.js";
import Delivery from "../models/Delivery.js";
import Product from "../models/Product.js";
import Warehouse from "../models/Warehouse.js";

/**
 * Compute dashboard stats:
 * receipts: counts by status
 * deliveries: counts by status
 * stock: totalProducts, totalInventory, lowStockItems
 * warehouses: total, utilizationPercentage (approx)
 */
export const getDashboardStats = async (req, res) => {
  try {
    const receiptsAgg = await Receipt.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const deliveriesAgg = await Delivery.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const products = await Product.find();
    const totalProducts = products.length;
    const totalInventory = products.reduce((s, p) => s + (p.inventoryCount || 0), 0);
    const lowStockItems = products.filter(p => p.reorderLevel != null && p.inventoryCount <= p.reorderLevel).length;

    const warehouses = await Warehouse.find();
    const totalWarehouses = warehouses.length;
    // naive utilization: sum(currentStock)/sum(capacity)
    const totalCapacity = warehouses.reduce((s, w) => s + (w.capacity || 0), 0) || 1;
    const currentStock = warehouses.reduce((s, w) => s + (w.currentStock || 0), 0);
    const utilizationPercentage = (currentStock / totalCapacity) * 100;

    const mapArr = (arr) => arr.reduce((acc, item) => { acc[item._id] = item.count; return acc; }, {});

    return res.json({
      success: true,
      data: {
        receipts: mapArr(receiptsAgg),
        deliveries: mapArr(deliveriesAgg),
        stock: {
          totalProducts,
          totalInventory,
          lowStockItems
        },
        warehouses: {
          total: totalWarehouses,
          utilizationPercentage: Number(utilizationPercentage.toFixed(1))
        }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
