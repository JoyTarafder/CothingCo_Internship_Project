"use client";

import DashboardCard from "@/components/DashboardCard";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  FiActivity,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

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
      value: "$48,258.42",
      icon: <FiDollarSign className="h-6 w-6 text-white" />,
      iconColor: "bg-blue-500",
      trend: {
        value: 12.5,
        isPositive: true,
      },
    },
    {
      title: "Total Orders",
      value: "862",
      icon: <FiShoppingBag className="h-6 w-6 text-white" />,
      iconColor: "bg-green-500",
      trend: {
        value: 8.2,
        isPositive: true,
      },
    },
    {
      title: "New Customers",
      value: "124",
      icon: <FiUsers className="h-6 w-6 text-white" />,
      iconColor: "bg-purple-500",
      trend: {
        value: 5.8,
        isPositive: true,
      },
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      icon: <FiActivity className="h-6 w-6 text-white" />,
      iconColor: "bg-amber-500",
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={cardVariants}>
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
