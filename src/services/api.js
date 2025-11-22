// API Service for Backend Integration
// Replace mock data imports with these API calls when connecting to backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('stockmaster_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== Authentication ====================

export const authAPI = {
  // Login: POST /auth/login
  // Body: { email, password }
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  // Signup: POST /auth/signup
  // Body: { loginId, name, email, password, role }
  signup: async (loginId, name, email, password, role = 'Warehouse Staff') => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ loginId, name, email, password, role })
    });
  },

  // Logout: POST /auth/logout
  logout: async () => {
    return apiCall('/auth/logout', { method: 'POST' });
  }
};

// ==================== Users ====================

export const userAPI = {
  // Get current user profile: GET /users/profile
  getProfile: async () => {
    return apiCall('/users/profile');
  },

  // Update profile: PUT /users/profile
  updateProfile: async (data) => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};

// ==================== Stock/Products ====================

export const stockAPI = {
  // Get all products: GET /stock
  getAll: async () => {
    return apiCall('/stock');
  },

  // Get single product: GET /stock/:id
  getById: async (id) => {
    return apiCall(`/stock/${id}`);
  },

  // Update stock: PUT /stock/:id
  // Body: { productName, unitCost, inventoryCount, freeToUseInventory }
  update: async (id, data) => {
    return apiCall(`/stock/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};

// ==================== Receipts ====================

export const receiptAPI = {
  // Get all receipts: GET /receipts
  getAll: async () => {
    return apiCall('/receipts');
  },

  // Get single receipt: GET /receipts/:id
  getById: async (id) => {
    return apiCall(`/receipts/${id}`);
  },

  // Create receipt: POST /receipts
  // Body: { referenceId, from, to, contactName, scheduleDate, status, productName, quantity, items }
  create: async (data) => {
    return apiCall('/receipts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Update receipt: PUT /receipts/:id
  update: async (id, data) => {
    return apiCall(`/receipts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Delete receipt: DELETE /receipts/:id
  delete: async (id) => {
    return apiCall(`/receipts/${id}`, { method: 'DELETE' });
  }
};

// ==================== Deliveries ====================

export const deliveryAPI = {
  // Get all deliveries: GET /deliveries
  getAll: async () => {
    return apiCall('/deliveries');
  },

  // Get single delivery: GET /deliveries/:id
  getById: async (id) => {
    return apiCall(`/deliveries/${id}`);
  },

  // Create delivery: POST /deliveries
  // Body: { referenceId, from, to, contact, scheduleDate, status, deliveryAddress, operationType, responsible, productName, quantity, items }
  create: async (data) => {
    return apiCall('/deliveries', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Update delivery: PUT /deliveries/:id
  update: async (id, data) => {
    return apiCall(`/deliveries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Delete delivery: DELETE /deliveries/:id
  delete: async (id) => {
    return apiCall(`/deliveries/${id}`, { method: 'DELETE' });
  }
};

// ==================== Warehouses ====================

export const warehouseAPI = {
  // Get all warehouses: GET /warehouses
  getAll: async () => {
    return apiCall('/warehouses');
  },

  // Get single warehouse: GET /warehouses/:id
  getById: async (id) => {
    return apiCall(`/warehouses/${id}`);
  },

  // Create warehouse: POST /warehouses
  // Body: { warehouseName, warehouseShortCode, address }
  create: async (data) => {
    return apiCall('/warehouses', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Update warehouse: PUT /warehouses/:id
  update: async (id, data) => {
    return apiCall(`/warehouses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Delete warehouse: DELETE /warehouses/:id
  delete: async (id) => {
    return apiCall(`/warehouses/${id}`, { method: 'DELETE' });
  }
};

// ==================== Locations ====================

export const locationAPI = {
  // Get all locations: GET /locations
  getAll: async () => {
    return apiCall('/locations');
  },

  // Get locations by warehouse: GET /locations?warehouseShortCode=WH001
  getByWarehouse: async (warehouseShortCode) => {
    return apiCall(`/locations?warehouseShortCode=${warehouseShortCode}`);
  },

  // Create location: POST /locations
  // Body: { locationName, locationShortCode, warehouseShortCode }
  create: async (data) => {
    return apiCall('/locations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Update location: PUT /locations/:id
  update: async (id, data) => {
    return apiCall(`/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Delete location: DELETE /locations/:id
  delete: async (id) => {
    return apiCall(`/locations/${id}`, { method: 'DELETE' });
  }
};

// ==================== Move History ====================

export const moveHistoryAPI = {
  // Get all move history: GET /move-history
  getAll: async () => {
    return apiCall('/move-history');
  },

  // Get move history by reference: GET /move-history?referenceId=REC-2024-001
  getByReference: async (referenceId) => {
    return apiCall(`/move-history?referenceId=${referenceId}`);
  }
};

// ==================== Dashboard Stats ====================

export const dashboardAPI = {
  // Get dashboard statistics: GET /dashboard/stats
  getStats: async () => {
    return apiCall('/dashboard/stats');
  }
};

// ==================== Export for easy importing ====================

export default {
  auth: authAPI,
  user: userAPI,
  stock: stockAPI,
  receipts: receiptAPI,
  deliveries: deliveryAPI,
  warehouses: warehouseAPI,
  locations: locationAPI,
  moveHistory: moveHistoryAPI,
  dashboard: dashboardAPI
};
