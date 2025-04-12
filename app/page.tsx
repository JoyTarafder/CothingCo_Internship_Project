"use client";

import Chart from "@/components/Chart";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatsOverview from "@/components/StatsOverview";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

export default function Dashboard() {
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
        labels: [
          "Premium Headphones",
          "Fitness Smartwatch",
          "Wireless Earbuds",
          "Bluetooth Speaker",
        ],
        datasets: [
          {
            label: "Stock Level",
            data: [12, 8, 5, 3],
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(251, 191, 36, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
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
              18500, 22000, 19500, 24000, 20500, 25000, 23000, 26500, 24000,
              28000, 26500, 30000,
            ],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.4,
          },
          {
            label: "2024",
            data: [
              15000, 18000, 16500, 21000, 18000, 22000, 20000, 23500, 21000,
              25000, 23000, 27000,
            ],
            borderColor: "rgb(148, 163, 184)",
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            tension: 0.4,
            borderDash: [5, 5],
          },
        ],
      });

      setOrdersStatusData({
        labels: ["Delivered", "Processing", "Pending", "Canceled"],
        datasets: [
          {
            data: [68, 25, 15, 8],
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Dashboard" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  Welcome back, Admin!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Here's what's happening with your store today.
                </p>
              </div>
              <div className="flex mt-4 md:mt-0 gap-2">
                <button className="inline-flex items-center text-sm font-medium px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <FiCalendar className="mr-2 h-4 w-4" />
                  Apr 1 - Apr 30, 2025
                </button>
                <button className="inline-flex items-center text-sm font-medium px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-dark transition-colors">
                  <FiBarChart2 className="mr-2 h-4 w-4" />
                  Generate Report
                </button>
              </div>
            </div>

            <StatsOverview title="Performance Overview" stats={statsData} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Sales Overview
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Comparison between current and previous year
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Weekly
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
                      Monthly
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Yearly
                    </button>
                  </div>
                </div>
                <div className="h-[calc(100%-56px)]">
                  <Chart
                    title="Sales Trends"
                    type="line"
                    data={salesChartData}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Order Status
                  </h2>
                  <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="h-[calc(100%-56px)] flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <Chart
                      title="Order Status"
                      type="bar"
                      data={ordersStatusData}
                      options={{ indexAxis: "y" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FiCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Delivered
                        </span>
                      </div>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        68
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FiClock className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Processing
                        </span>
                      </div>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        25
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Recent Orders
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Last 5 orders placed
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        #ORD-0103
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        John Doe
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Apr 12, 2025
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        $125.00
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        #ORD-0102
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Jane Smith
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Apr 11, 2025
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        $85.50
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        #ORD-0101
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Mike Johnson
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Apr 10, 2025
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        $220.75
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Low Stock Items
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Products that need reordering
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Premium Headphones",
                  "Fitness Smartwatch",
                  "Wireless Earbuds",
                  "Bluetooth Speaker",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                        <FiPackage className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {item}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {["12", "8", "5", "3"][index]} items left
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="mt-8 py-4 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
            <p className="mb-1">Developed by Joy Tarafder</p>
            <p className="text-xs">© 2025 Admin Panel. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
