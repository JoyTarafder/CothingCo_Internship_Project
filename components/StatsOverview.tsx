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
          stroke="${color}" stroke-width="1.5" fill="none" stroke-linecap="round" />
      `;
    }

    return `<path d="M0,${normalizedData[0]} ${normalizedData
      .map((point, i) => `L${i * 3},${point}`)
      .join(" ")}" 
      stroke="${color}" stroke-width="1.5" fill="none" stroke-linecap="round" />`;
  };

  return (
    <div className="h-[30px]">
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 overflow-hidden backdrop-blur-md"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/80 px-4 py-2 rounded-xl shadow-sm backdrop-blur-sm"
        >
          {timeRange}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="relative p-5 bg-gradient-to-br from-white/90 to-white/60 dark:from-gray-800/90 dark:to-gray-900/80 rounded-xl border border-white/20 dark:border-gray-700/30 overflow-hidden group hover:shadow-lg transition-all duration-300 backdrop-blur-md"
          >
            {/* Background decoration - enhanced with animated elements */}
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
              className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10 ${stat.color} blur-2xl`}
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
              className={`absolute -left-5 -top-5 w-20 h-20 rounded-full opacity-5 ${stat.color} blur-xl`}
            ></motion.div>

            <div className="flex items-center justify-between mb-4">
              <div className="z-10">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.title}
                </p>
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight"
                >
                  {stat.value}
                </motion.h3>
              </div>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`p-3 rounded-xl ${stat.color} bg-opacity-10 shadow-md backdrop-blur-sm transform`}
              >
                {stat.icon}
              </motion.div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    stat.change >= 0
                      ? "text-green-600 bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
                      : "text-red-600 bg-red-100/80 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  <motion.svg
                    animate={{
                      y: stat.change >= 0 ? [0, -3, 0] : [0, 3, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2,
                      repeatDelay: 1,
                    }}
                    className={`w-3 h-3 mr-1 ${
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
                  </motion.svg>
                  {Math.abs(stat.change)}%
                </motion.span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">
                  vs last period
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="transform transition-transform duration-300 group-hover:translate-y-[-2px]"
              >
                <Sparkline
                  data={stat.sparklineData}
                  color={stat.color
                    .replace("text-", "var(--tw-")
                    .replace("-500", ")")
                    .replace("text-", "hsl(")}
                  type="area"
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
