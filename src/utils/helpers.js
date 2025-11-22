// Utility functions for StockMaster

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Format date with time
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get status badge color - Updated for schema statuses
export const getStatusColor = (status) => {
  const colors = {
    'Draft': 'bg-gray-100 text-gray-800',
    'Waiting': 'bg-yellow-100 text-yellow-800',
    'Late': 'bg-red-100 text-red-800',
    'Operational': 'bg-blue-100 text-blue-800',
    'Ready': 'bg-blue-100 text-blue-800',
    'Done': 'bg-green-100 text-green-800',
    'Completed': 'bg-green-100 text-green-800',
    'In Transit': 'bg-purple-100 text-purple-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Canceled': 'bg-red-100 text-red-800',
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Calculate total stock for a product - Updated for new schema
export const getTotalStock = (product) => {
  return product.inventoryCount || 0;
};

// Get free to use inventory
export const getFreeToUseInventory = (product) => {
  return product.freeToUseInventory || 0;
};

// Check if product is low on stock - Updated for new schema
export const isLowStock = (product) => {
  // Consider low stock if free inventory is less than 20% of total
  const threshold = product.inventoryCount * 0.2;
  return product.freeToUseInventory < threshold;
};

// Get warehouse name by ID or short code
export const getWarehouseName = (warehouses, identifier) => {
  const warehouse = warehouses.find(w => 
    w.id === identifier || w.warehouseShortCode === identifier
  );
  return warehouse ? warehouse.warehouseName : identifier;
};

// Get warehouse short code by ID
export const getWarehouseCode = (warehouses, id) => {
  const warehouse = warehouses.find(w => w.id === id);
  return warehouse ? warehouse.warehouseShortCode : 'Unknown';
};

// Get product name by ID
export const getProductName = (products, id) => {
  const product = products.find(p => p.id === id);
  return product ? product.productName : 'Unknown';
};

// Filter items by search term
export const filterBySearch = (items, searchTerm, fields) => {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    fields.some(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], item);
      return value?.toString().toLowerCase().includes(term);
    })
  );
};

// Filter items by status
export const filterByStatus = (items, status) => {
  if (!status || status === 'all') return items;
  return items.filter(item => item.status === status);
};

// Generate unique reference number
export const generateReference = (prefix) => {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${year}-${random}`;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Sort array by field
export const sortBy = (items, field, direction = 'asc') => {
  return [...items].sort((a, b) => {
    const aVal = field.split('.').reduce((obj, key) => obj?.[key], a);
    const bVal = field.split('.').reduce((obj, key) => obj?.[key], b);
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Truncate text
export const truncate = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
