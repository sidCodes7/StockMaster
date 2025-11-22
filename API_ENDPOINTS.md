# 📡 Backend API Endpoints Reference

## Base URL
```
http://localhost:3000/api
```

---

## 🔐 Authentication Endpoints

### 1. Login
```http
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "admin@stockmaster.com",
  "password": "admin123"
}

Response (200 OK):
{
  "success": true,
  "user": {
    "id": 1,
    "loginId": "admin001",
    "name": "Admin User",
    "email": "admin@stockmaster.com",
    "role": "Inventory Manager"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error Response (401):
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 2. Signup
```http
POST /auth/signup
Content-Type: application/json

Request Body:
{
  "loginId": "staff002",
  "name": "Jane Doe",
  "email": "jane@stockmaster.com",
  "password": "password123",
  "role": "Warehouse Staff"
}

Response (201 Created):
{
  "success": true,
  "user": {
    "id": 3,
    "loginId": "staff002",
    "name": "Jane Doe",
    "email": "jane@stockmaster.com",
    "role": "Warehouse Staff"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Logout
```http
POST /auth/logout
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👤 User Endpoints

### Get Current User Profile
```http
GET /users/profile
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "user": {
    "id": 1,
    "loginId": "admin001",
    "name": "Admin User",
    "email": "admin@stockmaster.com",
    "role": "Inventory Manager"
  }
}
```

### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "Updated Name",
  "email": "newemail@stockmaster.com"
}

Response (200 OK):
{
  "success": true,
  "user": {
    "id": 1,
    "loginId": "admin001",
    "name": "Updated Name",
    "email": "newemail@stockmaster.com",
    "role": "Inventory Manager"
  }
}
```

---

## 📦 Stock/Products Endpoints

### Get All Products
```http
GET /stock
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productName": "Wireless Mouse",
      "unitCost": 29.99,
      "inventoryCount": 250,
      "freeToUseInventory": 240,
      "category": "Electronics",
      "description": "Ergonomic wireless mouse",
      "status": "Active",
      "stock": [
        {
          "warehouseId": 1,
          "warehouseShortCode": "WH001",
          "quantity": 150,
          "reserved": 5
        }
      ]
    }
  ]
}
```

### Get Single Product
```http
GET /stock/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "productName": "Wireless Mouse",
    "unitCost": 29.99,
    "inventoryCount": 250,
    "freeToUseInventory": 240,
    ...
  }
}
```

### Update Stock
```http
PUT /stock/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "productName": "Wireless Mouse Pro",
  "unitCost": 34.99,
  "inventoryCount": 300,
  "freeToUseInventory": 290
}

Response (200 OK):
{
  "success": true,
  "data": { ... }
}
```

---

## 📥 Receipt Endpoints

### Get All Receipts
```http
GET /receipts
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "referenceId": "REC-2024-001",
      "from": "Tech Supplies Inc",
      "to": "WH001",
      "contactName": "John Smith",
      "scheduleDate": "2024-11-20",
      "status": "Done",
      "productName": "Wireless Mouse",
      "quantity": 200,
      "items": [
        {
          "productId": 1,
          "productName": "Wireless Mouse",
          "quantity": 200
        }
      ],
      "createdDate": "2024-11-15",
      "completedDate": "2024-11-20",
      "notes": "Shipment received in good condition"
    }
  ]
}
```

### Get Single Receipt
```http
GET /receipts/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": { ... }
}
```

### Create Receipt
```http
POST /receipts
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "referenceId": "REC-2024-005",
  "from": "Tech Supplies Inc",
  "to": "WH001",
  "contactName": "John Smith",
  "scheduleDate": "2024-11-25",
  "status": "Waiting",
  "productName": "Keyboard",
  "quantity": 100,
  "items": [
    {
      "productId": 3,
      "productName": "Keyboard",
      "quantity": 100
    }
  ],
  "notes": "Standard delivery"
}

Response (201 Created):
{
  "success": true,
  "data": { ... }
}
```

### Update Receipt
```http
PUT /receipts/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "status": "Done",
  "completedDate": "2024-11-25"
}

Response (200 OK):
{
  "success": true,
  "data": { ... }
}
```

### Delete Receipt
```http
DELETE /receipts/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "message": "Receipt deleted successfully"
}
```

---

## 📤 Delivery Endpoints

### Get All Deliveries
```http
GET /deliveries
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "referenceId": "DO-2024-001",
      "from": "WH001",
      "to": "ABC Corporation",
      "contact": "Jane Doe",
      "scheduleDate": "2024-11-21",
      "status": "Done",
      "deliveryAddress": "456 Business Park, NY",
      "operationType": "Standard Delivery",
      "responsible": "John Warehouse",
      "productName": "Wireless Mouse",
      "quantity": 50,
      "items": [
        {
          "productId": 1,
          "productName": "Wireless Mouse",
          "quantity": 50
        }
      ],
      "createdDate": "2024-11-18",
      "completedDate": "2024-11-21",
      "trackingNumber": "TRK123456789",
      "notes": "Priority shipment"
    }
  ]
}
```

### Create Delivery
```http
POST /deliveries
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "referenceId": "DO-2024-005",
  "from": "WH001",
  "to": "XYZ Company",
  "contact": "Bob Smith",
  "scheduleDate": "2024-11-26",
  "status": "Waiting",
  "deliveryAddress": "789 Corporate Ave, NY",
  "operationType": "Express Delivery",
  "responsible": "Admin User",
  "productName": "Monitor",
  "quantity": 5,
  "items": [
    {
      "productId": 5,
      "productName": "Monitor",
      "quantity": 5
    }
  ],
  "notes": "Urgent delivery"
}

Response (201 Created):
{
  "success": true,
  "data": { ... }
}
```

### Update Delivery
```http
PUT /deliveries/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "status": "Operational",
  "trackingNumber": "TRK987654321"
}

Response (200 OK):
{
  "success": true,
  "data": { ... }
}
```

---

## 🏢 Warehouse Endpoints

### Get All Warehouses
```http
GET /warehouses
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "warehouseName": "Main Warehouse",
      "warehouseShortCode": "WH001",
      "address": "123 Industrial Blvd, New York, NY 10001",
      "capacity": 50000,
      "currentStock": 35000
    }
  ]
}
```

### Create Warehouse
```http
POST /warehouses
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "warehouseName": "East Coast Hub",
  "warehouseShortCode": "WH005",
  "address": "555 Logistics Pkwy, Boston, MA 02101"
}

Response (201 Created):
{
  "success": true,
  "data": { ... }
}
```

---

## 📍 Location Endpoints

### Get All Locations
```http
GET /locations
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "locationName": "Shelf A1",
      "locationShortCode": "SA1",
      "warehouseShortCode": "WH001"
    }
  ]
}
```

### Get Locations by Warehouse
```http
GET /locations?warehouseShortCode=WH001
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "locationName": "Shelf A1",
      "locationShortCode": "SA1",
      "warehouseShortCode": "WH001"
    },
    {
      "id": 2,
      "locationName": "Shelf A2",
      "locationShortCode": "SA2",
      "warehouseShortCode": "WH001"
    }
  ]
}
```

### Create Location
```http
POST /locations
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "locationName": "Shelf B3",
  "locationShortCode": "SB3",
  "warehouseShortCode": "WH001"
}

Response (201 Created):
{
  "success": true,
  "data": { ... }
}
```

---

## 📜 Move History Endpoints

### Get All Move History
```http
GET /move-history
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "referenceId": "DO-2024-001",
      "date": "2024-11-21",
      "contact": "Jane Doe",
      "from": "WH001",
      "to": "ABC Corporation",
      "quantity": 50,
      "status": "Completed",
      "productName": "Wireless Mouse",
      "operationType": "Delivery"
    }
  ]
}
```

### Get by Reference ID
```http
GET /move-history?referenceId=REC-2024-001
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 3,
      "referenceId": "REC-2024-001",
      "date": "2024-11-20",
      "contact": "John Smith",
      "from": "Tech Supplies Inc",
      "to": "WH001",
      "quantity": 200,
      "status": "Completed",
      "productName": "Wireless Mouse",
      "operationType": "Receipt"
    }
  ]
}
```

---

## 📊 Dashboard Endpoints

### Get Dashboard Stats
```http
GET /dashboard/stats
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": {
    "receipts": {
      "late": 1,
      "waiting": 1,
      "operational": 1,
      "total": 4
    },
    "deliveries": {
      "late": 1,
      "waiting": 1,
      "operational": 1,
      "total": 4
    },
    "stock": {
      "totalProducts": 6,
      "totalInventory": 826,
      "lowStockItems": 2
    },
    "warehouses": {
      "total": 4,
      "utilizationPercentage": 68.6
    }
  }
}
```

---

## 🔒 Authentication Header

All protected endpoints require JWT token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format",
    "password": "Password too short"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📝 Notes

1. **All dates** should be in ISO 8601 format: `YYYY-MM-DD`
2. **Status values** are case-sensitive: "Late", "Waiting", "Operational", "Done"
3. **Warehouse codes** should be uppercase: "WH001", "WH002", etc.
4. **JWT tokens** should be stored securely on the client
5. **Role-based access**: Implement permission checks on backend
   - Inventory Managers: Full access
   - Warehouse Staff: Limited to operational tasks

---

This completes your backend API specification! 🚀
