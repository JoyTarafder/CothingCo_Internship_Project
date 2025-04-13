"use client";

import Chart from "@/components/Chart";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStatsGrid from "@/components/DashboardStatsGrid";
import StatsOverview from "@/components/StatsOverview";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

export default function Dashboard() {
  // Time filter for sales overview
  const [timeFilter, setTimeFilter] = useState("monthly"); // 'weekly', 'monthly', or 'yearly'

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Sample data for the dashboard
  const [orderChartData, setOrderChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  });

  const [lowStockData, setLowStockData] = useState({
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Stock Level",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(251, 191, 36, 0.5)",
          "rgba(239, 68, 68, 0.5)",
        ],
      },
    ],
  });

  const [salesChartData, setSalesChartData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "2025",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "2024",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(148, 163, 184)",
        backgroundColor: "rgba(148, 163, 184, 0.2)",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  });

  const [ordersStatusData, setOrdersStatusData] = useState({
    labels: ["Delivered", "Processing", "Pending", "Canceled"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(251, 191, 36, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  });

  // Stats data for the StatsOverview component
  const statsData = [
    {
      title: "Total Revenue",
      value: "$48,258.42",
      change: 12.5,
      sparklineData: [5, 10, 8, 15, 12, 18, 16, 20, 18, 24, 20, 25],
      color: "text-blue-500",
      icon: <FiDollarSign className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Total Orders",
      value: "862",
      change: 8.2,
      sparklineData: [10, 12, 15, 14, 18, 16, 19, 18, 22, 20, 24, 22],
      color: "text-green-500",
      icon: <FiShoppingBag className="h-6 w-6 text-green-500" />,
    },
    {
      title: "New Customers",
      value: "124",
      change: 5.8,
      sparklineData: [5, 8, 6, 10, 8, 12, 10, 14, 12, 16, 14, 18],
      color: "text-purple-500",
      icon: <FiUsers className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: -2.4,
      sparklineData: [8, 7, 10, 9, 11, 9, 12, 10, 9, 8, 10, 9],
      color: "text-amber-500",
      icon: <FiActivity className="h-6 w-6 text-amber-500" />,
    },
  ];

  // Simulate data loading
  useEffect(() => {
    // Simulate API call to get data
    setTimeout(() => {
      setOrderChartData({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Orders",
            data: [42, 59, 80, 81, 56, 85],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
          },
        ],
      });

      setLowStockData({
        labels: ["Smartphones", "Laptops", "Accessories", "Tablets"],
        datasets: [
          {
            label: "Stock Level",
            data: [14, 8, 23, 5],
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(251, 191, 36, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
            borderWidth: 0,
          },
        ],
      });

      setSalesChartData({
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "2025",
            data: [
              18500, 22500, 28000, 32000, 38000, 42000, 48000, 52000, 58000,
              62000, 68000, 72000,
            ],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "2024",
            data: [
              10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
              55000, 60000, 65000,
            ],
            borderColor: "rgb(148, 163, 184)",
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            tension: 0.4,
            borderDash: [5, 5],
            fill: true,
          },
        ],
      });

      setOrdersStatusData({
        labels: ["Delivered", "Processing", "Pending", "Canceled"],
        datasets: [
          {
            data: [65, 20, 10, 5],
            backgroundColor: [
              "rgba(16, 185, 129, 0.7)",
              "rgba(59, 130, 246, 0.7)",
              "rgba(251, 191, 36, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
            borderWidth: 0,
            hoverOffset: 5,
          },
        ],
      });
    }, 1000);
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {/* Main Dashboard Content */}
      <div className="space-y-6">
        {/* Stats Grid Cards */}
        <DashboardStatsGrid />

        {/* Sales Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Chart title="Sales Overview" type="line" data={salesChartData} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Chart
              title="Order Status"
              type="bar"
              data={ordersStatusData}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function (value) {
                        return value + "%";
                      },
                    },
                  },
                },
              }}
            />
          </motion.div>
        </div>

        {/* Performance Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <StatsOverview
            title="Performance Metrics"
            stats={statsData}
            timeRange="Last 30 days"
          />
        </motion.div>

        {/* Recent Activity and Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 backdrop-blur-md"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.6 }}
                  className="flex items-start p-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg mr-4 ${
                      i % 4 === 0
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : i % 4 === 1
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : i % 4 === 2
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {i % 4 === 0 ? (
                      <FiShoppingBag className="h-5 w-5" />
                    ) : i % 4 === 1 ? (
                      <FiCheckCircle className="h-5 w-5" />
                    ) : i % 4 === 2 ? (
                      <FiPackage className="h-5 w-5" />
                    ) : (
                      <FiUsers className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {i % 4 === 0
                        ? "New order #1234"
                        : i % 4 === 1
                        ? "Order #1233 completed"
                        : i % 4 === 2
                        ? "New product added"
                        : "New user registered"}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {i % 4 === 0
                          ? "John Doe purchased iPhone 13 Pro"
                          : i % 4 === 1
                          ? "Order delivered successfully"
                          : i % 4 === 2
                          ? "MacBook Pro 16 added to inventory"
                          : "Alex Johnson created an account"}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1 h-3 w-3" />
                        {i % 4 === 0
                          ? "5 mins ago"
                          : i % 4 === 1
                          ? "1 hour ago"
                          : i % 4 === 2
                          ? "3 hours ago"
                          : "5 hours ago"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-2 bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 text-gray-600 dark:text-gray-300 font-medium rounded-xl transition-colors"
            >
              View All Activity
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 backdrop-blur-md"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Low Stock Alert
            </h2>
            <div className="space-y-3">
              {["Tablets", "Smartphones", "Laptops", "Accessories"].map(
                (product, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.7 }}
                    className="flex items-center justify-between p-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full mr-2 ${
                          i === 0
                            ? "bg-red-500"
                            : i === 1
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {product}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-bold ${
                          i === 0
                            ? "text-red-600 dark:text-red-400"
                            : i === 1
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {i === 0 ? "5" : i === 1 ? "8" : i === 2 ? "14" : "23"}{" "}
                        items
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
            >
              Restock Inventory
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-5 right-5 px-4 py-3 rounded-xl shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
