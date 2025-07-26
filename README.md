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

- **Framework**: Next.js 15.3.4 (React 19.1.0)
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.3.0
- **State Management**: React Context API
- **Charts & Visualizations**:
  - Chart.js 4.4.8
  - React Chart.js 2 (5.3.0)
  - Recharts 3.0.0
- **Animations**: Framer Motion 12.19.1
- **Icons**: React Icons 5.5.0
- **PDF Generation**:
  - jsPDF 3.0.1
  - jsPDF-AutoTable 5.0.2
- **Development Tools**:
  - ESLint 9.24.0
  - Turbo 2.0.0
  - Concurrently 8.2.2
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

### Application Access

**Admin Panel:**

- URL: [http://localhost:3000](http://localhost:3000)
- Admin Login: [http://localhost:3000/login](http://localhost:3000/login)
- Email: admin@gmail.com
- Password: Admin1234

**Customer Shop:**

- URL: [http://localhost:3000/shop](http://localhost:3000/shop)
- Customer registration available at `/shop/signup`
- Customer login available via the main navigation
- Guest checkout available without registration

### Shop Demo Features

- Browse products by category (Men, Women, Kids)
- Add products to cart and wishlist
- Complete checkout process with mock payment
- Create customer account and view order history
- Use promo codes: `WELCOME100`, `SAVE20`, `FREESHIP`
- Test responsive design on mobile and tablet devices

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

## Shop Section (/shop)

The `/shop` directory contains a complete e-commerce customer portal with modern shopping functionality:

### Shop Features

- **Homepage & Collections** - Featured products, trending items, and curated collections
- **Product Catalog** - Category-based browsing (Men, Women, Kids) with filtering and search
- **Product Details** - Comprehensive product pages with image galleries, reviews, and specifications
- **Shopping Cart** - Full cart management with quantity updates, promo codes, and price calculations
- **Checkout Process** - Multi-step checkout with shipping, payment, and order review
- **User Account** - Customer profile, order history, wishlist, and address management
- **Authentication** - Login/signup functionality with session management
- **Responsive Design** - Mobile-first design optimized for all devices

### Shop Structure

```
├── app/shop/
│   ├── page.tsx                    # Main shop homepage
│   ├── men/                        # Men's product category
│   │   └── page.tsx               # Men's collection page
│   ├── women/                      # Women's product category
│   │   └── page.tsx               # Women's collection page
│   ├── kids/                       # Kids' product category
│   │   └── page.tsx               # Kids' collection page
│   ├── products/
│   │   └── [id]/                   # Dynamic product detail pages
│   │       └── page.tsx           # Individual product view
│   ├── cart/
│   │   ├── page.tsx               # Shopping cart page
│   │   └── checkout/              # Checkout process
│   │       └── page.tsx          # Checkout form
│   ├── account/
│   │   ├── page.tsx               # Customer account dashboard
│   │   └── orders/                # Order management
│   │       ├── page.tsx          # Order history
│   │       └── [id]/             # Individual order details
│   │           └── page.tsx
│   ├── wishlist/                   # Wishlist management
│   │   └── page.tsx
│   ├── about/                      # Company information
│   ├── contact/                    # Contact page
│   ├── helpcenter/                # Customer support
│   ├── trackorder/                # Order tracking
│   ├── returnexchange/            # Returns & exchanges
│   ├── shippinginfo/              # Shipping information
│   ├── storelocations/            # Store finder
│   ├── careers/                   # Job listings
│   ├── signup/                    # Customer registration
│   ├── terms/                     # Terms & conditions
│   ├── privacy/                   # Privacy policy
│   ├── cookies/                   # Cookie policy
│   ├── accessibility/             # Accessibility statement
│   ├── ourresponsibility/         # Corporate responsibility
│   └── promo-demo/                # Promotional demos
```

### Key Shop Components

- **CustomerLayout**: Main layout wrapper for customer-facing pages with navigation and footer
- **ProductCard**: Reusable product display component with ratings, pricing, and quick actions
- **WishlistModal**: Modal for managing customer wishlist items
- **PromoCodeInput**: Component for applying promotional discounts
- **OptimizedImage**: Performance-optimized image component for product displays

### Shopping Cart Features

- Add/remove products with size and color selection
- Quantity management with stock validation
- Promo code application with discount calculation
- Shipping calculation based on location and method
- Persistent cart state across sessions
- Mobile-optimized interface

### Checkout Process

1. **Shipping Information**: Customer details and delivery address
2. **Payment Method**: Card payments, mobile banking, and cash on delivery
3. **Order Review**: Final order confirmation with terms acceptance
4. **Order Confirmation**: Receipt and tracking information

### Payment & Shipping Options

**Payment Methods:**

- Credit/Debit Cards (Visa, MasterCard, American Express)
- Mobile Banking (bKash, Rocket, Nagad)
- Cash on Delivery (COD) with additional fees
- Digital Wallets and online banking

**Shipping Methods:**

- Standard Shipping (5-7 business days) - Free over ৳2000
- Express Shipping (2-3 business days) - ৳150-250
- Overnight Delivery (Next business day) - ৳500
- Store Pickup (Ready in 2-4 hours) - Free

**Additional Features:**

- Gift wrapping options with custom messages
- Order tracking with real-time updates
- Email notifications for order status changes
- Return and exchange policies with easy process

### Customer Account Features

- Personal profile management
- Order history with detailed tracking
- Wishlist management
- Saved addresses
- Account statistics and lifetime spending
- VIP membership status

### Shop Context Providers

The shop functionality is powered by several React Context providers:

- **CartContext**: Manages shopping cart state, quantities, pricing, and promo codes
- **WishlistContext**: Handles wishlist items and favorites functionality
- **AuthContext**: Customer authentication and session management
- **OrderContext**: Order processing and history management
- **NotificationContext**: Toast notifications for user feedback
- **ThemeContext**: Dark/light mode toggle for customer interface
- **CategoriesContext**: Product categories and classification management

### Shop Navigation & Layout

- **Responsive Header**: Logo, main navigation, search, cart, and user menu
- **Category Navigation**: Dropdown menus for Men's, Women's, and Kids' sections
- **Footer**: Links to support pages, company info, and social media
- **Mobile Navigation**: Collapsible mobile menu with full functionality
- **Search Functionality**: Global search across all products
- **Breadcrumb Navigation**: Clear page hierarchy and navigation paths

### Product Management

- **Dynamic Product Pages**: Individual product pages with full details
- **Image Galleries**: Multiple product images with zoom functionality
- **Product Variants**: Size and color selection with availability status
- **Reviews & Ratings**: Customer feedback and star ratings
- **Related Products**: Recommended items based on category and preferences
- **Stock Management**: Real-time inventory tracking and availability

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
│   └── shop/            # Complete e-commerce customer portal
│   ├── site/             # Site management
│   ├── users/            # User management
│   ├── vendors/          # Vendor management
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable components
│   ├── AddCategoryModal.tsx      # Category creation modal
│   ├── AddProductModal.tsx       # Product creation modal
│   ├── Chart.tsx                 # Data visualization
│   ├── CustomerLayout.tsx        # Customer-facing layout wrapper
│   ├── DashboardCard.tsx         # UI card component
│   ├── DashboardLayout.tsx       # Admin layout structure
│   ├── DashboardStatsGrid.tsx    # Statistics display
│   ├── DeleteConfirmationModal.tsx # Deletion confirmation
│   ├── EditCategoryModal.tsx     # Category editing
│   ├── Header.tsx                # App header with navigation
│   ├── OptimizedImage.tsx        # Optimized image component
│   ├── ProductCard.tsx           # Product display component
│   ├── PromoCodeInput.tsx        # Promo code application
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── StatsOverview.tsx         # Statistical overview display
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   └── WishlistModal.tsx         # Wishlist management modal
├── context/              # React Context providers
│   ├── AuthContext.tsx           # Authentication context
│   ├── CartContext.tsx           # Shopping cart state management
│   ├── CategoriesContext.tsx     # Product categories management
│   ├── NotificationContext.tsx   # Toast notifications
│   ├── OrderContext.tsx          # Order processing and history
│   ├── ThemeContext.tsx          # Theme management context
│   └── WishlistContext.tsx       # Wishlist functionality
├── pages/                # Additional pages (if using Pages Router alongside App Router)
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── banners/          # Banner images
│   └── ...               # Other static assets
├── scripts/              # Build and utility scripts
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
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
