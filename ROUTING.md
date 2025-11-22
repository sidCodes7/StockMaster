# StockMaster - Routing Documentation

## 📍 Route Structure

### Route Types

The application uses **React Router v7** with three types of routes:

1. **Public Routes** - Accessible without authentication
2. **Protected Routes** - Require authentication
3. **Nested Routes** - Routes within the main layout

---

## 🔐 Authentication Flow

### Route Guards

#### **ProtectedRoute Component**
Wraps all authenticated pages and redirects to login if user is not authenticated.

```jsx
<ProtectedRoute>
  <MainLayout />
</ProtectedRoute>
```

#### **PublicRoute Component**
Wraps login/signup pages and redirects to dashboard if user is already authenticated.

```jsx
<PublicRoute>
  <Login />
</PublicRoute>
```

---

## 🗺️ Complete Route Map

### Public Routes (No Auth Required)

| Path | Component | Description |
|------|-----------|-------------|
| `/login` | Login | User login page with email/password |
| `/signup` | Signup | New user registration |

### Protected Routes (Auth Required)

#### Main Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect | Redirects to `/dashboard` |
| `/dashboard` | Dashboard | Main overview with KPIs and stats |

#### Product Management

| Path | Component | Description |
|------|-----------|-------------|
| `/products` | Products | Product list with search/filter |
| `/products/new` | ProductForm | Create new product |
| `/products/:id/edit` | ProductForm | Edit existing product |

#### Inventory Operations

| Path | Component | Description |
|------|-----------|-------------|
| `/receipts` | Receipts | Incoming stock receipts |
| `/delivery-orders` | DeliveryOrders | Outgoing deliveries |
| `/transfers` | InternalTransfers | Warehouse-to-warehouse transfers |
| `/adjustments` | StockAdjustments | Inventory count adjustments |

#### Tracking & Management

| Path | Component | Description |
|------|-----------|-------------|
| `/move-history` | MoveHistory | Complete audit trail of movements |
| `/warehouses` | Warehouses | Warehouse locations and capacity |
| `/profile` | Profile | User profile and settings |

### Catch-All Route

| Path | Component | Description |
|------|-----------|-------------|
| `*` | Navigate | Redirects any unknown route to `/` |

---

## 🏗️ Route Hierarchy

```
/
├── /login (Public)
├── /signup (Public)
│
└── / (Protected - MainLayout)
    ├── /dashboard
    ├── /products
    │   ├── /products/new
    │   └── /products/:id/edit
    ├── /receipts
    ├── /delivery-orders
    ├── /transfers
    ├── /adjustments
    ├── /move-history
    ├── /warehouses
    └── /profile
```

---

## 🔄 Navigation Flow

### Initial Load
1. App loads → Check localStorage for saved user
2. If user exists → Redirect to `/dashboard`
3. If no user → Show `/login`

### After Login
1. User submits credentials
2. Validation succeeds
3. User data saved to localStorage
4. Redirect to `/dashboard`

### After Logout
1. User clicks logout
2. Clear localStorage
3. Clear user state
4. Redirect to `/login`

### Protected Route Access
1. User tries to access protected route
2. Check if user is authenticated
3. If yes → Allow access
4. If no → Redirect to `/login`

### Public Route Access (When Logged In)
1. User tries to access `/login` or `/signup`
2. Check if user is authenticated
3. If yes → Redirect to `/dashboard`
4. If no → Allow access

---

## 🎯 Route Parameters

### Dynamic Routes

#### Product Edit
- **Route:** `/products/:id/edit`
- **Parameter:** `id` (product ID)
- **Example:** `/products/5/edit`
- **Usage:** Edit product with ID 5

---

## 🔗 Navigation Methods

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to dashboard
navigate('/dashboard');

// Navigate with replace (no history entry)
navigate('/login', { replace: true });

// Navigate with state
navigate('/products', { state: { from: 'dashboard' } });

// Go back
navigate(-1);
```

### Link Components

```jsx
import { Link } from 'react-router-dom';

// Basic link
<Link to="/products">Products</Link>

