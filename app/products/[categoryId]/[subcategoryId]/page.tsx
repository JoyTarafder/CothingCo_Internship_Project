"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Category, useCategories } from "@/context/CategoriesContext";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiBox, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

export default function SubcategoryProductsPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.categoryId as string;
  const subcategoryId = params?.subcategoryId as string;

  // Get categories from context
  const { categories } = useCategories();

  // Find the selected category
  const [category, setCategory] = useState<Category | null>(null);
  // State for feedback message
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  // Mock products data
  const [products, setProducts] = useState<
    Array<{
      id: string;
      name: string;
      price: string;
      stock: string;
      image: string;
    }>
  >([]);

  useEffect(() => {
    // Find the category with the matching ID
    const foundCategory = categories.find((cat) => cat.id === categoryId);
    setCategory(foundCategory || null);

    // Generate random number of products (between 0 and 8)
    const productCount = Math.floor(Math.random() * 8);
    const generatedProducts = [];

    for (let i = 0; i < productCount; i++) {
      generatedProducts.push({
        id: `product-${i + 1}`,
        name: `${foundCategory?.name || "Product"} ${subcategoryId}-${i + 1}`,
        price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
        stock: Math.random() > 0.2 ? "In Stock" : "Out of Stock",
        image: getRandomColor(),
      });
    }

    setProducts(generatedProducts);
  }, [categoryId, subcategoryId, categories]);

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Random color generator for product boxes
  function getRandomColor() {
    const colors = [
      "bg-purple-100",
      "bg-indigo-100",
      "bg-pink-100",
      "bg-blue-100",
      "bg-green-100",
    ];
    const darkColors = [
      "dark:bg-purple-900/20",
      "dark:bg-indigo-900/20",
      "dark:bg-pink-900/20",
      "dark:bg-blue-900/20",
      "dark:bg-green-900/20",
    ];
    const index = Math.floor(Math.random() * colors.length);
    return `${colors[index]} ${darkColors[index]}`;
  }

  // Add product handler
  const handleAddProduct = () => {
    const newProduct = {
      id: `product-${products.length + 1}`,
      name: `${category?.name || "Product"} ${subcategoryId}-${
        products.length + 1
      }`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      stock: "In Stock",
      image: getRandomColor(),
    };

    setProducts([...products, newProduct]);
    setFeedback({
      message: "Product added successfully",
      type: "success",
    });
  };

  // Delete product handler
  const handleDeleteProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProducts(products.filter((product) => product.id !== id));
    setFeedback({
      message: "Product deleted successfully",
      type: "success",
    });
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
          title={
            category
              ? `${category.name} - Subcategory ${subcategoryId} Products`
              : "Products Management"
          }
        />
        <main className="p-6 overflow-y-auto">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/categories/${categoryId}`)}
            className="flex items-center px-4 py-2 mb-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
            aria-label="Go back to category"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to {category?.name || "Category"}
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
              <div className="mb-8 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-xl p-6 shadow-md">
                <div className="flex flex-col text-white">
                  <h1 className="text-3xl font-bold">
                    Subcategory {subcategoryId} Products
                  </h1>
                  <p className="mt-2 text-indigo-100">
                    Manage products for {category.name} / Subcategory{" "}
                    {subcategoryId}
                  </p>
                </div>
              </div>

              {/* Products Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-8 bg-purple-600 rounded-lg"></div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Products
                    </h2>
                    <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                      {products.length}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddProduct}
                    className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                    aria-label="Add new product"
                  >
                    <FiPlus className="h-5 w-5 mr-2" />
                    Add Product
                  </motion.button>
                </div>

                {products.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <div
                          className={`h-40 ${product.image} flex items-center justify-center`}
                        >
                          <FiBox className="h-12 w-12 text-purple-400" />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800 dark:text-white">
                              {product.name}
                            </h3>
                            <div className="flex space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors p-1 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                aria-label={`Edit ${product.name}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FiEdit2 className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label={`Delete ${product.name}`}
                                onClick={(e) =>
                                  handleDeleteProduct(product.id, e)
                                }
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {category.name} / Subcategory {subcategoryId}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-purple-600 dark:text-purple-400 font-medium">
                              {product.price}
                            </span>
                            <span
                              className={`${
                                product.stock === "In Stock"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                              } text-xs px-2 py-1 rounded-full`}
                            >
                              {product.stock}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <FiBox className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      No Products Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get started by adding your first product to this
                      subcategory.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddProduct}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                    >
                      <FiPlus className="h-5 w-5 mr-2" />
                      Add Your First Product
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
                  <FiBox className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Category Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The category or subcategory you're looking for doesn't exist or
                has been removed.
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
