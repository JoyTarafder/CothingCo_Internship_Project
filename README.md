# Modern Admin Panel

A comprehensive, feature-rich admin panel built with Next.js 15, TypeScript, and Tailwind CSS. This project provides a modern interface for managing products, orders, users, vendors, and more with a beautiful, responsive design.

![screencapture-admin-panel-v-1-netlify-app-2025-04-14-14_28_25](https://github.com/user-attachments/assets/42e8ae63-3b5f-4de6-9131-48fd324c44bb)

## Features

- **Dashboard** - Interactive overview with key metrics and statistics
- **Modern UI** - Clean interface with dark/light mode support
- **Responsive Design** - Works seamlessly on all devices (mobile, tablet, desktop)
- **Interactive Charts** - Visual representation of data using Chart.js and Recharts
- **Order Management** - Track and manage orders with detailed views
- **Inventory Tracking** - Real-time inventory management
- **User Management** - Add, edit, and manage user accounts
- **Category Management** - Organize products with customizable categories
- **Vendor Management** - Track vendor information and performance
- **Product Management** - Add, edit, and organize products with ease
- **Analytics** - Data-driven insights for business decisions
- **Profile Management** - User profile customization
- **Site Settings** - Customize application behavior
- **PDF Export** - Generate reports with jsPDF
- **Authentication** - Secure login system with role-based access control
- **Data Filtering** - Advanced filtering capabilities across all data views
- **Search Functionality** - Global search and context-specific search options
- **Responsive Tables** - Mobile-friendly data tables with sorting features
- **Form Validation** - Client-side validation for all input forms

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3.3
- **State Management**: React Context API
- **Charts & Visualizations**:
  - Chart.js 4.4
  - React Chart.js 2 (5.3)
  - Recharts 2.15
- **Animations**: Framer Motion 12.6
- **Icons**: React Icons 5.5
- **PDF Generation**:
  - jsPDF 3.0
  - jsPDF-AutoTable 5.0
- **Development Tools**:
  - ESLint 9
  - Turbo 2.0
  - Concurrently 8.2
- **Form Handling**: Native React forms with custom validation
- **Data Fetching**: Next.js App Router with React Server Components
- **Authentication**: JWT-based authentication system
- **Optimization**: Next.js Image optimization and code splitting

## Requirements

- Node.js 18.0 or later
- npm, yarn, or pnpm
- Modern web browser with JavaScript enabled
- Minimum screen resolution: 320px (mobile) to 1920px (desktop)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Default Login Credentials

- **Email**: admin@gmail.com
- **Password**: Admin1234

## Installation Troubleshooting

If you encounter any issues during installation, try the following solutions:

1. **Node.js version conflict**: Ensure you're using Node.js 18.0 or later

   ```bash
   node -v
   ```

2. **Dependency resolution issues**: Try clearing npm cache

   ```bash
   npm cache clean --force
   ```

3. **Build errors**: Make sure all dependencies are correctly installed

   ```bash
   rm -rf node_modules
   npm install
   ```

4. **Port conflicts**: If port 3000 is already in use, you can specify a different port
   ```bash
   npm run dev -- -p 3001
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix

## Deployment

### Vercel (Recommended)

The easiest way to deploy this application is using Vercel:

1. Push your repository to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and set up the build configuration

### Docker Deployment

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t admin-panel .

# Run the container
docker run -p 3000:3000 admin-panel
```

### Traditional Hosting

For traditional hosting environments:

1. Build the application

   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm run start
   ```

## Core Components

### Dashboard Components

- **DashboardCard**: Display key metrics in card format
- **StatsOverview**: Component for displaying statistical data
- **Chart**: Reusable chart component with multiple visualization options

### Form Components

- **AddProductModal**: Modal form for adding new products with validation
- **EditCategoryModal**: Modal for editing category information
- **DeleteConfirmationModal**: Confirmation dialog for delete operations

### Layout Components

- **Header**: Main navigation header with user menu and settings
- **Sidebar**: Primary navigation sidebar with collapsible menu
- **DashboardLayout**: Layout wrapper for consistent page structure

### Authentication Flow

- **Login Form**: Email and password authentication
- **Protected Routes**: Route guards for authenticated content
- **Role-Based Access**: Different views based on user role

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── analytics/        # Analytics pages and components
│   ├── categories/       # Category management
│   ├── dashboard/        # Main dashboard
│   ├── inventory/        # Inventory management
│   ├── login/            # Authentication
│   ├── orders/           # Order management
│   ├── products/         # Product management
│   ├── profile/          # User profile settings
│   ├── settings/         # Application settings
│   ├── site/             # Site management
│   ├── users/            # User management
│   ├── vendors/          # Vendor management
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable components
│   ├── AddCategoryModal.tsx  # Category creation modal
│   ├── AddProductModal.tsx   # Product creation modal
│   ├── Chart.tsx         # Data visualization
│   ├── DashboardCard.tsx # UI card component
│   ├── DashboardLayout.tsx   # Layout structure
│   ├── DashboardStatsGrid.tsx # Statistics display
│   ├── DeleteConfirmationModal.tsx # Deletion confirmation
│   ├── EditCategoryModal.tsx # Category editing
│   ├── Header.tsx        # App header with navigation
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── StatsOverview.tsx # Statistical overview display
│   └── ThemeToggle.tsx   # Dark/light mode toggle
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication context
│   ├── ThemeContext.tsx  # Theme management context
│   └── SidebarContext.tsx # Sidebar state management
├── pages/                # Additional pages (if using Pages Router alongside App Router)
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── icons/            # Icon assets
│   └── dashboard-preview.png # Dashboard preview image
├── styles/               # Additional styles (if needed beyond globals.css)
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── api.ts            # API utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── date.ts           # Date formatting utilities
│   └── formatting.ts     # Text/number formatting utilities
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tailwind.config.js    # Alternative Tailwind config
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## API Routes

The admin panel includes the following API endpoints:

- **Authentication**

  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout
  - `GET /api/auth/user` - Get current user

- **Products**

  - `GET /api/products` - List all products
  - `GET /api/products/:id` - Get product details
  - `POST /api/products` - Create new product
  - `PUT /api/products/:id` - Update product
  - `DELETE /api/products/:id` - Delete product

- **Categories**

  - `GET /api/categories` - List all categories
  - `POST /api/categories` - Create new category
  - `PUT /api/categories/:id` - Update category
  - `DELETE /api/categories/:id` - Delete category

- **Orders**

  - `GET /api/orders` - List all orders
  - `GET /api/orders/:id` - Get order details
  - `PUT /api/orders/:id` - Update order status

- **Users**
  - `GET /api/users` - List all users
  - `POST /api/users` - Create new user
  - `PUT /api/users/:id` - Update user
  - `DELETE /api/users/:id` - Delete user

## Customization

You can customize the theme colors and other settings:

- Modify `tailwind.config.ts` or `tailwind.config.js` for styling customization
- Edit application settings via the settings interface
- Customize components as needed for your specific use case

### Theme Customization

The admin panel supports both light and dark themes. You can customize the colors in the Tailwind configuration:

```js
// Example tailwind.config.js modification
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          // Add your custom primary color palette
        },
        secondary: {
          // Custom secondary color palette
        },
      },
    },
  },
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance Optimization

- Next.js Image component for optimized images
- Code splitting and lazy loading for faster initial load
- Server-side rendering for improved SEO
- Static generation for applicable pages
- Optimized fonts with next/font

## License

MIT

## Author

Joy Tarafder

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting solutions
- All open-source contributors whose packages made this project possible
