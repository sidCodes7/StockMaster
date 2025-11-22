// Products List Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { products as initialProducts, warehouses } from '../data/mockData';
import { formatCurrency, getStatusColor, getTotalStock, isLowStock, filterBySearch } from '../utils/helpers';

const Products = () => {
  const navigate = useNavigate();
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter products
  const filteredProducts = filterBySearch(
    products.filter(p => !categoryFilter || p.category === categoryFilter),
    searchTerm,
    ['name', 'sku', 'category', 'supplier']
  );

  const categories = [...new Set(products.map(p => p.category))];

  const columns = [
    {
      header: 'Product',
      render: (product) => (
        <div>
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-600">SKU: {product.sku}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category'
    },
    {
      header: 'Stock',
      render: (product) => {
        const total = getTotalStock(product);
        const lowStock = isLowStock(product);
        return (
          <span className={lowStock ? 'text-red-600 font-semibold' : 'text-gray-900'}>
            {total} units
            {lowStock && (
              <span className="ml-2 inline-flex items-center">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </span>
        );
      }
    },
    {
      header: 'Price',
      render: (product) => formatCurrency(product.unitPrice)
    },
    {
      header: 'Status',
      render: (product) => (
        <Badge className={getStatusColor(product.status)}>
          {product.status}
        </Badge>
      )
    },
    {
      header: 'Warehouses',
      render: (product) => (
        <div className="text-sm">
          {product.stock.map((s, idx) => {
            const wh = warehouses.find(w => w.id === s.warehouseId);
            return (
              <div key={idx} className="text-xs text-gray-600">
                {wh?.name}: {s.quantity}
              </div>
            );
          })}
        </div>
      )
    },
    {
      header: 'Actions',
      render: (product) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}/edit`);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            View
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Link to="/products/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Units</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {products.reduce((sum, p) => sum + getTotalStock(p), 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Low Stock Items</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {products.filter(p => isLowStock(p)).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(products.reduce((sum, p) => sum + (getTotalStock(p) * p.unitPrice), 0))}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <SearchFilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={categoryFilter}
          onFilterChange={setCategoryFilter}
          filterOptions={categories.map(c => ({ value: c, label: c }))}
          placeholder="Search by name, SKU, category..."
          filterLabel="All Categories"
        />
        
        <Table
          columns={columns}
          data={filteredProducts}
          onRowClick={(product) => navigate(`/products/${product.id}`)}
          emptyMessage="No products found"
        />
      </Card>
    </div>
  );
};

export default Products;
