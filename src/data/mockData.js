// Mock data for StockMaster application - Aligned with Backend Schema

// Users: Login ID, Email, Password, Role
export const users = [
  {
    id: 1,
    loginId: 'admin001',
    name: 'Admin User',
    email: 'admin@stockmaster.com',
    password: 'admin123',
    role: 'Inventory Manager', // Inventory Manager or Warehouse Staff
    avatar: null
  },
  {
    id: 2,
    loginId: 'staff001',
    name: 'John Warehouse',
    email: 'john@stockmaster.com',
    password: 'staff123',
    role: 'Warehouse Staff',
    avatar: null
  }
];

// Warehouses: WarehouseName, WarehouseShortCode, Address
export const warehouses = [
  { 
    id: 1, 
    warehouseName: 'Main Warehouse', 
    warehouseShortCode: 'WH001', 
    address: '123 Industrial Blvd, New York, NY 10001',
    capacity: 50000, 
    currentStock: 35000 
  },
  { 
    id: 2, 
    warehouseName: 'West Coast Hub', 
    warehouseShortCode: 'WH002', 
    address: '456 Logistics Ave, Los Angeles, CA 90001',
    capacity: 40000, 
    currentStock: 28000 
  },
  { 
    id: 3, 
    warehouseName: 'Distribution Center', 
    warehouseShortCode: 'WH003', 
    address: '789 Storage St, Chicago, IL 60601',
    capacity: 30000, 
    currentStock: 15000 
  },
  { 
    id: 4, 
    warehouseName: 'Regional Storage', 
    warehouseShortCode: 'WH004', 
    address: '321 Depot Dr, Houston, TX 77001',
    capacity: 25000, 
    currentStock: 18000 
  }
];

// Locations: LocationName, LocationShortCode, WarehouseShortCode
export const locations = [
  { id: 1, locationName: 'Shelf A1', locationShortCode: 'SA1', warehouseShortCode: 'WH001' },
  { id: 2, locationName: 'Shelf A2', locationShortCode: 'SA2', warehouseShortCode: 'WH001' },
  { id: 3, locationName: 'Shelf B1', locationShortCode: 'SB1', warehouseShortCode: 'WH001' },
  { id: 4, locationName: 'Rack R1', locationShortCode: 'R1', warehouseShortCode: 'WH002' },
  { id: 5, locationName: 'Rack R2', locationShortCode: 'R2', warehouseShortCode: 'WH002' },
  { id: 6, locationName: 'Zone Z1', locationShortCode: 'Z1', warehouseShortCode: 'WH003' },
  { id: 7, locationName: 'Zone Z2', locationShortCode: 'Z2', warehouseShortCode: 'WH003' },
  { id: 8, locationName: 'Area A1', locationShortCode: 'A1', warehouseShortCode: 'WH004' }
];

// Stock: ProductName, UnitCost, InventoryCount, FreetoUseInventory
export const products = [
  {
    id: 1,
    productName: 'Wireless Mouse',
    unitCost: 29.99,
    inventoryCount: 250, // Total across all warehouses
    freeToUseInventory: 240, // Available inventory (not reserved)
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with USB receiver',
    stock: [
      { warehouseId: 1, warehouseShortCode: 'WH001', quantity: 150, reserved: 5 },
      { warehouseId: 2, warehouseShortCode: 'WH002', quantity: 100, reserved: 5 }
    ],
    status: 'Active',
    supplier: 'Tech Supplies Inc',
    sku: 'PROD-001'
  },
  {
    id: 2,
    productName: 'USB-C Cable',
    unitCost: 12.99,
    inventoryCount: 125,
    freeToUseInventory: 115,
    category: 'Electronics',
    description: '6ft USB-C to USB-A cable',
    stock: [
      { warehouseId: 1, warehouseShortCode: 'WH001', quantity: 45, reserved: 5 },
      { warehouseId: 3, warehouseShortCode: 'WH003', quantity: 80, reserved: 5 }
    ],
    status: 'Active',
    supplier: 'Cable Co',
    sku: 'PROD-002'
  },
  {
    id: 3,
    productName: 'Mechanical Keyboard',
    unitCost: 89.99,
    inventoryCount: 135,
    freeToUseInventory: 130,
    category: 'Electronics',
    description: 'RGB mechanical gaming keyboard',
    stock: [
      { warehouseId: 1, warehouseShortCode: 'WH001', quantity: 75, reserved: 3 },
      { warehouseId: 2, warehouseShortCode: 'WH002', quantity: 60, reserved: 2 }
    ],
    status: 'Active',
    supplier: 'Tech Supplies Inc',
    sku: 'PROD-003'
  },
  {
    id: 4,
    productName: 'Laptop Stand',
    unitCost: 45.99,
    inventoryCount: 210,
    freeToUseInventory: 205,
    category: 'Accessories',
    description: 'Adjustable aluminum laptop stand',
    stock: [
      { warehouseId: 2, warehouseShortCode: 'WH002', quantity: 120, reserved: 3 },
      { warehouseId: 4, warehouseShortCode: 'WH004', quantity: 90, reserved: 2 }
    ],
    status: 'Active',
    supplier: 'Office Goods Ltd',
    sku: 'PROD-004'
  },
  {
    id: 5,
    productName: 'Monitor 27"',
    unitCost: 299.99,
    inventoryCount: 63,
    freeToUseInventory: 58,
    category: 'Electronics',
    description: '27-inch 4K LED monitor',
    stock: [
      { warehouseId: 1, warehouseShortCode: 'WH001', quantity: 35, reserved: 3 },
      { warehouseId: 3, warehouseShortCode: 'WH003', quantity: 28, reserved: 2 }
    ],
    status: 'Active',
    supplier: 'Display Tech',
    sku: 'PROD-005'
  },
  {
    id: 6,
    productName: 'Webcam HD',
    unitCost: 59.99,
    inventoryCount: 43,
    freeToUseInventory: 38,
    category: 'Electronics',
    description: '1080p HD webcam with microphone',
    stock: [
      { warehouseId: 1, warehouseShortCode: 'WH001', quantity: 18, reserved: 3 },
      { warehouseId: 2, warehouseShortCode: 'WH002', quantity: 25, reserved: 2 }
    ],
    status: 'Active',
    supplier: 'Tech Supplies Inc',
    sku: 'PROD-006'
  }
];

