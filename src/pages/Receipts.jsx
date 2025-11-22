// Receipts Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { receipts as initialReceipts, warehouses } from '../data/mockData';
import { formatCurrency, formatDate, getStatusColor, getWarehouseName, filterBySearch, filterByStatus } from '../utils/helpers';

const Receipts = () => {
  const navigate = useNavigate();
  const [receipts] = useState(initialReceipts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredReceipts = filterByStatus(
    filterBySearch(receipts, searchTerm, ['reference', 'supplier']),
    statusFilter
  );

  const columns = [
    {
      header: 'Reference',
      render: (receipt) => (
        <div>
          <p className="font-medium text-gray-900">{receipt.reference}</p>
          <p className="text-xs text-gray-600">{formatDate(receipt.createdDate)}</p>
        </div>
      )
    },
    {
      header: 'Supplier',
      accessor: 'supplier'
    },
    {
      header: 'Warehouse',
      render: (receipt) => getWarehouseName(warehouses, receipt.warehouseId)
    },
    {
      header: 'Scheduled Date',
      render: (receipt) => formatDate(receipt.scheduledDate)
    },
    {
      header: 'Items',
      render: (receipt) => `${receipt.items.length} items`
    },
    {
      header: 'Total Value',
      render: (receipt) => formatCurrency(receipt.totalValue)
    },
    {
      header: 'Status',
      render: (receipt) => (
        <Badge className={getStatusColor(receipt.status)}>
          {receipt.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      render: (receipt) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/receipts/${receipt.id}`);
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
    { value: 'Waiting', label: 'Waiting' },
    { value: 'Done', label: 'Done' },
    { value: 'Canceled', label: 'Canceled' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
          <p className="text-gray-600 mt-1">Manage incoming stock receipts</p>
        </div>
        <Link to="/receipts/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Receipt
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Receipts</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{receipts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Waiting</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {receipts.filter(r => r.status === 'Waiting').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {receipts.filter(r => r.status === 'Done').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(receipts.reduce((sum, r) => sum + r.totalValue, 0))}
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
          placeholder="Search by reference or supplier..."
        />
        
        <Table
          columns={columns}
          data={filteredReceipts}
          onRowClick={(receipt) => navigate(`/receipts/${receipt.id}`)}
          emptyMessage="No receipts found"
        />
      </Card>
    </div>
  );
};

export default Receipts;
