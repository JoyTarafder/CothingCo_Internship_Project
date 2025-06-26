"use client";

import Chart from "@/components/Chart";
import DashboardStatsGrid from "@/components/DashboardStatsGrid";
import { useNotification } from "@/context/NotificationContext";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showNotification } = useNotification();

  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 1500, 2200, 1800, 2500, 2100],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const ordersData = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [25, 35, 20, 15, 5],
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#8b5cf6",
          "#10b981",
          "#ef4444",
        ],
      },
    ],
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const showSuccessNotification = () => {
    showNotification(
      "success",
      "Success!",
      "Operation completed successfully."
    );
  };

  const showErrorNotification = () => {
    showNotification(
      "error",
      "Error!",
      "Something went wrong. Please try again."
    );
  };

  const showInfoNotification = () => {
    showNotification("info", "Information", "Your data has been updated.");
  };

  const showWarningNotification = () => {
    showNotification("warning", "Warning", "This action cannot be undone.");
  };

  const showLoginNotification = () => {
    showNotification(
      "login",
      "User Logged In",
      "Successfully authenticated",
      "John Doe"
    );
  };

  const showLogoutNotification = () => {
    showNotification(
      "logout",
      "User Logged Out",
      "Session terminated",
      "John Doe"
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiRefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Notification Test Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4"
      >
        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Test Notifications
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={showSuccessNotification}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-800/30 dark:text-emerald-500 dark:hover:bg-emerald-800/50"
          >
            <FiCheckCircle className="h-4 w-4 mr-2" />
            Success
          </button>
          <button
            onClick={showErrorNotification}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-800/30 dark:text-red-500 dark:hover:bg-red-800/50"
          >
            <FiAlertCircle className="h-4 w-4 mr-2" />
            Error
          </button>
          <button
            onClick={showInfoNotification}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-500 dark:hover:bg-blue-800/50"
          >
            <FiInfo className="h-4 w-4 mr-2" />
            Info
          </button>
          <button
            onClick={showWarningNotification}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-800/30 dark:text-amber-500 dark:hover:bg-amber-800/50"
          >
            <FiAlertCircle className="h-4 w-4 mr-2" />
            Warning
          </button>
          <button
            onClick={showLoginNotification}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-800/30 dark:text-indigo-500 dark:hover:bg-indigo-800/50"
          >
            <FiLogIn className="h-4 w-4 mr-2" />
            Login
          </button>
          <button
            onClick={showLogoutNotification}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 dark:bg-fuchsia-800/30 dark:text-fuchsia-500 dark:hover:bg-fuchsia-800/50"
          >
            <FiLogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </motion.div>

      <DashboardStatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Trend
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Daily revenue for the past week
              </p>
            </div>
            <div className="flex items-center text-green-600 dark:text-green-400">
              <FiTrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>
          <div className="h-80">
            <Chart type="line" data={revenueData} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order Status
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Distribution of current orders
              </p>
            </div>
          </div>
          <div className="h-80">
            <Chart type="doughnut" data={ordersData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
