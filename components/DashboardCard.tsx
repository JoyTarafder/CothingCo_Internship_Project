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
  iconColor = "bg-primary",
  trend,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.12)",
        transition: { duration: 0.2 },
      }}
      className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all duration-300 backdrop-blur-md"
    >
      {/* Card content */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wide">
            {title}
          </p>
          <div className="flex items-center">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 tracking-tight">
              {value}
            </h3>
            {trend && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className={`ml-3 text-sm font-medium flex items-center rounded-full px-2.5 py-1 ${
                  trend.isPositive
                    ? "text-success-dark dark:text-success-light bg-success-light/20 dark:bg-success-dark/20"
                    : "text-danger-dark dark:text-danger-light bg-danger-light/20 dark:bg-danger-dark/20"
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
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`${iconColor} rounded-xl p-3.5 shadow-lg z-10 transform`}
        >
          {icon}
        </motion.div>
      </div>

      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 dark:from-gray-800/20 dark:to-gray-900/10 backdrop-blur-sm z-0"></div>

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
        className={`absolute -right-12 -bottom-12 w-44 h-44 rounded-full ${iconColor.replace(
          "bg-",
          "bg-opacity-20 bg-"
        )} blur-2xl z-0`}
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
        className={`absolute -left-6 -top-6 w-24 h-24 rounded-full ${iconColor.replace(
          "bg-",
          "bg-opacity-15 bg-"
        )} blur-xl z-0`}
      ></motion.div>

      {/* Shimmer effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
          repeatDelay: 5,
        }}
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent z-0"
      />

      {/* Bottom accent line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "40%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`absolute bottom-0 left-0 h-1 ${iconColor.replace(
          "bg-",
          "bg-opacity-90 bg-"
        )} rounded-r-full z-10`}
      />
    </motion.div>
  );
}
