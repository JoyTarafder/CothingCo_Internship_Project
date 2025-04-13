"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiBox,
  FiChevronDown,
  FiHome,
  FiLogOut,
  FiSettings,
  FiShoppingCart,
  FiTag,
  FiTruck,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Order Management", path: "/orders", icon: FiShoppingCart },
    { name: "Inventory", path: "/inventory", icon: FiBox },
    { name: "Category Management", path: "/categories", icon: FiTag },
    { name: "User Management", path: "/users", icon: FiUsers },
    { name: "Vendor Management", path: "/vendors", icon: FiTruck },
    { name: "Site Management", path: "/site", icon: FiSettings },
  ];

  // Animation variants
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="h-screen w-64 fixed top-0 left-0 overflow-y-auto bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 shadow-xl"
    >
      <div className="px-6 py-8 border-b border-indigo-800/50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Admin Panel
            </h1>
          </div>
        </motion.div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-1.5">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600/90 to-blue-600/80 text-white shadow-lg shadow-indigo-600/20"
                      : "text-indigo-100 hover:bg-indigo-800/40 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 ${
                      isActive ? "text-white" : "text-indigo-300"
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="ml-auto h-2 w-2 rounded-full bg-white"
                    ></motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full px-4 py-6 border-t border-indigo-800/50 bg-indigo-950/40 backdrop-blur-sm">
        <div className="mb-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={toggleAdminDropdown}
            className="flex items-center justify-between w-full px-4 py-3 text-indigo-100 hover:bg-indigo-800/40 hover:text-white rounded-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <FiUser className="h-5 w-5 mr-3 text-blue-400" />
              <span className="font-medium">Admin</span>
            </div>
            <motion.div
              animate={{ rotate: adminDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>

          {adminDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 bg-indigo-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-indigo-700/30"
            >
              <Link
                href="/profile"
                className="flex items-center w-full px-4 py-3.5 text-white hover:bg-gradient-to-r from-blue-600/20 to-indigo-600/20 group transition-all duration-300"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mr-3 shadow-md group-hover:shadow-blue-500/30 transition-all duration-300">
                  <FiUser className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Profile</span>
                  <span className="text-xs text-indigo-300 group-hover:text-indigo-200 transition-colors">
                    View your profile details
                  </span>
                </div>
              </Link>
              <Link
                href="/settings"
                className="flex items-center w-full px-4 py-3 text-indigo-100 hover:bg-indigo-800/40 hover:text-white transition-all duration-300"
              >
                <FiSettings className="h-4 w-4 mr-3 text-indigo-300" />
                <span className="font-medium">Settings</span>
              </Link>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center w-full px-4 py-3 text-indigo-100 hover:bg-indigo-800/40 hover:text-white transition-all duration-300"
              >
                <FiLogOut className="h-4 w-4 mr-3 text-red-400" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
