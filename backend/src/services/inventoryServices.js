// inventory.service.js
import Product from "../models/Product.js";
import LedgerEntry from "../models/LedgerEntry.js";
import mongoose from "mongoose";

/**
 * NOTE:
 * Product.stock is expected to be array of:
 * { warehouseShortCode: String, locationShortCode?: String, quantity: Number, reserved?: Number }
 *
 * All functions here update Product.total quantities and per-location quantities,
 * and create LedgerEntry records describing the change.
 */

const createLedger = async ({ referenceId, operationType, productId, productName, qty, from, to, userId, meta = {} }) => {
  return LedgerEntry.create({
    referenceId,
    operationType,
    productId,
    productName,
    quantity: qty,
    from,
    to,
    contact: meta.contact || null,
    createdBy: userId || null,
    meta
  });
};

const findStockIndex = (product, warehouseShortCode, locationShortCode) => {
  return product.stock.findIndex(s => s.warehouseShortCode === warehouseShortCode && (locationShortCode ? s.locationShortCode === locationShortCode : true));
};

export const addStock = async ({ productId, qty, warehouseShortCode, locationShortCode = null, referenceId = null, operationType = "RECEIPT", userId = null, meta = {} }) => {
  if (!qty || qty <= 0) throw new Error("Quantity must be > 0");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // find stock row
  let idx = findStockIndex(product, warehouseShortCode, locationShortCode);
  if (idx === -1) {
    // push new stock row
    product.stock.push({
      warehouseShortCode,
      locationShortCode,
      quantity: qty,
      reserved: 0
    });
  } else {
    product.stock[idx].quantity = (product.stock[idx].quantity || 0) + qty;
  }

  // update totals
  product.inventoryCount = (product.inventoryCount || 0) + qty;
  product.freeToUseInventory = (product.freeToUseInventory || 0) + qty;

  await product.save();

  // ledger
  await createLedger({
    referenceId,
    operationType,
    productId,
    productName: product.productName,
    qty,
    from: meta.from || null,
    to: warehouseShortCode + (locationShortCode ? `:${locationShortCode}` : ""),
    userId,
    meta
  });

  return product;
};

export const reduceStock = async ({ productId, qty, warehouseShortCode, locationShortCode = null, referenceId = null, operationType = "DELIVERY", userId = null, meta = {} }) => {
  if (!qty || qty <= 0) throw new Error("Quantity must be > 0");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // find stock row
  let idx = findStockIndex(product, warehouseShortCode, locationShortCode);
  if (idx === -1) throw new Error(`No stock found in ${warehouseShortCode}${locationShortCode ? `:${locationShortCode}` : ""}`);

  const available = product.stock[idx].quantity - (product.stock[idx].reserved || 0);
  if (available < qty) throw new Error("Insufficient stock at source");

  product.stock[idx].quantity = product.stock[idx].quantity - qty;

  // update totals
  product.inventoryCount = (product.inventoryCount || 0) - qty;
  product.freeToUseInventory = (product.freeToUseInventory || 0) - qty;

  await product.save();

  // ledger
  await createLedger({
    referenceId,
    operationType,
    productId,
    productName: product.productName,
    qty: -qty,
    from: warehouseShortCode + (locationShortCode ? `:${locationShortCode}` : ""),
    to: meta.to || null,
    userId,
    meta
  });

  return product;
};

export const moveStock = async ({ productId, qty, fromWarehouse, toWarehouse, fromLocation = null, toLocation = null, referenceId = null, userId = null, meta = {} }) => {
  // reduce from source then add to dest. This ensures totals unchanged but both ledger entries created.
  if (fromWarehouse === toWarehouse && fromLocation === toLocation) throw new Error("Source and destination are the same");

  await reduceStock({
    productId,
    qty,
    warehouseShortCode: fromWarehouse,
    locationShortCode: fromLocation,
    referenceId,
    operationType: "TRANSFER_OUT",
    userId,
    meta: { ...meta, transferPhase: "OUT" }
  });

  const result = await addStock({
    productId,
    qty,
    warehouseShortCode: toWarehouse,
    locationShortCode: toLocation,
    referenceId,
    operationType: "TRANSFER_IN",
    userId,
    meta: { ...meta, transferPhase: "IN" }
  });

  return result;
};

export const setStockAbsolute = async ({ productId, warehouseShortCode, locationShortCode = null, newQty, referenceId = null, operationType = "ADJUSTMENT", userId = null, reason = null, meta = {} }) => {
  // Adjust product stock to a new absolute value for a specified warehouse/location.
  if (newQty == null || newQty < 0) throw new Error("newQty must be >= 0");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let idx = findStockIndex(product, warehouseShortCode, locationShortCode);
  let prev = 0;
  if (idx === -1) {
    // create new row
    product.stock.push({
      warehouseShortCode,
      locationShortCode,
      quantity: newQty,
      reserved: 0
    });
    prev = 0;
  } else {
    prev = product.stock[idx].quantity || 0;
    product.stock[idx].quantity = newQty;
  }

  // update totals
  const diff = newQty - prev;
  product.inventoryCount = (product.inventoryCount || 0) + diff;
  product.freeToUseInventory = (product.freeToUseInventory || 0) + diff;

  await product.save();

  // ledger record with diff sign
  await createLedger({
    referenceId,
    operationType: operationType,
    productId,
    productName: product.productName,
    qty: diff,
    from: meta.from || null,
    to: meta.to || null,
    userId,
    meta: { reason, ...meta }
  });

  return product;
};

export default {
  addStock,
  reduceStock,
  moveStock,
  setStockAbsolute
};
