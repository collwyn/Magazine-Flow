# ICONIC Distributions

## Overview

ICONIC Distributions is a full-stack magazine distribution management system for a NYC-based distributor serving retail locations. The system manages inventory (magazines and display units), orders, retailer accounts, and provides role-based access for administrators and retailers.

## Recent Changes (January 15, 2026)

### Full-Stack Integration Complete
- Converted from prototype with mock data to full PostgreSQL-backed application
- Implemented complete REST API at `/api` prefix for magazines, displays, retailers, and orders
- Integrated TanStack Query for efficient data fetching and caching
- Database seeded with 8 magazines and 6 display fixtures

### Known Issues & Solutions
- **Price Handling**: Prices stored as decimal strings in PostgreSQL, must use `parseFloat(price)` before calling `.toFixed()` in frontend
- **Update Operations**: When updating entities via API, exclude `id` and `createdAt` fields to avoid serialization errors with timestamp columns

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state, React Context for auth
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **Build Tool**: Vite

The frontend follows a pages-based structure with shared components. Key patterns:
- `DashboardLayout` wraps authenticated admin/retailer pages
- Role-based routing separates admin routes (`/admin/*`) from retailer routes
- Custom hooks in `hooks/useApi.ts` abstract API calls with React Query
- API client utilities in `lib/api.ts` handle HTTP requests with proper error handling
- Real-time data editing in admin panels with optimistic updates

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Style**: REST API with JSON responses
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Development**: tsx for TypeScript execution, Vite dev server integration

The backend uses a simple layered architecture:
- `routes.ts`: REST API endpoint definitions with validation and error handling
- `storage.ts`: PostgreSQL data access layer implementing `IStorage` interface using Drizzle ORM
- `db.ts`: Database connection using node-postgres Pool
- `seed.ts`: Database seeding script for initial data (run with `tsx server/seed.ts`)

### Data Storage
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` - shared between frontend and backend
- **Migrations**: Drizzle Kit with `drizzle-kit push` command

Core entities:
- **Users**: Authentication with admin/retailer roles, linked to retailer accounts
- **Retailers**: Store accounts with credit limits, balances, and contact information
- **Magazines**: Inventory with SKU, stock tracking, pricing (decimal), cover images, descriptions
- **Displays**: Physical display units with types (Floor Stand, Wall Mount, Counter), pricing, stock status
- **Orders**: Purchase orders with order numbers, status tracking, payment status
- **OrderItems**: Line items linking orders to magazines with quantities and unit prices

### Authentication
Currently uses mock authentication via React Context. The system supports:
- Admin role: Full system access
- Retailer role: Limited to own account data

Note: JWT authentication is planned but not yet implemented.

## External Dependencies

### Database
- PostgreSQL database required
- Connection via `DATABASE_URL` environment variable
- Uses `connect-pg-simple` for session storage capability

### UI Components
- shadcn/ui with Radix UI primitives
- Lucide React for icons
- Embla Carousel for carousels
- React Day Picker for calendar components

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
- Custom `vite-plugin-meta-images`: OpenGraph image handling for Replit deployments

### Build & Development
- esbuild for server bundling (production)
- Vite for client bundling and dev server
- TypeScript with strict mode enabled