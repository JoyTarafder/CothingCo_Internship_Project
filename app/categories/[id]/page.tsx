"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Category, useCategories } from "@/context/CategoriesContext";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiBox, FiFolder, FiLayers, FiPlus } from "react-icons/fi";

export default function CategoryDetail() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  // Get categories from context
  const { categories, addSubCategory } = useCategories();

  // Find the selected category
  const [category, setCategory] = useState<Category | null>(null);
  // State for feedback message
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    // Find the category with the matching ID
    const foundCategory = categories.find((cat) => cat.id === categoryId);
    setCategory(foundCategory || null);
  }, [categoryId, categories]);

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Handle adding a subcategory
  const handleAddSubCategory = () => {
    if (category) {
      addSubCategory(category.id);
      setFeedback({
        message: `Added new subcategory to ${category.name}`,
        type: "success",
      });
    }
  };

  // Handle navigating to products page for a subcategory
  const navigateToProductsPage = (subcategoryIndex: number) => {
    if (category) {
      // Use both category ID and subcategory index in the URL
      router.push(`/products/${categoryId}/${subcategoryIndex + 1}`);
    }
  };

  // Animation variants
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
        <Header
          title={category ? `${category.name} Category` : "Category Details"}
        />
        <main className="p-6 overflow-y-auto">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 mb-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
            aria-label="Go back to categories"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </motion.button>

          {/* Feedback Message */}
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

          {category ? (
            <>
              {/* Header with gradient background */}
              <div className="mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 shadow-md">
                <div className="flex flex-col text-white">
                  <h1 className="text-3xl font-bold">{category.name}</h1>
                  <p className="mt-2 text-indigo-100">
                    View and manage items in this category
                  </p>
                </div>
              </div>

              {/* Category Stats */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  variants={item}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mr-4">
                      <FiFolder className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sub-Categories
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.subCategories}
                      </h3>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-4">
                      <FiBox className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Products
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.products}
                      </h3>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mr-4">
                      <FiLayers className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Variants
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.variants}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sub-Categories Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-8 bg-indigo-600 rounded-lg"></div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Sub-Categories
                    </h2>
                    <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                      {category.subCategories}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddSubCategory}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                    aria-label="Add new sub-category"
                  >
                    <FiPlus className="h-5 w-5 mr-2" />
                    Add Sub-Category
                  </motion.button>
                </div>

                {/* Display sub-categories or placeholder message */}
                {category.subCategories > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(category.subCategories)].map((_, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        }}
                        onClick={() => navigateToProductsPage(index)}
                      >
                        <div className="border-b border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                              Sub-Category {index + 1}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                            <FiFolder className="h-4 w-4 mr-2 text-indigo-500" />
                            <span className="text-sm">
                              {category.name} collection
                            </span>
                          </div>
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 text-center">
                            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                              {Math.floor(Math.random() * 10) + 1} Products
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                        <FiFolder className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      No Sub-Categories Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get started by adding your first sub-category to organize
                      your products better.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddSubCategory}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                    >
                      <FiPlus className="h-5 w-5 mr-2" />
                      Add Your First Sub-Category
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            // Display message if category is not found
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center shadow-md"
            >
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <FiFolder className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Category Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The category you're looking for doesn't exist or has been
                removed.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/categories")}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 ease-in-out"
              >
                <FiArrowLeft className="h-5 w-5 mr-2" />
                Back to Categories
              </motion.button>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
