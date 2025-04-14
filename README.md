# Modern Admin Panel

A comprehensive, feature-rich admin panel built with Next.js 15, TypeScript, and Tailwind CSS. This project provides a modern interface for managing products, orders, users, vendors, and more with a beautiful, responsive design.

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

## Requirements

- Node.js 18.0 or later
- npm, yarn, or pnpm

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

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix

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
├── pages/                # Additional pages
├── public/               # Static assets
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tailwind.config.js    # Alternative Tailwind config
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Customization

You can customize the theme colors and other settings:

- Modify `tailwind.config.ts` or `tailwind.config.js` for styling customization
- Edit application settings via the settings interface
- Customize components as needed for your specific use case

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Joy Tarafder
