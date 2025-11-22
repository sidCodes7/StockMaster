# StockMaster - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Open Your Browser
Navigate to: **http://localhost:5173**

### Step 3: Login
Use these credentials:
- **Email:** `admin@stockmaster.com`
- **Password:** `admin123`

---

## 📱 Navigation Guide

### Main Sections

1. **Dashboard** - Your home page with overview of all operations
2. **Products** - Manage your product catalog
3. **Receipts** - Track incoming stock from suppliers
4. **Delivery Orders** - Manage outgoing shipments
5. **Internal Transfers** - Move stock between warehouses
6. **Stock Adjustments** - Record inventory count corrections
7. **Move History** - View complete audit trail
8. **Warehouses** - Manage storage locations

---

## 🎯 Common Tasks

### Add a New Product
1. Click **Products** in sidebar
2. Click **Add Product** button
3. Fill in product details
4. Set stock levels for each warehouse
5. Click **Create Product**

### Create a Receipt (Incoming Stock)
1. Click **Receipts** in sidebar
2. Click **New Receipt** button
3. Select supplier and warehouse
4. Add products and quantities
5. Save as Draft or mark as Done

### Create a Delivery Order (Outgoing Stock)
1. Click **Delivery Orders** in sidebar
2. Click **New Delivery** button
3. Enter customer information
4. Select products to ship
5. Process through Pick → Pack → Ship workflow

### Transfer Stock Between Warehouses
1. Click **Internal Transfers** in sidebar
2. Click **New Transfer** button
3. Select source and destination warehouses
4. Add products and quantities
5. Schedule and complete transfer

### Adjust Stock Counts
1. Click **Stock Adjustments** in sidebar
2. Click **New Adjustment** button
3. Select warehouse
4. Enter counted quantities
5. System calculates differences
6. Add reason for adjustment
7. Validate to apply changes

---

## 📊 Understanding Status Badges

- **Draft** (Gray) - Not yet finalized, can be edited
- **Waiting** (Yellow) - Pending processing or approval
- **Ready** (Blue) - Prepared and ready for action
- **Done** (Green) - Successfully completed
- **Canceled** (Red) - Operation canceled

---

## 🔍 Search & Filter Tips

- Use the **search bar** at top of tables to find items quickly
- Use **status filters** to show only specific statuses
- Click on any **table row** to view full details
- Look for **low stock warnings** (red text with warning icon)

---

## ⚙️ Settings & Profile

### Update Your Profile
1. Click your avatar in top-right corner
2. Select **Your Profile**
3. Edit name and email
4. Save changes

### View Warehouse Settings
1. Click **Warehouses** in sidebar
2. View capacity and utilization
3. Click **Edit** to modify warehouse details

---

## 🎨 UI Features

- **Responsive Design** - Works on all screen sizes
- **Dark Sidebar** - Easy navigation
- **Color-Coded Status** - Quick visual indicators
- **Real-time Stats** - Dashboard KPIs update automatically
- **Search Everything** - Fast filtering on all pages

---

## 🐛 Troubleshooting

### If the app doesn't start
```bash
npm install
npm run dev
```

### If you see errors
1. Make sure Node.js v18+ is installed
2. Clear browser cache
3. Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Can't log in
- Check you're using correct credentials
- Email: `admin@stockmaster.com`
- Password: `admin123`

---

## 📝 Mock Data Included

The application comes with sample data:
- ✅ 6 Products
- ✅ 4 Warehouses
- ✅ Multiple Receipts, Deliveries, Transfers
- ✅ Stock Adjustments
- ✅ Movement History

Perfect for testing and learning the system!

---

## 🎓 Learning Path

**Beginner:**
1. Explore the Dashboard
2. View existing products
3. Check Move History

**Intermediate:**
4. Create a new product
5. Add a receipt
6. Create a delivery order

**Advanced:**
7. Perform stock transfer
8. Make stock adjustment
9. Analyze warehouse utilization

---

## 💡 Pro Tips

1. **Dashboard First** - Always check dashboard for overview
2. **Low Stock Alerts** - Red warnings indicate items below minimum
3. **Status Workflow** - Follow Draft → Waiting → Done progression
4. **Search is Fast** - Use search instead of scrolling
5. **Filter by Status** - Quickly find pending operations

---

## 📞 Need Help?

Refer to the main **README.md** for:
- Complete feature documentation
- Technical architecture
- Development commands
- Deployment instructions

---

**Happy Managing! 📦**
