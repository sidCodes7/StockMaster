// Move History Page
import { useState } from 'react';
import { Card, Badge } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { moveHistory as initialHistory } from '../data/mockData';
import { formatDate, getStatusColor } from '../utils/helpers';

const MoveHistory = () => {
  const [history] = useState(initialHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredHistory = history.filter(h => 
    (!typeFilter || h.type === typeFilter) &&
    (searchTerm === '' || 
      h.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.productName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    {
      header: 'Date',
      render: (move) => (
        <div>
          <p className="text-sm text-gray-900">{formatDate(move.date)}</p>
        </div>
      )
    },
    {
      header: 'Reference',
      render: (move) => (
        <div>
          <p className="font-medium text-gray-900">{move.reference}</p>
          <p className="text-xs text-gray-600">{move.type}</p>
        </div>
      )
    },
    {
      header: 'Product',
      accessor: 'productName'
    },
    {
      header: 'From',
      render: (move) => move.fromWarehouse || move.fromLocation || '-'
    },
    {
      header: 'To',
      render: (move) => move.toWarehouse || move.toLocation || move.warehouse || '-'
    },
    {
      header: 'Quantity',
      render: (move) => (
        <span className={move.quantity < 0 ? 'text-red-600' : 'text-gray-900'}>
          {move.quantity > 0 ? '+' : ''}{move.quantity}
        </span>
      )
    },
    {
      header: 'Status',
      render: (move) => (
        <Badge className={getStatusColor(move.status)}>
          {move.status}
        </Badge>
      )
    },
    {
      header: 'User',
      accessor: 'user'
    }
  ];

  const typeOptions = [
    { value: 'Receipt', label: 'Receipt' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Transfer', label: 'Transfer' },
    { value: 'Adjustment', label: 'Adjustment' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Move History</h1>
        <p className="text-gray-600 mt-1">Track all inventory movements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Movements</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{history.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Receipts</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {history.filter(h => h.type === 'Receipt').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Deliveries</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {history.filter(h => h.type === 'Delivery').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Transfers</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {history.filter(h => h.type === 'Transfer').length}
          </p>
        </div>
      </div>

      <Card>
        <SearchFilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={typeFilter}
          onFilterChange={setTypeFilter}
          filterOptions={typeOptions}
          placeholder="Search by reference or product..."
          filterLabel="All Types"
        />
        
        <Table
          columns={columns}
          data={filteredHistory}
          emptyMessage="No movement history found"
        />
      </Card>
    </div>
  );
};

export default MoveHistory;