// Receipt: ReferenceID, From, To, ContactName, ScheduleDate, Status, ProductName, Quantity
export const receipts = [
  {
    id: 1,
    referenceId: 'REC-2024-001',
    from: 'Tech Supplies Inc', // Supplier/Source
    to: 'WH001', // Warehouse Short Code
    contactName: 'John Smith',
    scheduleDate: '2024-11-20',
    status: 'Done', // Late, Waiting, Operational
    productName: 'Wireless Mouse',
    quantity: 200,
    items: [
      { productId: 1, productName: 'Wireless Mouse', quantity: 200 }
    ],
    createdDate: '2024-11-15',
    completedDate: '2024-11-20',
    notes: 'Shipment received in good condition'
  },
  {
    id: 2,
    referenceId: 'REC-2024-002',
    from: 'Cable Co',
    to: 'WH001',
    contactName: 'Sarah Johnson',
    scheduleDate: '2024-11-22',
    status: 'Waiting',
    productName: 'USB-C Cable',
    quantity: 500,
    items: [
      { productId: 2, productName: 'USB-C Cable', quantity: 500 }
    ],
    createdDate: '2024-11-18',
    completedDate: null,
    notes: 'Expected delivery today'
  },
  {
    id: 3,
    referenceId: 'REC-2024-003',
    from: 'Display Tech',
    to: 'WH003',
    contactName: 'Mike Wilson',
    scheduleDate: '2024-11-15',
    status: 'Late', // Past scheduled date
    productName: 'Monitor 27"',
    quantity: 50,
    items: [
      { productId: 5, productName: 'Monitor 27"', quantity: 50 }
    ],
    createdDate: '2024-11-10',
    completedDate: null,
    notes: 'Delayed shipment'
  },
  {
    id: 4,
    referenceId: 'REC-2024-004',
    from: 'Tech Supplies Inc',
    to: 'WH002',
    contactName: 'Emily Davis',
    scheduleDate: '2024-11-23',
    status: 'Operational',
    productName: 'Mechanical Keyboard',
    quantity: 100,
    items: [
      { productId: 3, productName: 'Mechanical Keyboard', quantity: 100 }
    ],
    createdDate: '2024-11-20',
    completedDate: null,
    notes: 'In transit'
  }
];

