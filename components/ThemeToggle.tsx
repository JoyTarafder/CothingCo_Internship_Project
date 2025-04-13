"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>; // Placeholder with the same size
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 overflow-hidden"
      whileTap={{ scale: 0.9 }}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiSun className="h-5 w-5 text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiMoon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </motion.div>

      {/* Invisible element to maintain button size */}
      <div className="opacity-0">
        <FiSun className="h-5 w-5" />
      </div>
    </motion.button>
  );
}
