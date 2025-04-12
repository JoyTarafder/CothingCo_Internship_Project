"use client";

import Chart from "@/components/Chart";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
  FiClock,
  FiDownload,
  FiFilter,
  FiMapPin,
  FiRefreshCw,
  FiUsers,
} from "react-icons/fi";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("This Month");
  const [isLoading, setIsLoading] = useState(false);

  // Sample visitor data for the chart
  const visitorData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This Week",
        data: [420, 380, 560, 490, 620, 780, 850],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "Last Week",
        data: [380, 340, 480, 430, 550, 680, 720],
        borderColor: "rgb(148, 163, 184)",
        backgroundColor: "rgba(148, 163, 184, 0.2)",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  // Sample conversion data for the funnel chart
  const conversionData = {
    labels: [
      "Visitors",
      "Product Views",
      "Add to Cart",
      "Checkout",
      "Purchase",
    ],
    datasets: [
      {
        label: "Conversion Funnel",
        data: [12500, 7800, 3900, 2400, 1750],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(217, 70, 239, 0.7)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Sample sources data for the pie chart
  const sourcesData = {
    labels: [
      "Direct",
      "Organic Search",
      "Social Media",
      "Referrals",
      "Email",
      "Other",
    ],
    datasets: [
      {
        data: [35, 25, 20, 10, 7, 3],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(251, 191, 36, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(156, 163, 175, 0.7)",
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  // Sample locations data for the map chart
  const locationsData = {
    labels: [
      "United States",
      "United Kingdom",
      "Germany",
      "India",
      "Canada",
      "Australia",
      "Other",
    ],
    datasets: [
      {
        label: "Visitor Distribution",
        data: [45, 15, 10, 8, 7, 5, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(251, 191, 36, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(156, 163, 175, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  // Sample metrics data
  const metrics = [
    {
      title: "Total Visitors",
      value: "32,418",
      change: 12.5,
      isPositive: true,
      icon: <FiUsers className="h-6 w-6 text-blue-500" />,
      color: "blue",
    },
    {
      title: "Average Session",
      value: "3m 42s",
      change: 8.3,
      isPositive: true,
      icon: <FiClock className="h-6 w-6 text-green-500" />,
      color: "green",
    },
    {
      title: "Bounce Rate",
      value: "42.8%",
      change: 3.1,
      isPositive: false,
      icon: <FiArrowDown className="h-6 w-6 text-red-500" />,
      color: "red",
    },
    {
      title: "Conversion Rate",
      value: "5.4%",
      change: 1.2,
      isPositive: true,
      icon: <FiArrowUp className="h-6 w-6 text-purple-500" />,
      color: "purple",
    },
  ];

  // Simulate refreshing data
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  type MetricType = {
    title: string;
    value: string;
    change: number;
    isPositive: boolean;
    icon: React.ReactNode;
    color: string;
  };

  const MetricCard = ({ metric }: { metric: MetricType }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {metric.title}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {metric.value}
            </h3>
          </div>
          <div
            className={`p-3 rounded-full bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}
          >
            {metric.icon}
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              metric.isPositive
                ? "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                : "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            <span
              className={`mr-1 ${
                metric.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {metric.isPositive ? (
                <FiArrowUp size={12} />
              ) : (
                <FiArrowDown size={12} />
              )}
            </span>
            {metric.change}%
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            vs last period
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Analytics Dashboard" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  Analytics Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Get insights into your website performance and user behavior
                </p>
              </div>
              <div className="flex mt-4 md:mt-0 gap-2">
                <div className="relative">
                  <button className="inline-flex items-center text-sm font-medium px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <FiCalendar className="mr-2 h-4 w-4" />
                    {timeRange}
                    <svg
                      className="w-3 h-3 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
                <button
                  onClick={refreshData}
                  className={`inline-flex items-center text-sm font-medium px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  <FiRefreshCw
                    className={`mr-2 h-4 w-4 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  {isLoading ? "Refreshing..." : "Refresh Data"}
                </button>
                <button className="inline-flex items-center text-sm font-medium px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-dark transition-colors">
                  <FiDownload className="mr-2 h-4 w-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Visitor Analytics
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Comparison with previous period
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Daily
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
                      Weekly
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Monthly
                    </button>
                  </div>
                </div>
                <div className="h-[calc(100%-56px)]">
                  <Chart
                    title="Visitor Trends"
                    type="line"
                    data={visitorData}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Traffic Sources
                  </h2>
                  <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="h-[calc(100%-56px)] flex flex-col justify-center">
                  <Chart
                    title="Traffic Sources"
                    type="bar"
                    data={sourcesData}
                    options={{ plugins: { legend: { position: "bottom" } } }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Conversion Funnel
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    User journey from visit to purchase
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  View Details
                </button>
              </div>
              <div className="h-[calc(100%-56px)]">
                <Chart
                  title="Conversion Funnel"
                  type="bar"
                  data={conversionData}
                  options={{ indexAxis: "y" }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Visitor Locations
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Top countries by traffic
                  </p>
                </div>
                <button className="inline-flex items-center text-xs font-medium px-3 py-1.5 bg-primary-50 text-primary rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-800 dark:hover:bg-primary-900/30">
                  <FiMapPin className="mr-1.5 h-3.5 w-3.5" />
                  View Map
                </button>
              </div>

              <div className="space-y-3 mt-6">
                {[
                  "United States",
                  "United Kingdom",
                  "Germany",
                  "India",
                  "Canada",
                  "Australia",
                  "Other",
                ].map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-3 w-3 rounded-full bg-${
                          [
                            "blue",
                            "green",
                            "orange",
                            "yellow",
                            "purple",
                            "gray",
                            "gray",
                          ][index]
                        }-500 mr-3`}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {country}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white mr-3">
                        {[45, 15, 10, 8, 7, 5, 10][index]}%
                      </span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`bg-${
                            [
                              "blue",
                              "green",
                              "orange",
                              "yellow",
                              "purple",
                              "gray",
                              "gray",
                            ][index]
                          }-500 h-2.5 rounded-full`}
                          style={{
                            width: `${[45, 15, 10, 8, 7, 5, 10][index]}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 mb-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Top Pages
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Most visited pages on your website
                </p>
              </div>
              <button className="inline-flex items-center text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                <FiFilter className="mr-1.5 h-3.5 w-3.5" />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Page URL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Page Views
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Unique Visitors
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Avg. Time on Page
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Bounce Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      url: "/",
                      views: 12450,
                      visitors: 8320,
                      time: "2m 35s",
                      bounce: "32%",
                    },
                    {
                      url: "/products",
                      views: 8270,
                      visitors: 6140,
                      time: "3m 12s",
                      bounce: "41%",
                    },
                    {
                      url: "/blog",
                      views: 6580,
                      visitors: 4920,
                      time: "4m 07s",
                      bounce: "38%",
                    },
                    {
                      url: "/contact",
                      views: 3250,
                      visitors: 2780,
                      time: "1m 48s",
                      bounce: "51%",
                    },
                    {
                      url: "/about",
                      views: 2840,
                      visitors: 2150,
                      time: "2m 22s",
                      bounce: "44%",
                    },
                  ].map((page, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-primary dark:text-primary-400">
                        {page.url}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        {page.views.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {page.visitors.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {page.time}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {page.bounce}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
