// Create/Edit Product Page
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Input, Select, Textarea, Button, Alert } from '../components/UI';
import { products, warehouses, categories, suppliers } from '../data/mockData';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // Get initial form data using useMemo to avoid setState in useEffect
  const initialFormData = useMemo(() => {
    if (isEdit) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        return {
          ...product,
          unitPrice: product.unitPrice.toString(),
          stock: warehouses.map(w => {
            const existingStock = product.stock.find(s => s.warehouseId === w.id);
            return existingStock || { warehouseId: w.id, quantity: 0, minStock: 0 };
          })
        };
      }
    }
    return {
      sku: '',
      name: '',
      category: '',
      description: '',
      unitPrice: '',
      supplier: '',
      status: 'Active',
      stock: warehouses.map(w => ({ warehouseId: w.id, quantity: 0, minStock: 0 }))
    };
  }, [id, isEdit]);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      newErrors.unitPrice = 'Valid price is required';
    }
    if (!formData.supplier) newErrors.supplier = 'Supplier is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate save
    setSuccess(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
    
    setTimeout(() => {
      navigate('/products');
    }, 1500);
  };

  const handleStockChange = (warehouseId, field, value) => {
    setFormData({
      ...formData,
      stock: formData.stock.map(s =>
        s.warehouseId === warehouseId
          ? { ...s, [field]: parseInt(value) || 0 }
          : s
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Product' : 'Create Product'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit ? 'Update product information' : 'Add a new product to inventory'}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/products')}>
          Cancel
        </Button>
      </div>

      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              error={errors.sku}
              required
              placeholder="PROD-001"
            />

            <Input
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
              placeholder="Enter product name"
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories.map(c => ({ value: c, label: c }))}
              error={errors.category}
              required
              placeholder="Select category"
            />

            <Input
              label="Unit Price"
              type="number"
              step="0.01"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
              error={errors.unitPrice}
              required
              placeholder="0.00"
            />

            <Select
              label="Supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              options={suppliers.map(s => ({ value: s, label: s }))}
              error={errors.supplier}
              required
              placeholder="Select supplier"
            />

            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
              required
            />
          </div>

          <div className="mt-6">
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Enter product description"
            />
          </div>
        </Card>

        {/* Stock by Warehouse */}
        <Card title="Stock by Warehouse">
          <div className="space-y-4">
            {warehouses.map(warehouse => {
              const stock = formData.stock.find(s => s.warehouseId === warehouse.id) || {};
              return (
                <div key={warehouse.id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">{warehouse.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Current Quantity"
                      type="number"
                      value={stock.quantity || 0}
                      onChange={(e) => handleStockChange(warehouse.id, 'quantity', e.target.value)}
                      placeholder="0"
                    />
                    <Input
                      label="Minimum Stock Level"
                      type="number"
                      value={stock.minStock || 0}
                      onChange={(e) => handleStockChange(warehouse.id, 'minStock', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/products')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEdit ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
