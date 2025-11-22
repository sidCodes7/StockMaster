# Backend Integration Guide

## 📋 Overview

This guide explains how to connect the StockMaster frontend to your backend API. The application has been restructured to match your database schema.

---

## 🗂️ Updated Data Schema

### 1. **Users** (Login)
```javascript
{
  id: Number,
  loginId: String,      // Unique login ID
  name: String,
  email: String,
  password: String,     // Hashed in backend
  role: String          // "Inventory Manager" or "Warehouse Staff"
}
```

### 2. **Stock** (Products)
```javascript
{
  id: Number,
  productName: String,
  unitCost: Number,
  inventoryCount: Number,        // Total inventory
  freeToUseInventory: Number,    // Available inventory (not reserved)
  stock: [                       // Stock by warehouse
    {
      warehouseId: Number,
      warehouseShortCode: String,
      quantity: Number,
      reserved: Number
    }
  ]
}
```

### 3. **Receipt**
```javascript
{
  id: Number,
  referenceId: String,      // e.g., "REC-2024-001"
  from: String,             // Supplier/Source
  to: String,               // Warehouse Short Code (e.g., "WH001")
  contactName: String,
  scheduleDate: String,     // ISO date
  status: String,           // "Late", "Waiting", "Operational", "Done"
  productName: String,
  quantity: Number,
  items: [                  // Multiple products
    { productId, productName, quantity }
  ]
}
```

### 4. **Delivery**
```javascript
{
  id: Number,
  referenceId: String,      // e.g., "DO-2024-001"
  from: String,             // Warehouse Short Code
  to: String,               // Customer name
  contact: String,
  scheduleDate: String,
  status: String,           // "Late", "Waiting", "Operational", "Done"
  deliveryAddress: String,
  operationType: String,    // e.g., "Standard Delivery", "Express"
  responsible: String,      // Staff member name
  productName: String,
  quantity: Number,
  items: [
    { productId, productName, quantity }
  ]
}
```

### 5. **Warehouse**
```javascript
{
  id: Number,
  warehouseName: String,
  warehouseShortCode: String,   // e.g., "WH001"
  address: String               // Full address
}
```

### 6. **Location**
```javascript
{
  id: Number,
  locationName: String,
  locationShortCode: String,    // e.g., "SA1", "R1"
  warehouseShortCode: String    // Parent warehouse
}
```

### 7. **MoveHistory**
```javascript
{
  id: Number,
  referenceId: String,      // Links to Receipt/Delivery/Transfer
  date: String,
  contact: String,
  from: String,             // Warehouse code or supplier
  to: String,               // Warehouse code or customer
  quantity: Number,
  status: String,           // "Completed", "Pending", "In Transit"
  productName: String,
  operationType: String     // "Receipt", "Delivery", "Transfer"
}
```

---

## 🔌 API Integration Steps

