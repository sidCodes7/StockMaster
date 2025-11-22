// User Profile Page
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, Input, Button, Alert } from '../components/UI';
import { getInitials } from '../utils/helpers';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || ''
  });
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      {success && <Alert type="success" message={success} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {getInitials(user?.name || 'User')}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.role}</p>
            <Button variant="outline" className="mt-4 w-full" type="button">
              Change Photo
            </Button>
          </div>
        </Card>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card title="Personal Information">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Role"
                value={formData.role}
                disabled
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>

          <Card title="Change Password" className="mt-6">
            <form className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />

              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Account Statistics */}
      <Card title="Account Statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">24</p>
            <p className="text-sm text-gray-600 mt-1">Operations Created</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">156</p>
            <p className="text-sm text-gray-600 mt-1">Products Managed</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">89</p>
            <p className="text-sm text-gray-600 mt-1">Days Active</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
