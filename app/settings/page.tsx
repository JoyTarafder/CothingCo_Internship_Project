"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiBell,
  FiGlobe,
  FiMoon,
  FiShield,
  FiSliders,
  FiUser,
} from "react-icons/fi";

// Pattern background style
const patternStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

// Settings page component
export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  // Settings tabs
  const tabs = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "appearance", label: "Appearance", icon: FiMoon },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "security", label: "Security", icon: FiShield },
    { id: "language", label: "Language", icon: FiGlobe },
    { id: "privacy", label: "Privacy", icon: FiSliders },
  ];

  // Helper function to show notification
  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  // Save settings handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Settings saved successfully!");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-1"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 backdrop-blur-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700/50">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Settings
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account settings
              </p>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl text-left mb-1 transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600/90 to-blue-600/80 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <tab.icon
                    className={`h-5 w-5 mr-3 ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-3"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 backdrop-blur-md p-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Profile Settings
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </motion.button>
                </div>

                <div className="mb-8">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={patternStyle}
                    ></div>
                    <div className="relative z-10 flex items-center">
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white/30"
                        >
                          A
                        </motion.div>
                        <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg">
                          <FiUser className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold text-white drop-shadow-md">
                          Admin User
                        </h3>
                        <p className="text-indigo-100 text-sm drop-shadow-md">
                          admin@example.com
                        </p>
                        <div className="flex mt-2 space-x-2">
                          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-md backdrop-blur-sm">
                            Administrator
                          </span>
                          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-md backdrop-blur-sm">
                            Full Access
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg backdrop-blur-sm transition-colors mb-2">
                          Change Cover
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Total Orders
                        </p>
                        <span className="p-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md text-xs font-medium">
                          +12%
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        248
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Inventory Items
                        </p>
                        <span className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-md text-xs font-medium">
                          +5%
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        156
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Total Revenue
                        </p>
                        <span className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-xs font-medium">
                          +18%
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ৳24.8K
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          defaultValue="Admin"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          defaultValue="User"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          defaultValue="admin@example.com"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          defaultValue="administrator"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        >
                          <option value="administrator">Administrator</option>
                          <option value="manager">Manager</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="timezone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          defaultValue="est"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        >
                          <option value="est">Eastern Time (ET)</option>
                          <option value="cst">Central Time (CT)</option>
                          <option value="mst">Mountain Time (MT)</option>
                          <option value="pst">Pacific Time (PT)</option>
                          <option value="utc">UTC</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        defaultValue="Administrator with full system access and permissions."
                        className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                      />
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Social Profiles
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="twitter"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                          >
                            Twitter
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                              @
                            </span>
                            <input
                              type="text"
                              id="twitter"
                              placeholder="username"
                              className="w-full pl-8 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="linkedin"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                          >
                            LinkedIn
                          </label>
                          <input
                            type="text"
                            id="linkedin"
                            placeholder="profile URL"
                            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Skills & Expertise
                      </h3>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Administration",
                            "User Management",
                            "Inventory",
                            "E-commerce",
                            "Analytics",
                          ].map((skill, i) => (
                            <div
                              key={i}
                              className="group flex items-center bg-indigo-50 dark:bg-gray-700/50 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 rounded-lg"
                            >
                              <span className="text-sm font-medium">
                                {skill}
                              </span>
                              <button className="ml-2 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex">
                          <input
                            type="text"
                            placeholder="Add a skill..."
                            className="flex-1 px-4 py-2 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-l-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                          />
                          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-xl transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div>
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                          Delete Account
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Appearance Settings
                </h2>

                <div className="mb-8 space-y-6">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                      Theme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative p-4 border-2 border-indigo-500 bg-white dark:bg-gray-900 rounded-xl cursor-pointer shadow-md"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                          </div>
                        </div>
                        <div className="h-12 w-full bg-indigo-100 dark:bg-indigo-900/30 rounded mb-2"></div>
                        <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                        <div className="absolute top-2 right-2 h-4 w-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="text-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Light
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-900 rounded-xl cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                          </div>
                        </div>
                        <div className="h-12 w-full bg-indigo-900/30 rounded mb-2"></div>
                        <div className="h-24 w-full bg-gray-800 rounded"></div>
                        <p className="text-center mt-3 text-sm font-medium text-gray-300">
                          Dark
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="p-4 border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-900 rounded-xl cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                          </div>
                        </div>
                        <div className="h-12 w-full bg-gradient-to-r from-indigo-100 to-indigo-900/30 rounded mb-2"></div>
                        <div className="h-24 w-full bg-gradient-to-r from-gray-100 to-gray-800 rounded"></div>
                        <p className="text-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          System
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                      Color Scheme
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        "indigo",
                        "blue",
                        "purple",
                        "pink",
                        "green",
                        "teal",
                      ].map((color) => (
                        <motion.div
                          key={color}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`h-10 w-10 rounded-full cursor-pointer shadow-lg ${
                            color === "indigo"
                              ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600"
                              : ""
                          } bg-${color}-500`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                  onClick={handleSaveSettings}
                >
                  Save Appearance
                </motion.button>
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Notification Settings
                </h2>

                <div className="space-y-6 mb-8">
                  {[
                    {
                      title: "Email Notifications",
                      description: "Receive email notifications",
                    },
                    {
                      title: "Push Notifications",
                      description: "Receive push notifications",
                    },
                    {
                      title: "Order Updates",
                      description: "Get notified about order status changes",
                    },
                    {
                      title: "User Activity",
                      description: "Get notified about new user registrations",
                    },
                    {
                      title: "System Alerts",
                      description: "Receive important system alerts",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50/70 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div>
                        <h3 className="text-md font-medium text-gray-800 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={index < 3}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                  onClick={handleSaveSettings}
                >
                  Save Notification Settings
                </motion.button>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Security Settings
                </h2>

                <div className="mb-8 space-y-6">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-4">
                      Change Password
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          We'll ask for a verification code in addition to your
                          password
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                  onClick={handleSaveSettings}
                >
                  Update Security Settings
                </motion.button>
              </motion.div>
            )}

            {/* For other tabs, similar content would be added */}
            {activeTab !== "profile" &&
              activeTab !== "appearance" &&
              activeTab !== "notifications" &&
              activeTab !== "security" && (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500 dark:text-gray-400">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                    settings coming soon
                  </p>
                </div>
              )}
          </div>
        </motion.div>
      </div>

      {/* Notification Toast */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-5 right-5 px-4 py-3 rounded-xl bg-green-100 text-green-800 border border-green-200 shadow-lg"
        >
          {notification.message}
        </motion.div>
      )}
    </DashboardLayout>
  );
}