// Delivery: ReferenceID, From, To, Contact, ScheduleDate, Status, DeliveryAddress, OperationType, Responsible, ProductName, Quantity
export const deliveryOrders = [
  {
    id: 1,
    referenceId: 'DO-2024-001',
    from: 'WH001', // Warehouse Short Code
    to: 'ABC Corporation', // Customer
    contact: 'Jane Doe',
    scheduleDate: '2024-11-21',
    status: 'Done', // Late, Waiting, Operational
    deliveryAddress: '456 Business Park, New York, NY 10002',
    operationType: 'Standard Delivery',
    responsible: 'John Warehouse', // Staff member
    productName: 'Wireless Mouse',
    quantity: 50,
    items: [
      { productId: 1, productName: 'Wireless Mouse', quantity: 50 },
      { productId: 2, productName: 'USB-C Cable', quantity: 100 }
    ],
    createdDate: '2024-11-18',
    completedDate: '2024-11-21',
    trackingNumber: 'TRK123456789',
    notes: 'Priority shipment'
  },
  {
    id: 2,
    referenceId: 'DO-2024-002',
    from: 'WH002',
    to: 'XYZ Retail',
    contact: 'Robert Brown',
    scheduleDate: '2024-11-23',
    status: 'Operational',
    deliveryAddress: '789 Retail Plaza, Los Angeles, CA 90002',
    operationType: 'Express Delivery',
    responsible: 'Admin User',
    productName: 'Mechanical Keyboard',
    quantity: 30,
    items: [
      { productId: 3, productName: 'Mechanical Keyboard', quantity: 30 },
      { productId: 4, productName: 'Laptop Stand', quantity: 20 }
    ],
    createdDate: '2024-11-20',
    completedDate: null,
    trackingNumber: null,
    notes: 'Ready for pickup'
  },
  {
    id: 3,
    referenceId: 'DO-2024-003',
    from: 'WH001',
    to: 'Tech Store Plus',
    contact: 'Lisa Martinez',
    scheduleDate: '2024-11-24',
    status: 'Waiting',
    deliveryAddress: '321 Tech Ave, Chicago, IL 60602',
    operationType: 'Standard Delivery',
    responsible: 'John Warehouse',
    productName: 'Monitor 27"',
    quantity: 10,
    items: [
      { productId: 5, productName: 'Monitor 27"', quantity: 10 }
    ],
    createdDate: '2024-11-22',
    completedDate: null,
    trackingNumber: null,
    notes: 'Waiting for packing'
  },
  {
    id: 4,
    referenceId: 'DO-2024-004',
    from: 'WH001',
    to: 'Online Buyers',
    contact: 'David Lee',
    scheduleDate: '2024-11-18',
    status: 'Late', // Past scheduled date
    deliveryAddress: '654 Customer St, Houston, TX 77002',
    operationType: 'Standard Delivery',
    responsible: 'Admin User',
    productName: 'Webcam HD',
    quantity: 15,
    items: [
      { productId: 6, productName: 'Webcam HD', quantity: 15 }
    ],
    createdDate: '2024-11-15',
    completedDate: null,
    trackingNumber: null,
    notes: 'Delayed processing'
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

// MoveHistory: ReferenceID, Date, Contact, From, To, Quantity, Status
export const moveHistory = [
  {
    id: 1,
    referenceId: 'DO-2024-001',
    date: '2024-11-21',
    contact: 'Jane Doe',
    from: 'WH001',
    to: 'ABC Corporation',
    quantity: 50,
    status: 'Completed',
    productName: 'Wireless Mouse',
    operationType: 'Delivery'
  },
  {
    id: 2,
    referenceId: 'DO-2024-001',
    date: '2024-11-21',
    contact: 'Jane Doe',
    from: 'WH001',
    to: 'ABC Corporation',
    quantity: 100,
    status: 'Completed',
    productName: 'USB-C Cable',
    operationType: 'Delivery'
  },
  {
    id: 3,
    referenceId: 'REC-2024-001',
    date: '2024-11-20',
    contact: 'John Smith',
    from: 'Tech Supplies Inc',
    to: 'WH001',
    quantity: 200,
    status: 'Completed',
    productName: 'Wireless Mouse',
    operationType: 'Receipt'
  },
  {
    id: 4,
    referenceId: 'REC-2024-004',
    date: '2024-11-23',
    contact: 'Emily Davis',
    from: 'Tech Supplies Inc',
    to: 'WH002',
    quantity: 100,
    status: 'In Transit',
    productName: 'Mechanical Keyboard',
    operationType: 'Receipt'
  },
  {
    id: 5,
    referenceId: 'TR-2024-001',
    date: '2024-11-19',
    contact: 'Internal Transfer',
    from: 'WH001',
    to: 'WH002',
    quantity: 50,
    status: 'Completed',
    productName: 'Wireless Mouse',
    operationType: 'Transfer'
  },
  {
    id: 6,
    referenceId: 'TR-2024-001',
    date: '2024-11-19',
    contact: 'Internal Transfer',
    from: 'WH001',
    to: 'WH002',
    quantity: 100,
    status: 'Completed',
    productName: 'USB-C Cable',
    operationType: 'Transfer'
  },
  {
    id: 7,
    referenceId: 'DO-2024-003',
    date: '2024-11-24',
    contact: 'Lisa Martinez',
    from: 'WH001',
    to: 'Tech Store Plus',
    quantity: 10,
    status: 'Pending',
    productName: 'Monitor 27"',
    operationType: 'Delivery'
  },
  {
    id: 8,
    referenceId: 'REC-2024-002',
    date: '2024-11-22',
    contact: 'Sarah Johnson',
    from: 'Cable Co',
    to: 'WH001',
    quantity: 500,
    status: 'Pending',
    productName: 'USB-C Cable',
    operationType: 'Receipt'
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
