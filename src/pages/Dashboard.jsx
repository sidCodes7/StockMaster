// Dashboard Page
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StatsCard, Card, Badge } from '../components/UI';
import { products, receipts, deliveryOrders, internalTransfers, warehouses } from '../data/mockData';
import { formatCurrency, getStatusColor, getTotalStock, isLowStock } from '../utils/helpers';

const Dashboard = () => {
  // Calculate statistics using useMemo to avoid setState in useEffect
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + getTotalStock(p), 0);
    const lowStockItems = products.filter(p => isLowStock(p)).length;
    const totalValue = products.reduce((sum, p) => sum + (getTotalStock(p) * p.unitPrice), 0);
    const pendingReceipts = receipts.filter(r => r.status === 'Waiting' || r.status === 'Draft').length;
    const pendingDeliveries = deliveryOrders.filter(d => d.status === 'Waiting' || d.status === 'Draft').length;
    
    const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
    const currentStock = warehouses.reduce((sum, w) => sum + w.currentStock, 0);
    const warehouseUtilization = ((currentStock / totalCapacity) * 100).toFixed(1);

    return {
      totalProducts,
      totalStock,
      lowStockItems,
      totalValue,
      pendingReceipts,
      pendingDeliveries,
      warehouseUtilization
    };
  }, []);

  // Get recent activities using useMemo
  const recentActivities = useMemo(() => {
    return [
      ...receipts.slice(0, 3).map(r => ({ ...r, type: 'Receipt' })),
      ...deliveryOrders.slice(0, 3).map(d => ({ ...d, type: 'Delivery' })),
      ...internalTransfers.slice(0, 2).map(t => ({ ...t, type: 'Transfer' }))
    ].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 8);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your inventory overview</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/receipts/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            New Receipt
          </Link>
          <Link
            to="/delivery-orders/new"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            New Delivery
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          color="blue"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
        />
        <StatsCard
          title="Total Stock Units"
          value={stats.totalStock.toLocaleString()}
          color="green"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          )}
        />
        <StatsCard
          title="Low Stock Alerts"
          value={stats.lowStockItems}
          color="red"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        />
        <StatsCard
          title="Total Inventory Value"
          value={formatCurrency(stats.totalValue)}
          color="purple"
          icon={(props) => (
            <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
      </div>

      {/* Operations Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Pending Operations" className="col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Receipts</p>
                  <p className="text-xs text-gray-600">Pending approval</p>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-600">{stats.pendingReceipts}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Deliveries</p>
                  <p className="text-xs text-gray-600">Ready to ship</p>
                </div>
              </div>
              <span className="text-xl font-bold text-green-600">{stats.pendingDeliveries}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Warehouse</p>
                  <p className="text-xs text-gray-600">Capacity used</p>
                </div>
              </div>
              <span className="text-xl font-bold text-purple-600">{stats.warehouseUtilization}%</span>
            </div>
          </div>
        </Card>

        <Card title="Low Stock Products" action={<Link to="/products" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>} className="col-span-1 lg:col-span-2">
          <div className="space-y-3">
            {products.filter(p => isLowStock(p)).slice(0, 5).map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-600">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">{getTotalStock(product)} units</p>
                  <p className="text-xs text-gray-600">Min: {product.stock[0]?.minStock || 0}</p>
                </div>
              </div>
            ))}
            {products.filter(p => isLowStock(p)).length === 0 && (
              <p className="text-center text-gray-500 py-8">No low stock items</p>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card title="Recent Activities" action={<Link to="/move-history" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {activity.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.totalValue ? formatCurrency(activity.totalValue) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(activity.createdDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
