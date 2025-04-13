"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiBell, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border-b border-white/10 dark:border-gray-700/30 shadow-sm"
    >
      <div className="flex items-center">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="mr-4 md:hidden p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
        >
          {showMobileMenu ? (
            <FiX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <FiMenu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </motion.button>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-xl font-bold text-gray-800 dark:text-white tracking-tight"
        >
          {title}
        </motion.h1>
      </div>

      <div className="hidden md:flex items-center max-w-md w-96 mx-auto">
        <motion.div
          initial={{ width: "100%" }}
          animate={{
            width: searchFocused ? "120%" : "100%",
            scale: searchFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative w-full"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-gray-100/80 dark:bg-gray-700/80 border-0 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/50 block w-full pl-10 p-2.5 transition-all"
            placeholder="Search..."
          />
        </motion.div>
      </div>

      <div className="flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-2 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
        >
          <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
              delay: 0.5,
            }}
            className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
          />
        </motion.button>

        <ThemeToggle />

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 py-1 px-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md"
            >
              <FiUser className="h-4 w-4" />
            </motion.div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
