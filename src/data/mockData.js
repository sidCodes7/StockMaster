// Mock data for StockMaster application

export const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@stockmaster.com',
    password: 'admin123',
    role: 'Admin',
    avatar: null
  }
];

export const warehouses = [
  { id: 1, name: 'Main Warehouse', location: 'New York, NY', code: 'WH001', capacity: 50000, currentStock: 35000 },
  { id: 2, name: 'West Coast Hub', location: 'Los Angeles, CA', code: 'WH002', capacity: 40000, currentStock: 28000 },
  { id: 3, name: 'Distribution Center', location: 'Chicago, IL', code: 'WH003', capacity: 30000, currentStock: 15000 },
  { id: 4, name: 'Regional Storage', location: 'Houston, TX', code: 'WH004', capacity: 25000, currentStock: 18000 }
];

export const products = [
  {
    id: 1,
    sku: 'PROD-001',
    name: 'Wireless Mouse',
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with USB receiver',
    unitPrice: 29.99,
    stock: [
      { warehouseId: 1, quantity: 150, minStock: 50 },
      { warehouseId: 2, quantity: 100, minStock: 30 }
    ],
    status: 'Active',
    supplier: 'Tech Supplies Inc',
    image: null
  },
  {
    id: 2,
    sku: 'PROD-002',
    name: 'USB-C Cable',
    category: 'Electronics',
    description: '6ft USB-C to USB-A cable',
    unitPrice: 12.99,
    stock: [
      { warehouseId: 1, quantity: 45, minStock: 100 },
      { warehouseId: 3, quantity: 80, minStock: 50 }
    ],
    status: 'Active',
    supplier: 'Cable Co',
    image: null
  },
  {
    id: 3,
    sku: 'PROD-003',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    description: 'RGB mechanical gaming keyboard',
    unitPrice: 89.99,
    stock: [
      { warehouseId: 1, quantity: 75, minStock: 20 },
      { warehouseId: 2, quantity: 60, minStock: 20 }
    ],
    status: 'Active',
    supplier: 'Tech Supplies Inc',
    image: null
  },
  {
    id: 4,
    sku: 'PROD-004',
    name: 'Laptop Stand',
    category: 'Accessories',
    description: 'Adjustable aluminum laptop stand',
    unitPrice: 45.99,
    stock: [
      { warehouseId: 2, quantity: 120, minStock: 30 },
      { warehouseId: 4, quantity: 90, minStock: 25 }
    ],
    status: 'Active',
    supplier: 'Office Goods Ltd',
    image: null
  },
  {
    id: 5,
    sku: 'PROD-005',
    name: 'Monitor 27"',
    category: 'Electronics',
    description: '27-inch 4K LED monitor',
    unitPrice: 299.99,
    stock: [
      { warehouseId: 1, quantity: 35, minStock: 15 },
      { warehouseId: 3, quantity: 28, minStock: 10 }
    ],
    status: 'Active',
    supplier: 'Display Tech',
    image: null
  },
  {
    id: 6,
    sku: 'PROD-006',
    name: 'Webcam HD',
    category: 'Electronics',
    description: '1080p HD webcam with microphone',
    unitPrice: 59.99,
    stock: [
      { warehouseId: 1, quantity: 18, minStock: 40 },
      { warehouseId: 2, quantity: 25, minStock: 30 }
    ],
    status: 'Active',
    supplier: 'Tech Supplies Inc',
    image: null
  }
];

export const receipts = [
  {
    id: 1,
    reference: 'REC-2024-001',
    supplier: 'Tech Supplies Inc',
    warehouseId: 1,
    scheduledDate: '2024-11-20',
    status: 'Done',
    items: [
      { productId: 1, productName: 'Wireless Mouse', expectedQty: 200, receivedQty: 200, unitPrice: 25.00 },
      { productId: 3, productName: 'Mechanical Keyboard', expectedQty: 100, receivedQty: 98, unitPrice: 75.00 }
    ],
    totalValue: 12350.00,
    createdDate: '2024-11-15',
    validatedDate: '2024-11-20',
    notes: 'Shipment received in good condition'
  },
  {
    id: 2,
    reference: 'REC-2024-002',
    supplier: 'Cable Co',
    warehouseId: 1,
    scheduledDate: '2024-11-22',
    status: 'Waiting',
    items: [
      { productId: 2, productName: 'USB-C Cable', expectedQty: 500, receivedQty: 0, unitPrice: 8.00 }
    ],
    totalValue: 4000.00,
    createdDate: '2024-11-18',
    validatedDate: null,
    notes: 'Expected delivery today'
  },
  {
    id: 3,
    reference: 'REC-2024-003',
    supplier: 'Display Tech',
    warehouseId: 3,
    scheduledDate: '2024-11-25',
    status: 'Draft',
    items: [
      { productId: 5, productName: 'Monitor 27"', expectedQty: 50, receivedQty: 0, unitPrice: 250.00 }
    ],
    totalValue: 12500.00,
    createdDate: '2024-11-21',
    validatedDate: null,
    notes: ''
  }
];

