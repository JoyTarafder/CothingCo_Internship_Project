"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <Header title={title} />

        {/* Page content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-full mx-auto p-6 lg:p-8"
          >
            <div className="max-w-7xl mx-auto">{children}</div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