### Step 1: Set Environment Variable

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
# or your production URL
# VITE_API_BASE_URL=https://api.stockmaster.com
```

### Step 2: Update AuthContext

Replace mock authentication in `src/context/AuthContext.jsx`:

```javascript
import { createContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const getInitialUser = () => {
  const savedUser = localStorage.getItem('stockmaster_user');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.auth.login(email, password);
      
      setUser(response.user);
      localStorage.setItem('stockmaster_user', JSON.stringify(response.user));
      localStorage.setItem('stockmaster_token', response.token);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (loginId, name, email, password, role) => {
    try {
      setLoading(true);
      const response = await api.auth.signup(loginId, name, email, password, role);
      
      setUser(response.user);
      localStorage.setItem('stockmaster_user', JSON.stringify(response.user));
      localStorage.setItem('stockmaster_token', response.token);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stockmaster_user');
    localStorage.removeItem('stockmaster_token');
    api.auth.logout().catch(() => {}); // Fire and forget
  };

  const updateProfile = async (updates) => {
    try {
      const response = await api.user.updateProfile(updates);
      const updatedUser = { ...user, ...response.user };
      setUser(updatedUser);
      localStorage.setItem('stockmaster_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Step 3: Update Pages to Use API

Example for **Products/Stock Page** (`src/pages/Products.jsx`):

```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.stock.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (id, updates) => {
    try {
      await api.stock.update(id, updates);
      fetchProducts(); // Refresh list
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Rest of component...
};
```

Example for **Receipts Page** (`src/pages/Receipts.jsx`):

```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const data = await api.receipts.getAll();
      setReceipts(data);
    } catch (err) {
      console.error('Error fetching receipts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createReceipt = async (receiptData) => {
    try {
      await api.receipts.create(receiptData);
      fetchReceipts(); // Refresh list
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Rest of component...
};
```

---

## 🎯 Required Backend Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get current user
- `PUT /api/users/profile` - Update user profile

### Stock (Products)
- `GET /api/stock` - Get all products
- `GET /api/stock/:id` - Get single product
- `PUT /api/stock/:id` - Update product/stock

### Receipts
- `GET /api/receipts` - Get all receipts
- `GET /api/receipts/:id` - Get single receipt
- `POST /api/receipts` - Create receipt
- `PUT /api/receipts/:id` - Update receipt
- `DELETE /api/receipts/:id` - Delete receipt

### Deliveries
- `GET /api/deliveries` - Get all deliveries
- `GET /api/deliveries/:id` - Get single delivery
- `POST /api/deliveries` - Create delivery
- `PUT /api/deliveries/:id` - Update delivery
- `DELETE /api/deliveries/:id` - Delete delivery

### Warehouses
- `GET /api/warehouses` - Get all warehouses
- `GET /api/warehouses/:id` - Get single warehouse
- `POST /api/warehouses` - Create warehouse
- `PUT /api/warehouses/:id` - Update warehouse
- `DELETE /api/warehouses/:id` - Delete warehouse

### Locations
- `GET /api/locations` - Get all locations
- `GET /api/locations?warehouseShortCode=WH001` - Filter by warehouse
- `POST /api/locations` - Create location
- `PUT /api/locations/:id` - Update location
- `DELETE /api/locations/:id` - Delete location

### Move History
- `GET /api/move-history` - Get all history
- `GET /api/move-history?referenceId=REC-2024-001` - Filter by reference

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

---

## 📝 Expected API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here",
  "errors": { ... }
}
```

### Auth Response
```json
{
  "success": true,
  "user": {
    "id": 1,
    "loginId": "admin001",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Inventory Manager"
  },
  "token": "jwt-token-here"
}
```

---

## 🔐 Authentication Flow

1. User submits login form
2. Frontend calls `api.auth.login(email, password)`
3. Backend validates credentials
4. Backend returns JWT token + user data
5. Frontend stores token in localStorage
6. Token sent in Authorization header for all subsequent requests

---

## 📦 Migration Checklist

- [ ] Set `VITE_API_BASE_URL` in `.env`
- [ ] Update `AuthContext.jsx` to use API calls
- [ ] Update Dashboard to fetch stats from API
- [ ] Update Products page to use `api.stock.*`
- [ ] Update Receipts page to use `api.receipts.*`
- [ ] Update Deliveries page to use `api.deliveries.*`
- [ ] Update Warehouses page to use `api.warehouses.*`
- [ ] Add Locations page using `api.locations.*`
- [ ] Update MoveHistory to use `api.moveHistory.*`
- [ ] Test all CRUD operations
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Add request retry logic (optional)
- [ ] Add offline detection (optional)

---

## 🧪 Testing with Mock Backend

You can test with a mock backend using json-server:

```bash
# Install json-server
npm install -g json-server

# Create db.json with mock data
json-server --watch db.json --port 3000
```

---

## 💡 Tips

1. **Error Handling**: Always wrap API calls in try-catch
2. **Loading States**: Show spinners during API calls
3. **Token Refresh**: Implement token refresh if needed
4. **Retry Logic**: Add retry for failed requests
5. **Optimistic Updates**: Update UI before API responds for better UX
6. **Caching**: Consider caching frequently accessed data

---

## 🚀 Next Steps

1. Set up your backend API with the required endpoints
2. Update `.env` with your API URL
3. Replace mock data imports with API calls page by page
4. Test each feature thoroughly
5. Deploy!

---

For questions or issues, refer to `src/services/api.js` for complete API documentation.