export const deliveryOrders = [
  {
    id: 1,
    reference: 'DO-2024-001',
    customer: 'ABC Corporation',
    warehouseId: 1,
    scheduledDate: '2024-11-21',
    status: 'Done',
    items: [
      { productId: 1, productName: 'Wireless Mouse', orderedQty: 50, pickedQty: 50, packedQty: 50 },
      { productId: 2, productName: 'USB-C Cable', orderedQty: 100, pickedQty: 100, packedQty: 100 }
    ],
    totalValue: 2799.00,
    createdDate: '2024-11-18',
    shippedDate: '2024-11-21',
    trackingNumber: 'TRK123456789',
    notes: 'Priority shipment'
  },
  {
    id: 2,
    reference: 'DO-2024-002',
    customer: 'XYZ Retail',
    warehouseId: 2,
    scheduledDate: '2024-11-23',
    status: 'Ready',
    items: [
      { productId: 3, productName: 'Mechanical Keyboard', orderedQty: 30, pickedQty: 30, packedQty: 30 },
      { productId: 4, productName: 'Laptop Stand', orderedQty: 20, pickedQty: 20, packedQty: 20 }
    ],
    totalValue: 3619.70,
    createdDate: '2024-11-20',
    shippedDate: null,
    trackingNumber: null,
    notes: ''
  },
  {
    id: 3,
    reference: 'DO-2024-003',
    customer: 'Tech Store Plus',
    warehouseId: 1,
    scheduledDate: '2024-11-24',
    status: 'Waiting',
    items: [
      { productId: 5, productName: 'Monitor 27"', orderedQty: 10, pickedQty: 10, packedQty: 0 }
    ],
    totalValue: 2999.90,
    createdDate: '2024-11-22',
    shippedDate: null,
    trackingNumber: null,
    notes: 'Waiting for packing'
  },
  {
    id: 4,
    reference: 'DO-2024-004',
    customer: 'Online Buyers',
    warehouseId: 1,
    scheduledDate: '2024-11-26',
    status: 'Draft',
    items: [
      { productId: 6, productName: 'Webcam HD', orderedQty: 15, pickedQty: 0, packedQty: 0 }
    ],
    totalValue: 899.85,
    createdDate: '2024-11-22',
    shippedDate: null,
    trackingNumber: null,
    notes: ''
  }
];

export const internalTransfers = [
  {
    id: 1,
    reference: 'TR-2024-001',
    fromWarehouseId: 1,
    toWarehouseId: 2,
    scheduledDate: '2024-11-19',
    status: 'Done',
    items: [
      { productId: 1, productName: 'Wireless Mouse', quantity: 50 },
      { productId: 2, productName: 'USB-C Cable', quantity: 100 }
    ],
    createdDate: '2024-11-15',
    completedDate: '2024-11-19',
    notes: 'Stock rebalancing'
  },
  {
    id: 2,
    reference: 'TR-2024-002',
    fromWarehouseId: 2,
    toWarehouseId: 4,
    scheduledDate: '2024-11-23',
    status: 'Waiting',
    items: [
      { productId: 4, productName: 'Laptop Stand', quantity: 30 }
    ],
    createdDate: '2024-11-20',
    completedDate: null,
    notes: 'Fulfilling regional demand'
  },
  {
    id: 3,
    reference: 'TR-2024-003',
    fromWarehouseId: 1,
    toWarehouseId: 3,
    scheduledDate: '2024-11-25',
    status: 'Draft',
    items: [
      { productId: 3, productName: 'Mechanical Keyboard', quantity: 25 }
    ],
    createdDate: '2024-11-22',
    completedDate: null,
    notes: ''
  }
];

