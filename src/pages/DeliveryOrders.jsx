// Delivery Orders Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/UI';
import { Table, SearchFilterBar } from '../components/Table';
import { deliveryOrders as initialOrders, warehouses } from '../data/mockData';
import { formatCurrency, formatDate, getStatusColor, getWarehouseName, filterBySearch, filterByStatus } from '../utils/helpers';

const DeliveryOrders = () => {
  const navigate = useNavigate();
  const [orders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = filterByStatus(
    filterBySearch(orders, searchTerm, ['reference', 'customer']),
    statusFilter
  );

  const columns = [
    {
      header: 'Reference',
      render: (order) => (
        <div>
          <p className="font-medium text-gray-900">{order.reference}</p>
          <p className="text-xs text-gray-600">{formatDate(order.createdDate)}</p>
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer'
    },
    {
      header: 'Warehouse',
      render: (order) => getWarehouseName(warehouses, order.warehouseId)
    },
    {
      header: 'Scheduled Date',
      render: (order) => formatDate(order.scheduledDate)
    },
    {
      header: 'Items',
      render: (order) => `${order.items.length} items`
    },
    {
      header: 'Total Value',
      render: (order) => formatCurrency(order.totalValue)
    },
    {
      header: 'Status',
      render: (order) => (
        <Badge className={getStatusColor(order.status)}>
          {order.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      render: (order) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/delivery-orders/${order.id}`);
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
    { value: 'Ready', label: 'Ready' },
    { value: 'Done', label: 'Done' },
    { value: 'Canceled', label: 'Canceled' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Orders</h1>
          <p className="text-gray-600 mt-1">Manage outgoing deliveries</p>
        </div>
        <Link to="/delivery-orders/new">
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Delivery
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Ready to Ship</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {orders.filter(o => o.status === 'Ready').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {orders.filter(o => o.status === 'Done').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(orders.reduce((sum, o) => sum + o.totalValue, 0))}
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
          placeholder="Search by reference or customer..."
        />
        
        <Table
          columns={columns}
          data={filteredOrders}
          onRowClick={(order) => navigate(`/delivery-orders/${order.id}`)}
          emptyMessage="No delivery orders found"
        />
      </Card>
    </div>
  );
};

export default DeliveryOrders;
