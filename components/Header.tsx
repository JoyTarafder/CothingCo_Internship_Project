"use client";

import { useState } from "react";
import {
  FiBell,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiUser,
} from "react-icons/fi";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You would implement actual dark mode toggle logic here
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="flex items-center">
        <button className="mr-4 md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <FiMenu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="hidden md:flex items-center max-w-md w-96 mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            className="bg-gray-100 dark:bg-gray-700 border-0 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-primary/50 block w-full pl-10 p-2.5 transition-all"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? (
            <FiSun className="h-5 w-5 text-amber-500" />
          ) : (
            <FiMoon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          )}
        </button>

        <div className="relative">
          <button className="flex items-center space-x-2 py-1 px-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-md">
              <FiUser className="h-4 w-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