export const stockAdjustments = [
  {
    id: 1,
    reference: 'ADJ-2024-001',
    warehouseId: 1,
    date: '2024-11-18',
    status: 'Done',
    items: [
      { productId: 1, productName: 'Wireless Mouse', systemQty: 200, countedQty: 198, difference: -2, reason: 'Damaged units' }
    ],
    createdDate: '2024-11-18',
    validatedDate: '2024-11-18',
    notes: 'Physical inventory count - found 2 damaged units'
  },
  {
    id: 2,
    reference: 'ADJ-2024-002',
    warehouseId: 1,
    date: '2024-11-20',
    status: 'Done',
    items: [
      { productId: 2, productName: 'USB-C Cable', systemQty: 250, countedQty: 245, difference: -5, reason: 'Missing items' }
    ],
    createdDate: '2024-11-20',
    validatedDate: '2024-11-20',
    notes: 'Monthly reconciliation'
  },
  {
    id: 3,
    reference: 'ADJ-2024-003',
    warehouseId: 2,
    date: '2024-11-22',
    status: 'Draft',
    items: [
      { productId: 4, productName: 'Laptop Stand', systemQty: 120, countedQty: 125, difference: 5, reason: 'Found items' }
    ],
    createdDate: '2024-11-22',
    validatedDate: null,
    notes: 'Pending verification'
  }
];

export const moveHistory = [
  {
    id: 1,
    date: '2024-11-21',
    reference: 'DO-2024-001',
    type: 'Delivery',
    productId: 1,
    productName: 'Wireless Mouse',
    fromWarehouse: 'Main Warehouse',
    toLocation: 'ABC Corporation',
    quantity: 50,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 2,
    date: '2024-11-21',
    reference: 'DO-2024-001',
    type: 'Delivery',
    productId: 2,
    productName: 'USB-C Cable',
    fromWarehouse: 'Main Warehouse',
    toLocation: 'ABC Corporation',
    quantity: 100,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 3,
    date: '2024-11-20',
    reference: 'REC-2024-001',
    type: 'Receipt',
    productId: 1,
    productName: 'Wireless Mouse',
    fromLocation: 'Tech Supplies Inc',
    toWarehouse: 'Main Warehouse',
    quantity: 200,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 4,
    date: '2024-11-20',
    reference: 'REC-2024-001',
    type: 'Receipt',
    productId: 3,
    productName: 'Mechanical Keyboard',
    fromLocation: 'Tech Supplies Inc',
    toWarehouse: 'Main Warehouse',
    quantity: 98,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 5,
    date: '2024-11-19',
    reference: 'TR-2024-001',
    type: 'Transfer',
    productId: 1,
    productName: 'Wireless Mouse',
    fromWarehouse: 'Main Warehouse',
    toWarehouse: 'West Coast Hub',
    quantity: 50,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 6,
    date: '2024-11-19',
    reference: 'TR-2024-001',
    type: 'Transfer',
    productId: 2,
    productName: 'USB-C Cable',
    fromWarehouse: 'Main Warehouse',
    toWarehouse: 'West Coast Hub',
    quantity: 100,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 7,
    date: '2024-11-18',
    reference: 'ADJ-2024-001',
    type: 'Adjustment',
    productId: 1,
    productName: 'Wireless Mouse',
    warehouse: 'Main Warehouse',
    quantity: -2,
    status: 'Completed',
    user: 'Admin User'
  },
  {
    id: 8,
    date: '2024-11-20',
    reference: 'ADJ-2024-002',
    type: 'Adjustment',
    productId: 2,
    productName: 'USB-C Cable',
    warehouse: 'Main Warehouse',
    quantity: -5,
    status: 'Completed',
    user: 'Admin User'
  }
];

export const categories = [
  'Electronics',
  'Accessories',
  'Office Supplies',
  'Hardware',
  'Cables & Adapters',
  'Audio & Video'
];

export const suppliers = [
  'Tech Supplies Inc',
  'Cable Co',
  'Display Tech',
  'Office Goods Ltd',
  'Hardware Direct',
  'Global Electronics'
];

export const customers = [
  'ABC Corporation',
  'XYZ Retail',
  'Tech Store Plus',
  'Online Buyers',
  'Enterprise Solutions',
  'Retail Chain Co'
];
