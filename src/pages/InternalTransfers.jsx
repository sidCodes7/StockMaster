// Internal Transfers Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { internalTransfers as initialTransfers, warehouses } from '../data/mockData';
import { formatDate, getStatusColor, getWarehouseName, filterBySearch, filterByStatus } from '../utils/helpers';

const InternalTransfers = () => {
  const navigate = useNavigate();
  const [transfers] = useState(initialTransfers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTransfers = filterByStatus(
    filterBySearch(transfers, searchTerm, ['reference']),
    statusFilter
  );

  const columns = [
    {
      header: 'Reference',
      render: (transfer) => (
        <div>
          <p className="font-medium text-gray-900">{transfer.reference}</p>
          <p className="text-xs text-gray-600">{formatDate(transfer.createdDate)}</p>
        </div>
      )
    },
    {
      header: 'From',
      render: (transfer) => getWarehouseName(warehouses, transfer.fromWarehouseId)
    },
    {
      header: 'To',
      render: (transfer) => getWarehouseName(warehouses, transfer.toWarehouseId)
    },
    {
      header: 'Scheduled Date',
      render: (transfer) => formatDate(transfer.scheduledDate)
    },
    {
      header: 'Items',
      render: (transfer) => `${transfer.items.length} items`
    },
    {
      header: 'Status',
      render: (transfer) => (
        <Badge className={getStatusColor(transfer.status)}>
          {transfer.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      render: (transfer) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/transfers/${transfer.id}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Internal Transfers</h1>
          <p className="text-gray-600 mt-1">Manage stock transfers between warehouses</p>
        </div>
        <Link to="/transfers/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            New Transfer
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Transfers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{transfers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {transfers.filter(t => t.status === 'Waiting').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {transfers.filter(t => t.status === 'Done').length}
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
          data={filteredTransfers}
          onRowClick={(transfer) => navigate(`/transfers/${transfer.id}`)}
          emptyMessage="No transfers found"
        />
      </Card>
    </div>
  );
};

export default InternalTransfers;