// Link with styling
<Link to="/dashboard" className="nav-link">
  Dashboard
</Link>

// Link with state
<Link to="/profile" state={{ edit: true }}>
  Edit Profile
</Link>
```

---

## 📊 Route-Based Features

### Search Functionality
Available on these routes:
- `/products` - Search by name, SKU, category
- `/receipts` - Search by reference, supplier
- `/delivery-orders` - Search by reference, customer
- `/transfers` - Search by reference
- `/adjustments` - Search by reference
- `/move-history` - Search by reference, product
- `/warehouses` - Search by name, location, code

### Filter Functionality
Available on these routes:
- `/products` - Filter by category
- `/receipts` - Filter by status
- `/delivery-orders` - Filter by status
- `/transfers` - Filter by status
- `/adjustments` - Filter by status
- `/move-history` - Filter by type

---

## 🛡️ Route Protection

### Authentication Check
```jsx
const { user, loading } = useAuth();

if (loading) {
  return <LoadingSpinner />;
}

if (!user) {
  return <Navigate to="/login" replace />;
}

return <Component />;
```

### Role-Based Access (Future Enhancement)
Currently all authenticated users have same access. Can be extended with:

```jsx
if (user.role !== 'Admin') {
  return <Navigate to="/unauthorized" replace />;
}
```

---

## 🎨 Active Route Styling

### Sidebar Navigation

The sidebar highlights the active route:

```jsx
const isActive = (path) => {
  return location.pathname === path || 
         location.pathname.startsWith(path + '/');
};

<Link
  to="/products"
  className={isActive('/products') 
    ? 'bg-gray-800 text-white'
    : 'text-gray-300'
  }
>
  Products
</Link>
```

---

## 🔧 Route Configuration

### Nested Routes

The main layout uses nested routes with `<Outlet />`:

```jsx
<Route path="/" element={<MainLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="products" element={<Products />} />
  {/* More nested routes */}
</Route>
```

### Layout Structure

```
MainLayout
├── Sidebar (persistent)
├── Navbar (persistent)
└── Outlet (changes based on route)
    └── Page Component
```

---

## 📝 Route Best Practices

### DO:
✅ Use meaningful route names
✅ Keep routes RESTful
✅ Use nested routes for related pages
✅ Implement route guards
✅ Handle 404s gracefully
✅ Use loading states

### DON'T:
❌ Use complex query strings
❌ Store sensitive data in URLs
❌ Create duplicate routes
❌ Forget to handle edge cases
❌ Allow unauthorized access

---

## 🐛 Troubleshooting

### Common Issues

#### **Route Not Working**
- Check route path spelling
- Verify component is imported
- Ensure route is inside Router component

#### **Infinite Redirect Loop**
- Check protected route logic
- Verify authentication state
- Clear localStorage if needed

#### **Active State Not Updating**
- Ensure using `useLocation` hook
- Check path matching logic
- Verify className conditions

#### **404 on Refresh**
- Configure server for SPA routing
- Add catch-all route
- Check build configuration

---

## 🚀 Route Performance

### Lazy Loading (Future Enhancement)

Currently all routes are loaded upfront. Can optimize with:

```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Route 
  path="dashboard" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  } 
/>
```

### Preloading
Routes are preloaded on hover for better UX (browser default behavior)

---

## 📋 Route Testing Checklist

- [x] All routes accessible
- [x] Protected routes redirect when not authenticated
- [x] Public routes redirect when authenticated
- [x] 404 handling works
- [x] Dynamic routes work (product edit)
- [x] Navigation works from all pages
- [x] Back button works correctly
- [x] Active states highlight correctly
- [x] Deep links work
- [x] Browser refresh maintains state

---

## 🔗 Related Files

- `/src/App.jsx` - Main routing configuration
- `/src/hooks/useAuth.js` - Authentication hook
- `/src/context/AuthContext.jsx` - Auth context provider
- `/src/layouts/MainLayout.jsx` - Layout with Outlet
- `/src/layouts/Sidebar.jsx` - Navigation links

---

**Status:** ✅ All routes configured and working correctly
