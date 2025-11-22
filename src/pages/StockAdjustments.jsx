// Stock Adjustments Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { stockAdjustments as initialAdjustments, warehouses } from '../data/mockData';
import { formatDate, getStatusColor, getWarehouseName, filterBySearch, filterByStatus } from '../utils/helpers';

const StockAdjustments = () => {
  const navigate = useNavigate();
  const [adjustments] = useState(initialAdjustments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAdjustments = filterByStatus(
    filterBySearch(adjustments, searchTerm, ['reference']),
    statusFilter
  );

  const columns = [
    {
      header: 'Reference',
      render: (adjustment) => (
        <div>
          <p className="font-medium text-gray-900">{adjustment.reference}</p>
          <p className="text-xs text-gray-600">{formatDate(adjustment.createdDate)}</p>
        </div>
      )
    },
    {
      header: 'Warehouse',
      render: (adjustment) => getWarehouseName(warehouses, adjustment.warehouseId)
    },
    {
      header: 'Date',
      render: (adjustment) => formatDate(adjustment.date)
    },
    {
      header: 'Items',
      render: (adjustment) => `${adjustment.items.length} items`
    },
    {
      header: 'Total Adjustment',
      render: (adjustment) => {
        const total = adjustment.items.reduce((sum, item) => sum + item.difference, 0);
        return (
          <span className={total >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
            {total >= 0 ? '+' : ''}{total}
          </span>
        );
      }
    },
    {
      header: 'Status',
      render: (adjustment) => (
        <Badge className={getStatusColor(adjustment.status)}>
          {adjustment.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      render: (adjustment) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/adjustments/${adjustment.id}`);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View
        </button>
      )
    }
  ];

  const statusOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Done', label: 'Done' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Adjustments</h1>
          <p className="text-gray-600 mt-1">Manage inventory count adjustments</p>
        </div>
        <Link to="/adjustments/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            New Adjustment
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Adjustments</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{adjustments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {adjustments.filter(a => a.status === 'Draft').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Validated</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {adjustments.filter(a => a.status === 'Done').length}
          </p>
        </div>
      </div>

      <Card>
        <SearchFilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={statusOptions}
          placeholder="Search by reference..."
        />
        
        <Table
          columns={columns}
          data={filteredAdjustments}
          onRowClick={(adjustment) => navigate(`/adjustments/${adjustment.id}`)}
          emptyMessage="No adjustments found"
        />
      </Card>
    </div>
  );
};

export default StockAdjustments;
