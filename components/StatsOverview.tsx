"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SparklineProps = {
  data: number[];
  color: string;
  height?: number;
  type?: "line" | "bar" | "area";
};

type StatsOverviewProps = {
  title: string;
  stats: Array<{
    title: string;
    value: string | number;
    change: number;
    sparklineData: number[];
    color: string;
    icon: ReactNode;
  }>;
  timeRange?: string;
};

// An enhanced sparkline component
const Sparkline = ({
  data,
  color,
  height = 30,
  type = "line",
}: SparklineProps) => {
  // Find min and max to normalize data
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Normalize data points between 0 and height
  const normalizedData = data.map(
    (value) => height - ((value - min) / range) * height
  );

  // Calculate width based on data points
  const width = data.length * 3;

  // Generate path for sparkline
  const generatePath = () => {
    if (type === "bar") {
      return normalizedData
        .map(
          (point, i) =>
            `<rect x="${i * 3}" y="${point}" width="2" height="${
              height - point
            }" fill="${color}" rx="1"></rect>`
        )
        .join("");
    }

    const points = normalizedData
      .map((point, i) => `${i * 3},${point}`)
      .join(" ");

    if (type === "area") {
      return `
        <path d="M0,${normalizedData[0]} ${normalizedData
        .map((point, i) => `L${i * 3},${point}`)
        .join(" ")} L${width},${
        normalizedData[normalizedData.length - 1]
      } L${width},${height} L0,${height} Z" 
          fill="${color}" fill-opacity="0.15" />
        <path d="M0,${normalizedData[0]} ${normalizedData
        .map((point, i) => `L${i * 3},${point}`)
        .join(" ")}" 
          stroke="${color}" stroke-width="1.5" fill="none" />
      `;
    }

    return `<path d="M0,${normalizedData[0]} ${normalizedData
      .map((point, i) => `L${i * 3},${point}`)
      .join(" ")}" 
      stroke="${color}" stroke-width="1.5" fill="none" />`;
  };

  return (
    <div className="h-[30px]" suppressHydrationWarning>
      <svg width={width} height={height} className="overflow-visible">
        <g dangerouslySetInnerHTML={{ __html: generatePath() }} />
      </svg>
    </div>
  );
};

export default function StatsOverview({
  title,
  stats,
  timeRange = "Last 30 days",
}: StatsOverviewProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 overflow-hidden"
      suppressHydrationWarning
    >
      <div
        className="flex justify-between items-center mb-6"
        suppressHydrationWarning
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <div
          className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-1.5 rounded-full shadow-sm"
          suppressHydrationWarning
        >
          {timeRange}
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        suppressHydrationWarning
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="relative p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            suppressHydrationWarning
          >
            {/* Background decoration - enhanced with multiple elements */}
            <div
              className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10 ${stat.color} blur-xl group-hover:scale-125 transition-transform duration-500`}
              suppressHydrationWarning
            ></div>
            <div
              className={`absolute -left-5 -top-5 w-16 h-16 rounded-full opacity-5 ${stat.color} blur-md group-hover:scale-110 transition-transform duration-500`}
              suppressHydrationWarning
            ></div>

            <div
              className="flex items-center justify-between mb-4"
              suppressHydrationWarning
            >
              <div className="z-10" suppressHydrationWarning>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl ${stat.color} bg-opacity-10 shadow-md backdrop-blur-sm transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110`}
                suppressHydrationWarning
              >
                {stat.icon}
              </div>
            </div>

            <div
              className="flex items-center justify-between"
              suppressHydrationWarning
            >
              <div className="flex items-center" suppressHydrationWarning>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                    stat.change >= 0
                      ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                      : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  <svg
                    className={`w-3 h-3 mr-1 transition-transform duration-300 ${
                      stat.change >= 0 ? "" : "transform rotate-180"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">
                  vs last period
                </span>
              </div>
              <div className="transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                <Sparkline
                  data={stat.sparklineData}
                  color={stat.color
                    .replace("text-", "var(--tw-")
                    .replace("-500", ")")
                    .replace("text-", "hsl(")}
                  type="area"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
