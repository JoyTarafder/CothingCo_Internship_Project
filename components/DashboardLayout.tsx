"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const mainContentVariants = {
    expanded: {
      marginLeft: "16rem", // 64px (w-64)
      width: "calc(100% - 16rem)",
    },
    collapsed: {
      marginLeft: "0rem",
      width: "100%",
    },
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "block" : "hidden md:block"}`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <motion.main
        variants={mainContentVariants}
        initial="expanded"
        animate={sidebarOpen ? "expanded" : "collapsed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        <Header title={title} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6"
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </motion.div>
      </motion.main>
    </div>
  );
}
