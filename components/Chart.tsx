"use client";

import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type LineChartProps = {
  title: string;
  type: "line";
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
};

type BarChartProps = {
  title: string;
  type: "bar";
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

type ChartProps = LineChartProps | BarChartProps;

export default function Chart({ title, type, data, options }: ChartProps) {
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "year">(
    "month"
  );

  const defaultOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: "500",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1E293B",
        bodyColor: "#334155",
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
          weight: "bold",
        },
        padding: 12,
        borderColor: "rgba(203, 213, 225, 0.5)",
        borderWidth: 1,
        usePointStyle: true,
        boxWidth: 10,
        cornerRadius: 8,
        caretSize: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          color: "#94A3B8",
        },
        border: {
          dash: [5, 5],
        },
      },
      y: {
        grid: {
          color: "rgba(203, 213, 225, 0.2)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          color: "#94A3B8",
          callback: function (value: any) {
            if (typeof value === "number") {
              // For values like 1000, return 1k
              return value >= 1000 ? value / 1000 + "k" : value;
            }
            return value;
          },
        },
        border: {
          dash: [5, 5],
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        fill: true,
      },
      point: {
        radius: 3,
        borderWidth: 2,
        hoverRadius: 6,
        hoverBorderWidth: 3,
      },
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 h-[450px] transition-all hover:shadow-2xl backdrop-blur-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="flex gap-2 bg-gray-100/80 dark:bg-gray-700/80 rounded-xl p-1 backdrop-blur-sm">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeFilter("week")}
            className={`text-xs px-4 py-1.5 rounded-lg transition-colors ${
              timeFilter === "week"
                ? "bg-white dark:bg-indigo-600 text-gray-800 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
            }`}
          >
            Week
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeFilter("month")}
            className={`text-xs px-4 py-1.5 rounded-lg transition-colors ${
              timeFilter === "month"
                ? "bg-white dark:bg-indigo-600 text-gray-800 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
            }`}
          >
            Month
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeFilter("year")}
            className={`text-xs px-4 py-1.5 rounded-lg transition-colors ${
              timeFilter === "year"
                ? "bg-white dark:bg-indigo-600 text-gray-800 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
            }`}
          >
            Year
          </motion.button>
        </div>
      </div>
      <div className="h-[calc(100%-60px)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full"
        >
          {type === "line" ? (
            <Line
              data={data as ChartData<"line">}
              options={mergedOptions as ChartOptions<"line">}
            />
          ) : (
            <Bar
              data={data as ChartData<"bar">}
              options={mergedOptions as ChartOptions<"bar">}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
