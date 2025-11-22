# StockMaster - Setup Instructions

## Installation

1. Install dependencies:
```bash
npm install react-router-dom lucide-react
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Default Login Credentials

- Email: admin@stockmaster.com
- Password: admin123

## Project Structure

```
src/
├── components/          # Reusable UI components
├── layouts/            # Layout components (Sidebar, Navbar)
├── pages/              # All page components
├── data/               # Mock JSON data
├── utils/              # Helper functions
├── context/            # React context for state management
└── App.jsx             # Main app with routing
```

## Features Implemented

- ✅ Authentication (Login/Signup)
- ✅ Dashboard with KPIs
- ✅ Product Management (List, Create, Edit)
- ✅ Receipts (Incoming Stock)
- ✅ Delivery Orders (Outgoing Stock)
- ✅ Internal Transfers
- ✅ Stock Adjustments
- ✅ Move History
- ✅ Warehouse Management
- ✅ User Profile
- ✅ Status Management (Draft, Waiting, Ready, Done, Canceled)
- ✅ Search & Filter functionality
- ✅ Low stock alerts
