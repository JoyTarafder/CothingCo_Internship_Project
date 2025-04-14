"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiEdit2,
  FiEdit3,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const searchParams = useSearchParams();

  // Check for tab parameter in URL when component mounts
  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam && ["overview", "activity", "security"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // User profile data (in a real app, this would come from an API)
  const user = {
    name: "Admin User",
    role: "Administrator",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "January 2024",
    bio: "Experienced administrator with a passion for building efficient systems and streamlining processes.",
    avatar: "A",
    stats: [
      { label: "Orders", value: 248 },
      { label: "Products", value: 156 },
      { label: "Revenue", value: "৳24.8K" },
    ],
    recentActivity: [
      { action: "Added new product", time: "2 hours ago" },
      { action: "Updated inventory count", time: "5 hours ago" },
      { action: "Processed order #1234", time: "Yesterday" },
      { action: "Updated site settings", time: "2 days ago" },
    ],
  };

  return (
    <DashboardLayout title="Profile">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Profile Card */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 backdrop-blur-md">
            <div className="flex flex-col items-center pb-5">
              <div className="relative mb-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg"
                >
                  {user.avatar}
                </motion.div>
                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md">
                  <FiEdit2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                {user.role}
              </p>

              <div className="flex items-center mt-4 text-gray-500 dark:text-gray-400">
                <FiMapPin className="h-4 w-4 mr-1.5" />
                <span className="text-sm">{user.location}</span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4 w-full text-center">
                {user.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiMail className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiPhone className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiCalendar className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm">Joined {user.joinDate}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between space-x-2">
                <Link href="/settings" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-xl transition-colors flex items-center justify-center"
                  >
                    <FiSettings className="h-4 w-4 mr-1.5" />
                    <span className="text-sm font-medium">Settings</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors flex items-center justify-center"
                >
                  <FiEdit3 className="h-4 w-4 mr-1.5" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Tabs Navigation */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden backdrop-blur-md">
            <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {[
                { id: "overview", label: "Overview" },
                { id: "activity", label: "Activity" },
                { id: "security", label: "Security" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className={`px-5 py-4 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            <div className="p-6">
              {/* Overview Tab Content */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Profile Overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        About Me
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {user.bio}
                      </p>

                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <FiBriefcase className="h-5 w-5 text-indigo-500 mr-3" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Administrator
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Full access to all functionality
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {user.recentActivity.map((activity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                              <FiUser className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {activity.action}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.time}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Administration",
                        "User Management",
                        "Inventory Control",
                        "E-commerce",
                        "Dashboard Analytics",
                        "Customer Support",
                      ].map((skill, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -2 }}
                          className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Activity Tab Content */}
              {activeTab === "activity" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Activity Log
                  </h2>

                  <div className="space-y-6">
                    {/* Time-based sections */}
                    {["Today", "Yesterday", "Previous Week"].map(
                      (timeGroup, groupIndex) => (
                        <div key={timeGroup}>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                            {timeGroup}
                          </h3>
                          <div className="space-y-4">
                            {[
                              ...Array(
                                groupIndex === 0 ? 3 : groupIndex === 1 ? 2 : 4
                              ),
                            ].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: groupIndex * 0.1 + i * 0.05,
                                }}
                                className="flex items-start bg-gray-50/70 dark:bg-gray-700/50 p-4 rounded-xl"
                              >
                                <div
                                  className={`h-10 w-10 rounded-lg ${
                                    i % 4 === 0
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                      : i % 4 === 1
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                      : i % 4 === 2
                                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                  } flex items-center justify-center mr-4`}
                                >
                                  {i % 4 === 0 ? (
                                    <FiUser className="h-5 w-5" />
                                  ) : i % 4 === 1 ? (
                                    <FiEdit3 className="h-5 w-5" />
                                  ) : i % 4 === 2 ? (
                                    <FiBriefcase className="h-5 w-5" />
                                  ) : (
                                    <FiSettings className="h-5 w-5" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                                      {i % 4 === 0
                                        ? "Added new user"
                                        : i % 4 === 1
                                        ? "Updated product details"
                                        : i % 4 === 2
                                        ? "Processed order #" +
                                          (1234 + i + groupIndex * 10)
                                        : "Updated system settings"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {groupIndex === 0
                                        ? i + 1 + " hours ago"
                                        : groupIndex === 1
                                        ? "Yesterday, " + (9 + i) + ":00 AM"
                                        : groupIndex + i + " days ago"}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {i % 4 === 0
                                      ? "Added user John Doe to the system with administrator access."
                                      : i % 4 === 1
                                      ? "Updated inventory count and pricing for several products."
                                      : i % 4 === 2
                                      ? "Order was processed successfully and shipped to the customer."
                                      : "Updated email notification settings and security preferences."}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {/* Security Tab Content */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Security Settings
                    </h2>
                    <Link href="/settings?tab=security">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                      >
                        Manage Security
                      </motion.button>
                    </Link>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Security Status
                        </h3>
                      </div>
                      <div className="p-5">
                        <div className="space-y-4">
                          {[
                            {
                              title: "Two-Factor Authentication",
                              status: "Disabled",
                              statusColor:
                                "text-red-500 bg-red-100 dark:bg-red-900/20",
                              description:
                                "Add an extra layer of security to your account",
                            },
                            {
                              title: "Password Strength",
                              status: "Strong",
                              statusColor:
                                "text-green-500 bg-green-100 dark:bg-green-900/20",
                              description:
                                "Your password meets all security requirements",
                            },
                            {
                              title: "Last Password Change",
                              status: "30 days ago",
                              statusColor:
                                "text-amber-500 bg-amber-100 dark:bg-amber-900/20",
                              description:
                                "Regular password changes are recommended",
                            },
                            {
                              title: "Login Activity",
                              status: "Normal",
                              statusColor:
                                "text-green-500 bg-green-100 dark:bg-green-900/20",
                              description:
                                "No suspicious login attempts detected",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <h4 className="text-base font-medium text-gray-800 dark:text-white">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.description}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${item.statusColor}`}
                              >
                                {item.status}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Recent Logins
                        </h3>
                      </div>
                      <div className="p-5">
                        <div className="space-y-4">
                          {[
                            {
                              device: "MacBook Pro",
                              location: "New York, USA",
                              time: "Today, 10:30 AM",
                              current: true,
                            },
                            {
                              device: "iPhone 13",
                              location: "New York, USA",
                              time: "Yesterday, 8:12 PM",
                            },
                            {
                              device: "Windows PC",
                              location: "New York, USA",
                              time: "Apr 10, 2025, 3:45 PM",
                            },
                          ].map((login, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between py-3"
                            >
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                                  <FiUser className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                                      {login.device}
                                    </p>
                                    {login.current && (
                                      <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full">
                                        Current
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {login.location} • {login.time}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
