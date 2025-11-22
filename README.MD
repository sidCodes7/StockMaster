# StockMaster - Inventory Management System

A modern, full-featured inventory management system built with React, Vite, and TailwindCSS.

## 🚀 Features

### Core Functionality
- **Dashboard** - Real-time KPIs, stock levels, pending operations
- **Product Management** - Create, edit, and track products across warehouses
- **Receipts** - Manage incoming stock from suppliers
- **Delivery Orders** - Handle outgoing shipments to customers
- **Internal Transfers** - Move stock between warehouses
- **Stock Adjustments** - Physical inventory counts and reconciliation
- **Move History** - Complete audit trail of all stock movements
- **Warehouse Management** - Configure and monitor warehouse capacity
- **User Profile** - Manage account settings

### Key Capabilities
- ✅ Multi-warehouse inventory tracking
- ✅ Status workflow (Draft → Waiting → Ready → Done)
- ✅ Low stock alerts
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ Clean, modern UI
- ✅ Mock data for testing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation & Setup

1. **Install dependencies (if not already installed)**
```bash
npm install
```

2. **Start the development server**
```bash
npm run dev
```

3. **Open your browser**
Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

Use these credentials to log in:
- **Email:** admin@stockmaster.com
- **Password:** admin123

## 📁 Project Structure

```
StockMaster/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── UI.jsx        # Button, Input, Card, Modal, etc.
│   │   └── Table.jsx     # Table and search components
│   ├── layouts/          # Layout components
│   │   ├── MainLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductForm.jsx
│   │   ├── Receipts.jsx
│   │   ├── DeliveryOrders.jsx
│   │   ├── InternalTransfers.jsx
│   │   ├── StockAdjustments.jsx
│   │   ├── MoveHistory.jsx
│   │   ├── Warehouses.jsx
│   │   └── Profile.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── data/             # Mock data
│   │   └── mockData.js
│   ├── utils/            # Helper functions
│   │   └── helpers.js
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json
└── README.md
```

## 🎨 Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Lucide React** - Icon library

## 📊 Available Pages

### Authentication
- `/login` - User login
- `/signup` - User registration

### Main Application
- `/dashboard` - Overview with KPIs and recent activities
- `/products` - Product list and management
- `/products/new` - Create new product
- `/products/:id/edit` - Edit existing product
- `/receipts` - Incoming stock receipts
- `/delivery-orders` - Outgoing deliveries
- `/transfers` - Internal warehouse transfers
- `/adjustments` - Stock count adjustments
- `/move-history` - Complete movement log
- `/warehouses` - Warehouse management
- `/profile` - User profile settings

## 🎯 Key Features by Page

### Dashboard
- Total products, stock units, and inventory value
- Low stock alerts with product details
- Pending operations (receipts, deliveries)
- Warehouse capacity utilization
- Recent activity feed

### Products
- Complete product catalog
- Multi-warehouse stock levels
- Low stock warnings
- Category filtering
- Quick search

### Receipts (Incoming Stock)
- Supplier management
- Expected vs received quantity tracking
- Multi-item receipts
- Status workflow
- Total value calculation

### Delivery Orders (Outgoing Stock)
- Customer order management
- Pick, pack, ship workflow
- Tracking number assignment
- Multi-item deliveries
- Status tracking

### Internal Transfers
- Warehouse-to-warehouse transfers
- Multi-product transfers
- Transfer scheduling
- Status monitoring

### Stock Adjustments
- Physical count recording
- System vs actual quantity
- Difference tracking with reasons
- Adjustment validation

### Move History
- Complete audit trail
- Filter by type (Receipt, Delivery, Transfer, Adjustment)
- Search by product or reference
- User tracking

### Warehouses
- Location management
- Capacity tracking
- Utilization visualization
- Stock distribution

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Interface** - Clean, professional appearance
- **Intuitive Navigation** - Sidebar with clear menu structure
- **Search & Filter** - Quick access to data
- **Status Badges** - Visual indicators for workflow states
- **Loading States** - Smooth user experience
- **Error Handling** - Clear validation messages
- **Consistent Styling** - Reusable component library

## 🔄 Status Workflow

Most operations follow this status flow:
1. **Draft** - Initial creation, editable
2. **Waiting** - Pending processing
3. **Ready** - Prepared for action (Deliveries only)
4. **Done** - Completed successfully
5. **Canceled** - Operation canceled

## 📝 Mock Data

The application includes comprehensive mock data:
- 6 Products across multiple categories
- 4 Warehouses in different locations
- 3 Receipts in various states
- 4 Delivery Orders
- 3 Internal Transfers
- 3 Stock Adjustments
- 8+ Movement history records

## 🚀 Future Enhancements

Potential features for production use:
- Backend API integration
- Real-time inventory updates
- Barcode scanning
- Advanced reporting and analytics
- Email notifications
- Multi-user collaboration
- Role-based permissions
- Export to Excel/PDF
- Mobile app
- Inventory forecasting

---

**Built with ❤️ using React + Vite + TailwindCSS**
