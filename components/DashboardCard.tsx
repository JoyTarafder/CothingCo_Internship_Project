"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

export default function DashboardCard({
  title,
  value,
  icon,
  iconColor = "bg-blue-500",
  trend,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
    >
      <div className="flex justify-between items-start">
        <div className="z-10">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-center">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {value}
            </h3>
            {trend && (
              <span
                className={`ml-2 text-sm font-bold flex items-center ${
                  trend.isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                <span
                  className={`inline-block mr-1 transition-transform duration-300 ${
                    trend.isPositive ? "rotate-0" : "rotate-180"
                  }`}
                >
                  ↑
                </span>
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
        <div
          className={`${iconColor} rounded-xl p-3 shadow-md z-10 transform transition-transform duration-300 hover:rotate-3 hover:scale-110`}
        >
          {icon}
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10 ${iconColor} blur-xl`}
      ></div>
      <div
        className={`absolute -left-5 -top-5 w-16 h-16 rounded-full opacity-5 ${iconColor} blur-md`}
      ></div>
    </motion.div>
  );
}
