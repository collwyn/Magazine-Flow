# ICONIC Distributions - Technical Specification

## Project Overview
Build a full-stack magazine distribution management system for ICONIC Distributions, a NYC-based distributor serving retail locations. The system manages inventory, orders, retailer accounts, and provides separate interfaces for administrators and retail customers.

## Deployment Environment
- **Platform**: Replit
- **Recommended Stack**: 
  - Backend: Node.js/Express (recommended for Replit) or Python/Flask
  - Database: PostgreSQL (Replit native support) or SQLite
  - API: REST API
  - Auth: JWT (JSON Web Tokens)
  - Frontend: React with Tailwind CSS

## Current MVP Features (Reference Implementation)
An MVP exists with the following features:
- User authentication (Admin and Retailer roles)
- Dashboard with statistics
- Magazine inventory management
- Retailer account management
- Order creation and tracking
- Role-based views and permissions
- Real-time inventory deduction on order creation

## User Roles & Permissions

### Admin Role
**Access**: Full system access
- View dashboard with all statistics (total revenue, orders, retailers, inventory)
- Manage complete magazine inventory (add, view, update stock)
- View all retailer accounts and their statistics
- Create and view orders for any retailer
- Access all system features and data

### Retailer Role
**Access**: Limited to own account
- View own account information and statistics
- Browse available magazine catalog
- Create orders for own store only
- View own order history only
- No access to other retailers' data
- No inventory management capabilities

## Database Schema

### Users Table
```sql
- id (PRIMARY KEY)
- username (UNIQUE, NOT NULL)
- password_hash (NOT NULL)
- role (ENUM: 'admin', 'retailer')
- retailer_id (FOREIGN KEY, nullable - only for retailer users)
- email (UNIQUE, NOT NULL)
- phone (nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- last_login (TIMESTAMP)
- is_active (BOOLEAN, default true)
```

