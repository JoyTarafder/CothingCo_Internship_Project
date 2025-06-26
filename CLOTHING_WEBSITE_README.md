# ClothingCo - E-commerce Clothing Website

A modern, responsive e-commerce clothing website built with Next.js, featuring both customer-facing store and admin panel functionality.

## 🚀 Features

### Customer-Facing Website (`/shop`)

- **Homepage** (`/shop`) - Hero section, featured products, collections, newsletter signup
- **Product Catalog** - Grid/list view with filtering and sorting
- **Category Pages** - Men's, Women's, Kids' clothing sections
- **Product Details** - Individual product pages with variants, reviews, related products
- **Shopping Cart** (`/shop/cart`) - Add/remove items, quantity management, pricing calculation
- **User Authentication** (`/shop/login`) - Login/register with demo credentials
- **About Page** (`/shop/about`) - Company story, team, values, mission
- **Responsive Design** - Mobile-first approach with dark mode support

### Admin Panel (Existing)

- **Dashboard** - Analytics, charts, stats overview
- **Product Management** - Add/edit products, categories, inventory
- **Order Management** - View and manage customer orders
- **User Management** - Customer and admin user management
- **Analytics** - Sales reports, customer insights
- **Vendor Management** - Supplier and vendor tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.0 with App Router
- **UI**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: React Icons (Feather Icons)
- **Animations**: Framer Motion 12.6.5
- **Charts**: Chart.js, Recharts for admin analytics
- **State Management**: React Context API
- **Authentication**: Custom auth context with localStorage

## 📁 Project Structure

```
AdminPanel/
├── app/
│   ├── shop/                    # Customer-facing website
│   │   ├── about/               # About page
│   │   ├── cart/                # Shopping cart
│   │   ├── login/               # Customer authentication
│   │   ├── men/                 # Men's category
│   │   ├── products/[id]/       # Product detail pages
│   │   └── page.tsx             # Shop homepage
│   ├── dashboard/               # Admin dashboard
│   ├── products/                # Admin product management
│   ├── categories/              # Admin category management
│   ├── orders/                  # Admin order management
│   ├── users/                   # Admin user management
│   └── ...                      # Other admin pages
├── components/
│   ├── CustomerLayout.tsx       # Customer website layout
│   ├── ProductCard.tsx          # Product display component
│   ├── DashboardLayout.tsx      # Admin layout
│   └── ...                      # Other components
├── context/
│   ├── AuthContext.tsx          # Authentication state
│   ├── CategoriesContext.tsx    # Product categories
│   ├── ThemeContext.tsx         # Dark/light mode
│   └── NotificationContext.tsx  # Notifications
└── public/
    ├── images/                  # Product and brand images
    └── ...
```

## 🎨 Design Features

### Customer Website

- **Modern UI/UX** - Clean, professional design with intuitive navigation
- **Product Display** - High-quality product cards with hover effects
- **Responsive Grid** - Adaptive layouts for all screen sizes
- **Interactive Elements** - Smooth animations and transitions
- **Color Variants** - Visual color selection for products
- **Size Selection** - Clear size availability indicators
- **Wishlist** - Save favorite products
- **Quick Actions** - Add to cart, view details, wishlist

### Admin Panel

- **Data Visualization** - Charts and graphs for analytics
- **CRUD Operations** - Full create, read, update, delete functionality
- **Export Features** - PDF and CSV report generation
- **Real-time Stats** - Live dashboard updates
- **Responsive Tables** - Mobile-friendly data display

## 🔧 Key Components

### CustomerLayout

- Sticky navigation header with logo and menu
- Shopping cart counter with badge
- User authentication dropdown
- Theme toggle (dark/light mode)
- Mobile-responsive hamburger menu
- Footer with company info and links

### ProductCard

- Product image with hover effects
- Price display with sale indicators
- Color and size variants
- Rating and review count
- Quick add to cart functionality
- Wishlist toggle button

### Shopping Cart

- Item quantity management
- Price calculations with discounts
- Shipping cost calculation
- Free shipping threshold notifications
- Remove items functionality
- Order summary with totals

## 🌟 Business Features

### E-commerce Functionality

- **Product Catalog** - Organized by categories (Men, Women, Kids)
- **Search & Filter** - Find products by category, price, size, color
- **Shopping Cart** - Persistent cart with quantity management
- **Checkout Process** - Streamlined purchase flow
- **User Accounts** - Customer registration and login
- **Order Tracking** - Order history and status updates

### Admin Management

- **Inventory Control** - Stock levels and product variants
- **Order Processing** - Manage customer orders and fulfillment
- **Customer Management** - User accounts and communication
- **Analytics Dashboard** - Sales metrics and performance tracking
- **Content Management** - Product descriptions, images, categories

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:

- Mobile-first CSS approach
- Collapsible navigation menu
- Adaptive product grids
- Touch-friendly buttons and controls
- Optimized images for different screen sizes

## 🎯 Future Enhancements

### Planned Features

- **Payment Integration** - Stripe/PayPal checkout
- **Search Functionality** - Advanced product search
- **Customer Reviews** - Product rating and review system
- **Wishlist Page** - Dedicated saved items page
- **Order Tracking** - Real-time delivery updates
- **Social Login** - Google/Facebook authentication
- **Email Notifications** - Order confirmations and updates
- **Multi-language** - Internationalization support
- **SEO Optimization** - Meta tags and structured data

### Technical Improvements

- **Database Integration** - Replace mock data with real database
- **API Development** - RESTful API for data management
- **Image Optimization** - CDN and lazy loading
- **Performance Monitoring** - Analytics and error tracking
- **Testing Suite** - Unit and integration tests
- **CI/CD Pipeline** - Automated deployment

## 🔐 Authentication

### Demo Credentials

For testing the admin panel:

- **Email**: admin@gmail.com
- **Password**: Admin1234

### Customer Authentication

- Customer registration and login system
- Social login options (Google, Facebook)
- Password reset functionality
- Session management with localStorage

## 💡 Usage

### Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Admin Access

1. Navigate to `/login` for admin panel
2. Use demo credentials or create new admin account
3. Access dashboard at `/` after login

### Customer Shopping

1. Browse products at `/shop`
2. View categories: `/shop/men`, `/shop/women`, `/shop/kids`
3. Product details: `/shop/products/[id]`
4. Shopping cart: `/shop/cart`
5. Customer login: `/shop/login`

## 🎨 Customization

### Brand Colors

The design uses a blue-based color scheme that can be customized in `tailwind.config.js`:

- **Primary**: Blue (600, 700, etc.)
- **Secondary**: Gray (various shades)
- **Accent**: Yellow for highlights
- **Status**: Green (success), Red (error)

### Typography

- **Font Family**: Inter (clean, modern)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for educational and portfolio purposes. All rights reserved.

---

Built with ❤️ using Next.js and modern web technologies.
