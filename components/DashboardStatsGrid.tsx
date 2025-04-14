"use client";

import DashboardCard from "@/components/DashboardCard";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FiActivity, FiShoppingBag, FiUsers } from "react-icons/fi";

// Custom Taka Icon component
const TakaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 6h-7.5c-1.93 0-3.5 1.57-3.5 3.5 0 1.93 1.57 3.5 3.5 3.5h3.5" />
    <path d="M7 14v4" />
    <path d="M11 10l-4 4" />
  </svg>
);

type Stat = {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

export default function DashboardStatsGrid() {
  const stats: Stat[] = [
    {
      title: "Total Revenue",
      value: "৳48,258.42",
      icon: <TakaIcon className="h-6 w-6 text-white" />,
      iconColor: "bg-gradient-to-br from-blue-500 to-blue-700",
      trend: {
        value: 12.5,
        isPositive: true,
      },
    },
    {
      title: "Total Orders",
      value: "862",
      icon: <FiShoppingBag className="h-6 w-6 text-white" />,
      iconColor: "bg-gradient-to-br from-emerald-500 to-emerald-700",
      trend: {
        value: 8.2,
        isPositive: true,
      },
    },
    {
      title: "New Customers",
      value: "124",
      icon: <FiUsers className="h-6 w-6 text-white" />,
      iconColor: "bg-gradient-to-br from-purple-500 to-purple-700",
      trend: {
        value: 5.8,
        isPositive: true,
      },
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      icon: <FiActivity className="h-6 w-6 text-white" />,
      iconColor: "bg-gradient-to-br from-amber-500 to-amber-700",
      trend: {
        value: 2.4,
        isPositive: false,
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          className="transform hover:-translate-y-2 transition-all duration-300"
        >
          <DashboardCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            trend={stat.trend}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
