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
  iconColor = "bg-gradient-to-br from-blue-500 to-blue-700",
  trend,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="relative overflow-hidden bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-900/90 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/40 p-6 transition-all duration-300 backdrop-blur-md h-full"
    >
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wide uppercase">
            {title}
          </p>
          <div className="flex items-center">
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              {value}
            </h3>
            {trend && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className={`ml-3 text-sm font-bold flex items-center rounded-full px-3 py-1 ${
                  trend.isPositive
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/30"
                    : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30"
                }`}
              >
                <motion.span
                  animate={{
                    y: trend.isPositive ? [0, -4, 0] : [0, 4, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.5,
                    repeatDelay: 1,
                  }}
                  className={`inline-block mr-1 ${
                    trend.isPositive ? "rotate-0" : "rotate-180"
                  }`}
                >
                  ↑
                </motion.span>
                {Math.abs(trend.value)}%
              </motion.span>
            )}
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`${iconColor} rounded-xl p-3.5 shadow-lg z-10 transform`}
        >
          {icon}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full ${iconColor} opacity-20 blur-2xl`}
      ></motion.div>

      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 1,
        }}
        className={`absolute -left-5 -top-5 w-20 h-20 rounded-full ${iconColor} opacity-20 blur-xl`}
      ></motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "40%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`absolute bottom-0 left-0 h-1 ${iconColor} rounded-r-full`}
      />
    </motion.div>
  );
}
