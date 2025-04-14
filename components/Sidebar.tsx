"use client";

import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBarChart2,
  FiBox,
  FiHome,
  FiPower,
  FiSettings,
  FiShoppingCart,
  FiSliders,
  FiTag,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { showNotification } = useNotification();

  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Order Management", path: "/orders", icon: FiShoppingCart },
    { name: "Inventory", path: "/inventory", icon: FiBox },
    { name: "Analytics", path: "/analytics", icon: FiBarChart2 },
    { name: "Category Management", path: "/categories", icon: FiTag },
    { name: "User Management", path: "/users", icon: FiUsers },
    { name: "Vendor Management", path: "/vendors", icon: FiTruck },
    { name: "Site Management", path: "/site", icon: FiSettings },
    { name: "Settings", path: "/settings", icon: FiSliders },
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

  const handleLogout = () => {
    // Show notification before logging out
    if (user) {
      showNotification(
        "logout",
        "Logged out successfully",
        "Your session has been ended securely.",
        user.name
      );
    } else {
      showNotification(
        "logout",
        "Logged out successfully",
        "Your session has been ended securely."
      );
    }

    // Small delay to allow notification to appear before redirecting
    setTimeout(() => {
      logout();
    }, 300);
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="h-screen w-64 fixed top-0 left-0 overflow-y-auto bg-gradient-to-br from-indigo-950 via-purple-900/80 to-indigo-950 shadow-xl border-r border-white/5 backdrop-blur-sm"
    >
      {/* Logo and Brand */}
      <div className="px-5 py-6 border-b border-indigo-800/10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-2 ring-white/10 z-10">
              <span className="text-white font-bold text-lg drop-shadow-md">
                A
              </span>
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-600/20 blur-md z-0"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200 drop-shadow-sm">
              Admin Panel
            </h1>
            {user && (
              <p className="text-[0.65rem] text-indigo-300/80 mt-0.5 flex items-center">
                <span className="text-indigo-200/90">{user.name}</span>
                <span className="mx-1.5 h-0.5 w-0.5 rounded-full bg-indigo-400/60"></span>
                <span className="text-blue-300/90">{user.role}</span>
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Navigation Groups */}
      <div className="mt-5 px-3">
        <div className="mb-2 px-3">
          <h2 className="text-[0.65rem] uppercase tracking-wider font-medium text-indigo-300/80 mb-2 flex items-center">
            <span className="h-px w-3 bg-indigo-400/30 mr-2"></span>
            Main Navigation
            <span className="h-px flex-grow bg-indigo-400/30 ml-2"></span>
          </h2>
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ x: 2, transition: { duration: 0.2 } }}
              >
                <Link
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/70 via-indigo-600/70 to-purple-600/70 text-white shadow-md shadow-indigo-600/20 backdrop-blur-sm"
                      : "text-indigo-100 hover:bg-indigo-800/20 hover:text-white"
                  }`}
                >
                  <div
                    className={`h-7 w-7 flex items-center justify-center rounded-md mr-2.5 transition-colors duration-200 ${
                      isActive ? "bg-white/15" : "bg-indigo-900/40"
                    }`}
                  >
                    <item.icon
                      className={`h-3.5 w-3.5 transition-colors duration-200 ${
                        isActive ? "text-white" : "text-indigo-300"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-sm ${
                      isActive ? "font-medium" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div className="ml-auto flex items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white block"></span>
                        <span className="absolute inset-0 h-1.5 w-1.5 rounded-full bg-white blur-sm"></span>
                      </motion.div>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Footer/Logout */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-950 to-transparent pt-16">
        <div className="px-3 py-4 border-t border-indigo-800/10 backdrop-blur-sm">
          <motion.button
            onClick={handleLogout}
            whileTap={{ scale: 0.98 }}
            whileHover={{ x: 2 }}
            className="flex items-center w-full px-3 py-2 text-indigo-100 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/10 hover:text-white rounded-lg transition-all duration-200 group"
          >
            <div className="relative">
              <div className="h-7 w-7 flex items-center justify-center rounded-md mr-2.5 bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-200">
                <FiPower className="h-3.5 w-3.5 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
              </div>
              <div className="absolute -inset-0.5 rounded-md bg-red-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"></div>
            </div>
            <span className="font-medium text-sm">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
