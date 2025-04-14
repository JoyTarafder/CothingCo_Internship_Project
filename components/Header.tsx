"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiBell,
  FiBox,
  FiHome,
  FiMenu,
  FiSearch,
  FiSettings,
  FiShoppingCart,
  FiSliders,
  FiTag,
  FiTruck,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Order Management", path: "/orders", icon: FiShoppingCart },
    { name: "Inventory", path: "/inventory", icon: FiBox },
    { name: "Category Management", path: "/categories", icon: FiTag },
    { name: "User Management", path: "/users", icon: FiUsers },
    { name: "Vendor Management", path: "/vendors", icon: FiTruck },
    { name: "Site Management", path: "/site", icon: FiSettings },
    { name: "Settings", path: "/settings", icon: FiSliders },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 backdrop-blur-lg bg-white/80 dark:bg-gray-800/90 border-b border-gray-100/50 dark:border-gray-700/30 shadow-sm"
      >
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? (
              <FiX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <FiMenu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center"
          >
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white tracking-tight">
              {title}
            </h1>
          </motion.div>
        </div>

        <div className="hidden md:flex items-center max-w-md w-96 mx-auto">
          <motion.div
            initial={{ width: "100%" }}
            animate={{
              width: searchFocused ? "120%" : "100%",
              scale: searchFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="relative w-full group"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200" />
            </div>
            <input
              type="search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-gray-50/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600/50 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 block w-full pl-10 p-2.5 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Search anything..."
            />
          </motion.div>
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.5,
              }}
              className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"
            />
          </motion.button>

          <ThemeToggle />

          <div className="relative">
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 py-1.5 px-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"
                aria-label="User profile"
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-200"
                >
                  <FiUser className="h-4 w-4" />
                </motion.div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    Admin
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed top-16 left-0 right-0 z-10 bg-white/95 dark:bg-gray-800/95 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-lg overflow-hidden"
          >
            <div className="py-3 px-4">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="search"
                  className="bg-gray-50/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600/50 text-gray-900 dark:text-white text-sm rounded-xl block w-full pl-10 p-2.5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                  placeholder="Search..."
                />
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      variants={menuItemVariants}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Link
                        href={item.path}
                        className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        }`}
                      >
                        <div
                          className={`h-8 w-8 flex items-center justify-center rounded-lg mr-3 transition-colors duration-200 ${
                            isActive
                              ? "bg-indigo-100 dark:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
