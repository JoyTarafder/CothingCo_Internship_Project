"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useCategories } from "@/context/CategoriesContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiArchive,
  FiBox,
  FiFolder,
  FiLayers,
  FiPlus,
  FiTag,
  FiTrash2,
  FiX,
} from "react-icons/fi";

export default function InventoryPage() {
  // Use categories from context
  const { categories, deleteCategory } = useCategories();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleDeleteCategory = (categoryId: string) => {
    try {
      const categoryToDelete = categories.find((cat) => cat.id === categoryId);
      deleteCategory(categoryId);
      if (categoryToDelete) {
        setFeedback({
          message: `${categoryToDelete.name} category deleted successfully`,
          type: "success",
        });
      }
    } catch (error) {
      setFeedback({
        message: "Failed to delete category",
        type: "error",
      });
      console.error("Error deleting category:", error);
    }
  };

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Inventory" />
        <main className="p-6 overflow-y-auto">
          {/* Header with gradient background */}
          <div className="mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl p-6 shadow-md">
            <div className="flex flex-col text-white">
              <h1 className="text-3xl font-bold">Inventory Management</h1>
              <p className="mt-2 text-blue-100">
                Track and manage your products and inventory levels
              </p>
            </div>
          </div>

          {/* Feedback Message */}
          <AnimatePresence>
            {feedback.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-6 p-4 rounded-lg shadow-sm ${
                  feedback.type === "success"
                    ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                    : "bg-red-100 text-red-800 border-l-4 border-red-500"
                }`}
              >
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Section Header */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-8 bg-blue-600 rounded-lg"></div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Product Categories
              </h2>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {categories.length}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/categories")}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 ease-in-out"
              aria-label="Manage categories"
            >
              <FiTag className="h-5 w-5 mr-2" />
              Manage Categories
            </motion.button>
          </div>

          {/* Category Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={item}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="border-b border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      {category.name}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      aria-label={`Delete ${category.name} category`}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <FiFolder className="h-6 w-6 text-blue-500 mb-2" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sub-Categories
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {category.subCategories}
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <FiBox className="h-6 w-6 text-indigo-500 mb-2" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Products
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {category.products}
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <FiLayers className="h-6 w-6 text-purple-500 mb-2" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Variants
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {category.variants}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stock Status Section Header */}
          <div className="mb-6 flex items-center space-x-2">
            <div className="w-2 h-8 bg-orange-600 rounded-lg"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Stock Status
            </h2>
          </div>

          {/* Stock Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Out of Stock Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="border-b border-gray-100 dark:border-gray-700 p-4 bg-gradient-to-r from-red-500 to-pink-500">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiAlertCircle className="mr-2 h-5 w-5" />
                  Out of Stock
                </h2>
              </div>
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <FiArchive className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No out of stock products found
                </p>
              </div>
            </motion.div>

            {/* Low on Stock Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="border-b border-gray-100 dark:border-gray-700 p-4 bg-gradient-to-r from-amber-500 to-orange-500">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiAlertCircle className="mr-2 h-5 w-5" />
                  Low on Stock
                </h2>
              </div>
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <FiBox className="h-8 w-8 text-amber-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No low stock products found
                </p>
              </div>
            </motion.div>
          </div>

          {/* Add Category Modal */}
          <AnimatePresence>
            {showAddModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 20, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-500">
                    <h3 className="text-xl font-medium text-white flex items-center">
                      <FiTag className="h-5 w-5 mr-2" />
                      Add New Category
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAddModal(false)}
                      className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Close modal"
                    >
                      <FiX className="h-5 w-5" />
                    </motion.button>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <label
                        htmlFor="categoryName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Category Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="categoryName"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter category name"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                          <FiTag className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors flex items-center"
                      >
                        <FiPlus className="h-4 w-4 mr-1" />
                        Add Category
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
