# Modern Admin Panel

A beautiful and responsive admin panel built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern UI with dark/light mode support
- Responsive design for all devices
- Interactive charts and statistics
- Order management system
- Inventory tracking
- User management
- Category management
- Vendor management
- Site settings administration

## Tech Stack

- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Beautiful, animated charts
- **React Icons**: Icon library

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

## Project Structure

```
├── app/                   # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage (Dashboard)
├── components/            # Reusable components
│   ├── Chart.tsx          # Chart component
│   ├── DashboardCard.tsx  # Dashboard stat card
│   ├── Header.tsx         # App header
│   └── Sidebar.tsx        # Navigation sidebar
├── public/                # Static assets
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Customization

You can customize the theme colors in `tailwind.config.ts` file.

## License

MIT

## Author

Joy Tarafder
