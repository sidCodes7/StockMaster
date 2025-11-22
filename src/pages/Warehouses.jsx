// Warehouses Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { warehouses as initialWarehouses } from '../data/mockData';
import { filterBySearch, calculatePercentage } from '../utils/helpers';

const Warehouses = () => {
  const navigate = useNavigate();
  const [warehouses] = useState(initialWarehouses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWarehouses = filterBySearch(
    warehouses,
    searchTerm,
    ['name', 'location', 'code']
  );

  const columns = [
    {
      header: 'Warehouse',
      render: (warehouse) => (
        <div>
          <p className="font-medium text-gray-900">{warehouse.name}</p>
          <p className="text-xs text-gray-600">Code: {warehouse.code}</p>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location'
    },
    {
      header: 'Capacity',
      render: (warehouse) => `${warehouse.capacity.toLocaleString()} units`
    },
    {
      header: 'Current Stock',
      render: (warehouse) => `${warehouse.currentStock.toLocaleString()} units`
    },
    {
      header: 'Utilization',
      render: (warehouse) => {
        const percentage = calculatePercentage(warehouse.currentStock, warehouse.capacity);
        const color = percentage >= 90 ? 'text-red-600' : percentage >= 70 ? 'text-yellow-600' : 'text-green-600';
        return (
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
              <div
                className={`h-2 rounded-full ${percentage >= 90 ? 'bg-red-600' : percentage >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${color}`}>{percentage}%</span>
          </div>
        );
      }
    },
    {
      header: 'Actions',
      render: (warehouse) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/warehouses/${warehouse.id}/edit`);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/warehouses/${warehouse.id}`);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Warehouses</h1>
          <p className="text-gray-600 mt-1">Manage warehouse locations</p>
        </div>
        <Link to="/warehouses/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Warehouse
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Warehouses</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{warehouses.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Capacity</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {warehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Stock</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {warehouses.reduce((sum, w) => sum + w.currentStock, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Avg Utilization</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {calculatePercentage(
              warehouses.reduce((sum, w) => sum + w.currentStock, 0),
              warehouses.reduce((sum, w) => sum + w.capacity, 0)
            )}%
          </p>
        </div>
      </div>

      <Card>
        <SearchFilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by name, location, or code..."
        />
        
        <Table
          columns={columns}
          data={filteredWarehouses}
          onRowClick={(warehouse) => navigate(`/warehouses/${warehouse.id}`)}
          emptyMessage="No warehouses found"
        />
      </Card>
    </div>
  );
};

export default Warehouses;