### Retailers Table
```sql
- id (PRIMARY KEY)
- name (NOT NULL)
- address (TEXT)
- contact_person (VARCHAR)
- phone (VARCHAR)
- email (VARCHAR)
- credit_limit (DECIMAL(10,2), default 0)
- current_balance (DECIMAL(10,2), default 0)
- status (ENUM: 'active', 'inactive', 'suspended')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Magazines Table
```sql
- id (PRIMARY KEY)
- title (VARCHAR, NOT NULL)
- publisher (VARCHAR, NOT NULL)
- category (VARCHAR)
- price (DECIMAL(10,2), NOT NULL)
- cost (DECIMAL(10,2)) -- wholesale cost from publisher
- stock (INTEGER, default 0)
- sku (VARCHAR, UNIQUE)
- status (ENUM: 'active', 'discontinued')
- reorder_point (INTEGER, default 50)
- reorder_quantity (INTEGER, default 100)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Orders Table
```sql
- id (PRIMARY KEY)
- order_number (VARCHAR, UNIQUE, auto-generated)
- retailer_id (FOREIGN KEY)
- order_date (DATE, NOT NULL)
- status (ENUM: 'pending', 'confirmed', 'processing', 'in-transit', 'delivered', 'cancelled')
- subtotal (DECIMAL(10,2))
- tax (DECIMAL(10,2))
- shipping_fee (DECIMAL(10,2), default 0)
- total_amount (DECIMAL(10,2))
- payment_status (ENUM: 'unpaid', 'paid', 'partial', 'refunded')
- payment_method (VARCHAR, nullable)
- stripe_payment_id (VARCHAR, nullable)
- delivery_date (DATE, nullable)
- notes (TEXT, nullable)
- created_by (FOREIGN KEY to Users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Order_Items Table
```sql
- id (PRIMARY KEY)
- order_id (FOREIGN KEY)
- magazine_id (FOREIGN KEY)
- quantity (INTEGER, NOT NULL)
- unit_price (DECIMAL(10,2), NOT NULL)
- subtotal (DECIMAL(10,2), NOT NULL)
- created_at (TIMESTAMP)
```

### Invoices Table
```sql
- id (PRIMARY KEY)
- invoice_number (VARCHAR, UNIQUE, auto-generated)
- order_id (FOREIGN KEY)
- retailer_id (FOREIGN KEY)
- issue_date (DATE, NOT NULL)
- due_date (DATE, NOT NULL)
- amount (DECIMAL(10,2), NOT NULL)
- status (ENUM: 'draft', 'sent', 'paid', 'overdue', 'cancelled')
- pdf_path (VARCHAR, nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Payments Table
```sql
- id (PRIMARY KEY)
- invoice_id (FOREIGN KEY)
- order_id (FOREIGN KEY, nullable)
- retailer_id (FOREIGN KEY)
- amount (DECIMAL(10,2), NOT NULL)
- payment_date (DATE, NOT NULL)
- payment_method (ENUM: 'stripe', 'cash', 'check', 'bank_transfer')
- stripe_transaction_id (VARCHAR, nullable)
- reference_number (VARCHAR, nullable)
- notes (TEXT, nullable)
- created_at (TIMESTAMP)
```

### Notifications Table
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- type (ENUM: 'email', 'sms')
- subject (VARCHAR)
- message (TEXT)
- status (ENUM: 'pending', 'sent', 'failed')
- sent_at (TIMESTAMP, nullable)
- error_message (TEXT, nullable)
- created_at (TIMESTAMP)
```

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/me
POST   /api/auth/change-password
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### User Management (Admin Only)
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
PATCH  /api/users/:id/status
```

### Retailer Endpoints
```
GET    /api/retailers              (Admin: all, Retailer: own only)
GET    /api/retailers/:id          (Admin: any, Retailer: own only)
POST   /api/retailers              (Admin only)
PUT    /api/retailers/:id          (Admin only)
DELETE /api/retailers/:id          (Admin only)
GET    /api/retailers/:id/stats    (Admin: any, Retailer: own only)
GET    /api/retailers/:id/orders   (Admin: any, Retailer: own only)
```

### Magazine/Inventory Endpoints
```
GET    /api/magazines              (All authenticated users)
GET    /api/magazines/:id          (All authenticated users)
POST   /api/magazines              (Admin only)
PUT    /api/magazines/:id          (Admin only)
DELETE /api/magazines/:id          (Admin only)
PATCH  /api/magazines/:id/stock    (Admin only - adjust stock)
GET    /api/magazines/low-stock    (Admin only)
```

### Order Endpoints
```
GET    /api/orders                 (Admin: all, Retailer: own only)
GET    /api/orders/:id             (Admin: any, Retailer: own only)
POST   /api/orders                 (All authenticated users)
PUT    /api/orders/:id             (Admin only - update status)
DELETE /api/orders/:id             (Admin only - cancel)
PATCH  /api/orders/:id/status      (Admin only)
GET    /api/orders/:id/invoice     (Admin: any, Retailer: own only)
```

### Invoice Endpoints
```
GET    /api/invoices               (Admin: all, Retailer: own only)
GET    /api/invoices/:id           (Admin: any, Retailer: own only)
POST   /api/invoices               (Admin only)
GET    /api/invoices/:id/pdf       (Admin: any, Retailer: own only)
POST   /api/invoices/:id/send      (Admin only - email invoice)
```

### Payment Endpoints
```
GET    /api/payments               (Admin: all, Retailer: own only)
GET    /api/payments/:id           (Admin: any, Retailer: own only)
POST   /api/payments/stripe-intent (Create Stripe payment intent)
POST   /api/payments               (Record payment)
```

### Dashboard/Statistics Endpoints
```
GET    /api/dashboard/stats        (Admin: all stats, Retailer: own stats)
GET    /api/dashboard/recent-orders (Admin: all, Retailer: own only)
GET    /api/reports/sales          (Admin only)
GET    /api/reports/inventory      (Admin only)
```

### Export Endpoints
```
GET    /api/export/orders?format=csv|excel     (Admin only)
GET    /api/export/inventory?format=csv|excel  (Admin only)
GET    /api/export/retailers?format=csv|excel  (Admin only)
GET    /api/export/sales?format=csv|excel      (Admin only)
```

## Frontend Components Structure

### Pages/Views
```
/login                  - Login page
/dashboard              - Admin dashboard or Retailer account page
/inventory              - Magazine inventory management (Admin only)
/retailers              - Retailer accounts list (Admin only)
/retailers/:id          - Individual retailer details (Admin only)
/orders                 - Orders list (filtered by role)
/orders/:id             - Order details
/orders/new             - Create new order
/catalog                - Magazine catalog (Retailer view)
/account                - Account settings
/invoices               - Invoices list
/invoices/:id           - Invoice details
/payments               - Payment history
```

### Shared Components
```
- Navbar/Header (with logo, user info, logout)
- Sidebar Navigation (role-based menu)
- DataTable (reusable table with sorting, filtering, pagination)
- OrderForm (create/edit orders)
- MagazineForm (create/edit magazines)
- RetailerForm (create/edit retailers)
- StatCard (dashboard statistics cards)
- StatusBadge (order/payment status indicators)
- Modal (reusable modal dialog)
- LoadingSpinner
- ErrorBoundary
- PrivateRoute (protected route wrapper)
```

## Business Logic Requirements

### Order Creation Process
1. Validate retailer has sufficient credit limit
2. Verify all magazines have sufficient stock
3. Calculate subtotal, tax (if applicable), shipping fees
4. Deduct inventory from stock
5. Create order record with 'pending' status
6. Update retailer's current balance
7. Generate order confirmation email
8. Optionally send SMS notification

### Inventory Management
1. Track stock levels in real-time
2. Auto-generate reorder alerts when stock falls below reorder_point
3. Support manual stock adjustments (with audit trail)
4. Prevent negative stock (order validation)

### Payment Processing
1. Integrate Stripe for online payments
2. Support manual payment recording (cash, check, bank transfer)
3. Link payments to invoices and orders
4. Update order payment_status automatically
5. Update retailer balance upon payment

### Invoice Generation
1. Auto-generate invoices when order status changes to 'confirmed'
2. Generate PDF invoices using a template
3. Include: order details, line items, subtotal, tax, total, payment terms
4. Email invoices to retailers automatically
5. Allow manual invoice regeneration

## Integration Requirements

### Stripe Integration
```javascript
// Required Stripe features:
- Payment Intents API for secure payments
- Customer management (store retailer as Stripe customers)
- Invoice creation (optional, can use internal invoices)
- Webhook handling for payment confirmations
- Support for one-time payments (immediate order payment)

// Environment Variables Needed:
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

### Email Service Integration
```javascript
// Recommended: SendGrid, Mailgun, or AWS SES
// Required Email Templates:
1. Order Confirmation (to retailer)
2. Order Status Update (to retailer)
3. Invoice Email (with PDF attachment)
4. Payment Confirmation
5. Password Reset
6. Welcome Email (new user)

// Environment Variables Needed:
EMAIL_SERVICE_API_KEY
EMAIL_FROM_ADDRESS
EMAIL_FROM_NAME
```

### SMS Service Integration
```javascript
// Recommended: Twilio
// Required SMS Templates:
1. Order Confirmation
2. Delivery Notification
3. Payment Received

// Environment Variables Needed:
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
```

### PDF Generation
```javascript
// Recommended Libraries:
- Node.js: PDFKit or Puppeteer
- Python: ReportLab or WeasyPrint

// Invoice PDF Requirements:
- Company logo (ICONIC Magazines)
- Invoice number and date
- Bill to (retailer info)
- Item list with quantities and prices
- Subtotal, tax, total
- Payment terms and due date
- Footer with company contact info
```

## Frontend Design Requirements

### Branding
- **Company Name**: ICONIC Distributions
- **Logo**: ICONIC MAGAZINES logo (serif font, decorative divider)
- **Primary Color**: Blue (#2563eb)
- **Color Scheme**: 
  - Blue for primary actions
  - Green for success/delivered
  - Yellow for warnings/pending
  - Red for errors/low stock
  - Gray for neutral elements

### UI/UX Requirements
- Clean, modern design using Tailwind CSS
- Responsive design (mobile, tablet, desktop)
- Consistent spacing and typography
- Clear visual hierarchy
- Intuitive navigation
- Loading states for async operations
- Error handling with user-friendly messages
- Success notifications for completed actions
- Form validation with inline error messages

### Dashboard Design
**Admin Dashboard:**
- 4 stat cards: Total Revenue, Total Orders, Active Retailers, Total Inventory
- Recent orders table with status
- Low stock alerts
- Quick action buttons

**Retailer Dashboard:**
- 3 stat cards: Total Orders, Total Spent, Available Credit
- Account information display
- Quick order creation button
- Recent order history

## Security Requirements

### Authentication & Authorization
- Secure password hashing (bcrypt, minimum 10 rounds)
- JWT tokens with expiration (1 hour access token, 7 day refresh token)
- HTTP-only cookies for refresh tokens
- Role-based access control (RBAC) middleware
- Protected routes on both backend and frontend
- CSRF protection for state-changing operations

### Data Protection
- Input validation and sanitization on all endpoints
- SQL injection prevention (use parameterized queries/ORM)
- XSS prevention (sanitize user inputs)
- Rate limiting on authentication endpoints
- HTTPS only in production
- Secure storage of API keys (environment variables)

### Stripe Security
- Never expose secret keys to frontend
- Use Stripe's client-side libraries for sensitive operations
- Validate webhook signatures
- Store minimal payment data (use Stripe customer IDs)

## File Structure (Recommended)

### Backend Structure
```
/backend
  /config
    - database.js
    - stripe.js
    - email.js
    - sms.js
  /controllers
    - authController.js
    - userController.js
    - retailerController.js
    - magazineController.js
    - orderController.js
    - invoiceController.js
    - paymentController.js
    - dashboardController.js
  /middleware
    - auth.js
    - rbac.js
    - validation.js
    - errorHandler.js
  /models
    - User.js
    - Retailer.js
    - Magazine.js
    - Order.js
    - OrderItem.js
    - Invoice.js
    - Payment.js
    - Notification.js
  /routes
    - auth.js
    - users.js
    - retailers.js
    - magazines.js
    - orders.js
    - invoices.js
    - payments.js
    - dashboard.js
  /services
    - stripeService.js
    - emailService.js
    - smsService.js
    - pdfService.js
    - exportService.js
  /utils
    - validators.js
    - formatters.js
    - helpers.js
  /templates
    /email
      - orderConfirmation.html
      - invoice.html
      - paymentConfirmation.html
    /pdf
      - invoiceTemplate.js
  - server.js
  - app.js
```

### Frontend Structure
```
/frontend
  /src
    /assets
      - logo.png
      /styles
    /components
      /common
        - Navbar.jsx
        - Sidebar.jsx
        - DataTable.jsx
        - Modal.jsx
        - LoadingSpinner.jsx
        - StatusBadge.jsx
        - StatCard.jsx
      /forms
        - OrderForm.jsx
        - MagazineForm.jsx
        - RetailerForm.jsx
        - LoginForm.jsx
      /orders
        - OrderList.jsx
        - OrderDetail.jsx
      /inventory
        - InventoryList.jsx
        - InventoryForm.jsx
      /retailers
        - RetailerList.jsx
        - RetailerDetail.jsx
    /contexts
      - AuthContext.jsx
      - ThemeContext.jsx
    /hooks
      - useAuth.js
      - useApi.js
      - useToast.js
    /pages
      - Login.jsx
      - Dashboard.jsx
      - Inventory.jsx
      - Retailers.jsx
      - Orders.jsx
      - OrderDetail.jsx
      - CreateOrder.jsx
      - Catalog.jsx (Retailer view)
      - Account.jsx (Retailer view)
      - Invoices.jsx
      - Payments.jsx
    /services
      - api.js
      - auth.js
    /utils
      - formatters.js
      - validators.js
      - constants.js
    - App.jsx
    - main.jsx
    - index.css
```

## Environment Variables Required

```bash
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email (SendGrid example)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@iconicdistributions.com
EMAIL_FROM_NAME=ICONIC Distributions

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890

# Frontend URL (for CORS)
FRONTEND_URL=https://your-replit-app.replit.app

# Admin Setup
ADMIN_EMAIL=admin@iconicdistributions.com
ADMIN_PASSWORD=change-this-on-first-login
```

## Mock Data for Testing

### Initial Admin User
```javascript
{
  username: 'admin',
  password: 'admin', // Hash this!
  role: 'admin',
  email: 'admin@iconic.com'
}
```

### Sample Retailers (3)
```javascript
[
  {
    name: 'Brooklyn Corner Store',
    address: '123 Bedford Ave, Brooklyn, NY',
    contact_person: 'John Smith',
    phone: '718-555-0101',
    email: 'john@brooklyncorner.com',
    credit_limit: 1000
  },
  {
    name: 'Manhattan News & Books',
    address: '456 Broadway, Manhattan, NY',
    contact_person: 'Sarah Johnson',
    phone: '212-555-0202',
    email: 'sarah@manhattannews.com',
    credit_limit: 1500
  },
  {
    name: 'Queens Variety Shop',
    address: '789 Queens Blvd, Queens, NY',
    contact_person: 'Mike Chen',
    phone: '718-555-0303',
    email: 'mike@queensvariety.com',
    credit_limit: 800
  }
]
```

### Sample Retailer User
```javascript
{
  username: 'store1',
  password: '1234', // Hash this!
  role: 'retailer',
  retailer_id: 1, // Brooklyn Corner Store
  email: 'john@brooklyncorner.com'
}
```

### Sample Magazines (10)
```javascript
[
  { title: 'Cosmopolitan', publisher: 'Hearst', price: 4.99, cost: 2.50, stock: 150, category: 'Fashion' },
  { title: 'Vogue', publisher: 'Condé Nast', price: 6.99, cost: 3.50, stock: 120, category: 'Fashion' },
  { title: 'GQ', publisher: 'Condé Nast', price: 5.99, cost: 3.00, stock: 100, category: 'Lifestyle' },
  { title: 'National Geographic', publisher: 'Nat Geo', price: 7.99, cost: 4.00, stock: 80, category: 'Science' },
  { title: 'The New Yorker', publisher: 'Condé Nast', price: 8.99, cost: 4.50, stock: 90, category: 'Culture' },
  { title: 'Wired', publisher: 'Condé Nast', price: 6.99, cost: 3.50, stock: 110, category: 'Technology' },
  { title: 'Brooklyn Magazine', publisher: 'Independent', price: 3.99, cost: 2.00, stock: 200, category: 'Local' },
  { title: 'Artisan Quarterly', publisher: 'Independent', price: 9.99, cost: 5.00, stock: 50, category: 'Art' },
  { title: 'Time', publisher: 'Time USA', price: 5.99, cost: 3.00, stock: 130, category: 'News' },
  { title: 'Rolling Stone', publisher: 'Penske Media', price: 6.99, cost: 3.50, stock: 95, category: 'Music' }
]
```

## Testing Requirements

### Unit Tests
- Test all controller functions
- Test authentication and authorization logic
- Test business logic (order calculations, stock management)
- Test utility functions and validators

### Integration Tests
- Test API endpoints with different user roles
- Test order creation workflow
- Test payment processing
- Test invoice generation
- Test email/SMS sending (mock services)

### E2E Tests (Optional but Recommended)
- Test complete user flows (login -> create order -> checkout)
- Test admin workflows
- Test retailer workflows

## Performance Considerations

### Database
- Index foreign keys
- Index frequently queried fields (username, email, order_number, status)
- Use pagination for list endpoints (default 20 items per page)
- Optimize queries (avoid N+1 problems)

### API
- Implement response caching where appropriate
- Rate limiting on public endpoints
- Compress responses (gzip)
- Use connection pooling for database

### Frontend
- Lazy load routes
- Implement virtual scrolling for long lists
- Debounce search inputs
- Cache API responses (with invalidation)
- Optimize images

## Replit-Specific Considerations

### Database Setup
- Use Replit's PostgreSQL database (built-in support)
- Alternative: SQLite for simpler setup (file-based)
- Connection string available in Replit Secrets

### File Storage
- Store generated PDFs in `/tmp` directory or use Replit's storage
- Consider external storage (AWS S3) for production

### Environment Variables
- Use Replit Secrets for all sensitive data
- Access via `process.env` in Node.js

### Deployment
- Configure `run` command in `.replit` file
- Use Replit's built-in deployment for production
- Configure custom domain if needed

### Always-On
- Consider Replit's Always-On feature for production
- Alternative: Use UptimeRobot for free pings

## Future Enhancements (Not Required Now)

- Real-time order tracking with WebSockets
- Advanced reporting and analytics
- Multi-warehouse support
- Route optimization for deliveries
- Mobile app (React Native)
- Barcode scanning for inventory management
- Automatic reordering from publishers
- Customer portal (end consumers)
- Returns and refunds management
- Subscription/recurring orders for retailers

## Development Phases

### Phase 1: Core Backend (Priority)
1. Database setup and models
2. Authentication system
3. Basic CRUD endpoints
4. Role-based access control

### Phase 2: Business Logic
1. Order creation with inventory management
2. Invoice generation
3. Payment recording
4. Basic email notifications

### Phase 3: Frontend
1. Authentication UI
2. Dashboard (both roles)
3. Inventory management (admin)
4. Order management (both roles)
5. Retailer account view

### Phase 4: Integrations
1. Stripe payment processing
2. PDF invoice generation
3. Email service integration
4. SMS notifications
5. Export functionality

### Phase 5: Polish & Testing
1. Error handling
2. Loading states
3. Form validations
4. Testing
5. Documentation

## Success Criteria

The application is complete when:
- [ ] Both admin and retailer can log in successfully
- [ ] Admin can manage magazines (CRUD operations)
- [ ] Admin can view all retailers and their statistics
- [ ] Admin can create orders for any retailer
- [ ] Retailers can view their own account and order history
- [ ] Retailers can browse catalog and create orders
- [ ] Orders automatically deduct from inventory
- [ ] Invoices are generated as PDFs
- [ ] Stripe payments can be processed
- [ ] Email confirmations are sent for orders
- [ ] SMS notifications work for key events
- [ ] Data can be exported to CSV/Excel
- [ ] All security requirements are met
- [ ] Application is deployed and accessible on Replit

## Additional Notes

- Prioritize clean, maintainable code with clear comments
- Follow REST API best practices
- Use proper error codes (200, 201, 400, 401, 403, 404, 500)
- Include comprehensive API documentation (consider Swagger/OpenAPI)
- Implement proper logging for debugging
- Handle edge cases gracefully
- Provide helpful error messages to users