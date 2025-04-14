"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type StatProps = {
  title: string;
  value: string | number;
  change: number;
  sparklineData: number[];
  color: string;
  icon: ReactNode;
};

type StatsOverviewProps = {
  title: string;
  stats: StatProps[];
  timeRange: string;
};

export default function StatsOverview({
  title,
  stats,
  timeRange,
}: StatsOverviewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <span className="ml-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
            {timeRange}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
            Daily
          </button>
          <button className="px-3 py-1.5 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            Weekly
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-900/90 rounded-xl shadow-lg border border-white/30 dark:border-gray-700/40 p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-3">
              <div
                className={`${stat.color
                  .replace("text-", "bg-")
                  .replace(
                    "-500",
                    "-100"
                  )} dark:bg-opacity-20 p-2 rounded-lg mr-2`}
              >
                {stat.icon}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.title}
              </span>
            </div>

            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <span
                className={`ml-2 text-sm font-semibold flex items-center ${
                  stat.change >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                <span
                  className={`inline-block mr-1 ${
                    stat.change >= 0 ? "rotate-0" : "rotate-180"
                  }`}
                >
                  ↑
                </span>
                {Math.abs(stat.change)}%
              </span>
            </div>

            <div className="mt-3 h-12">
              <SparklineChart data={stat.sparklineData} color={stat.color} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Simple sparkline chart component
function SparklineChart({ data, color }: { data: number[]; color: string }) {
  // Convert color class to actual HEX color
  const getHexColor = (colorClass: string) => {
    type ColorMap = {
      [key: string]: string;
    };

    const colorMap: ColorMap = {
      "text-blue-500": "#3b82f6",
      "text-green-500": "#10b981",
      "text-purple-500": "#8b5cf6",
      "text-amber-500": "#f59e0b",
      "text-red-500": "#ef4444",
      "text-indigo-500": "#6366f1",
    };
    return colorMap[colorClass] || colorMap["text-blue-500"];
  };

  const hexColor = getHexColor(color);
  const highestValue = Math.max(...data);

  // Calculate path for the sparkline
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / highestValue) * 80; // Leave some padding at top and bottom
    return `${x},${y}`;
  });

  const pathData = `M${points.join(" L")}`;

  return (
    <div className="w-full h-full relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Gradient fill */}
        <defs>
          <linearGradient
            id={`sparkline-gradient-${hexColor.replace("#", "")}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={hexColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={hexColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <path
          d={`${pathData} L${100},${100} L${0},${100} Z`}
          fill={`url(#sparkline-gradient-${hexColor.replace("#", "")})`}
          strokeWidth="0"
        />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={hexColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Latest data point */}
        <circle
          cx={points[points.length - 1].split(",")[0]}
          cy={points[points.length - 1].split(",")[1]}
          r="3"
          fill={hexColor}
        />
      </svg>
    </div>
  );
}
