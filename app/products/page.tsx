"use client";

import AddProductModal from "@/components/AddProductModal";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  FiEdit,
  FiEye,
  FiFilter,
  FiGrid,
  FiList,
  FiPlus,
  FiSearch,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
};

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Sample data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PRD-001",
      name: "Premium Headphones",
      category: "Electronics",
      price: 199.99,
      stock: 45,
      rating: 4.8,
      image: "/images/products/1-classic-cotton-tshirt.jpg",
    },
    {
      id: "PRD-002",
      name: "Fitness Smartwatch",
      category: "Wearables",
      price: 149.5,
      stock: 32,
      rating: 4.5,
      image: "/images/products/4-premium-hoodie.jpg",
    },
    {
      id: "PRD-003",
      name: "Wireless Earbuds",
      category: "Electronics",
      price: 89.99,
      stock: 18,
      rating: 4.7,
      image: "/images/products/5-slim-fit-jeans.jpg",
    },
    {
      id: "PRD-004",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 79.95,
      stock: 23,
      rating: 4.4,
      image: "/images/products/6-floral-print-blouse.jpg",
    },
    {
      id: "PRD-005",
      name: "Yoga Mat Premium",
      category: "Fitness",
      price: 45.0,
      stock: 56,
      rating: 4.9,
      image: "/images/products/7-kids-graphic-tshirt.jpg",
    },
    {
      id: "PRD-006",
      name: "Stainless Water Bottle",
      category: "Accessories",
      price: 24.99,
      stock: 120,
      rating: 4.6,
      image: "/images/products/8-oversized-sweater.jpg",
    },
  ]);

  const getStockStatusClass = (stock: number) => {
    if (stock > 50) return "text-green-500 bg-green-50 border-green-200";
    if (stock > 20) return "text-blue-500 bg-blue-50 border-blue-200";
    if (stock > 0) return "text-amber-500 bg-amber-50 border-amber-200";
    return "text-red-500 bg-red-50 border-red-200";
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FiStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FiStar
            key={i}
            className="w-4 h-4 text-amber-400 fill-amber-400 opacity-50"
          />
        );
      } else {
        stars.push(<FiStar key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddProduct = (productData: any) => {
    // Create a new product with the form data
    const newProduct = {
      id: `PRD-${Math.floor(Math.random() * 1000)}`,
      name: productData.title,
      category: productData.materials,
      price: parseFloat(productData.retailPrice) || 0,
      stock: parseInt(productData.quantity) || 0,
      rating: 4.0,
      image: "/images/products/1-classic-cotton-tshirt.jpg",
    };

    setProducts([...products, newProduct]);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Product Management" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your product inventory and listings
            </p>
          </div>

          {/* Add Product Modal */}
          <AddProductModal
            isOpen={isAddProductModalOpen}
            onClose={() => setIsAddProductModalOpen(false)}
            onAdd={handleAddProduct}
          />

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-auto flex items-center">
                  <div className="relative flex-1 md:w-80">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="search"
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-primary/50 block w-full pl-10 p-2.5 transition-all"
                      placeholder="Search products..."
                    />
                  </div>
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className={`ml-2 p-2.5 flex items-center text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                      filterOpen
                        ? "bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                        : ""
                    }`}
                  >
                    <FiFilter className="w-4 h-4" />
                  </button>
                  <div className="ml-2 p-1 flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md ${
                        viewMode === "grid"
                          ? "bg-white dark:bg-gray-600 shadow-sm"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <FiGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-md ${
                        viewMode === "list"
                          ? "bg-white dark:bg-gray-600 shadow-sm"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <FiList className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2 w-full md:w-auto">
                  <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Accessories">Accessories</option>
                  </select>

                  <button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="admin-button flex items-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-dark transition-all"
                  >
                    <FiPlus className="mr-2" />
                    Add Product
                  </button>
                </div>
              </div>

              {filterOpen && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2"
                      />
                      <span className="text-gray-500 dark:text-gray-400">
                        -
                      </span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Stock Status
                    </label>
                    <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2">
                      <option value="">Any</option>
                      <option value="instock">In Stock</option>
                      <option value="low">Low Stock</option>
                      <option value="out">Out of Stock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sort By
                    </label>
                    <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2">
                      <option value="newest">Newest First</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                  <div className="md:col-span-3 flex justify-end">
                    <button className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors mr-2">
                      Reset Filters
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {viewMode === "grid" ? (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <span className="text-primary dark:text-primary-dark font-bold">
                          ৳{product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {product.category}
                      </p>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-2">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getStockStatusClass(
                            product.stock
                          )}`}
                        >
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-1.5 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                #{product.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          ৳{product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getStockStatusClass(
                              product.stock
                            )}`}
                          >
                            {product.stock > 0 ? product.stock : "Out of stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex mr-1">
                              {renderStars(product.rating)}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({product.rating})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                              <FiEye className="w-5 h-5" />
                            </button>
                            <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                              <FiEdit className="w-5 h-5" />
                            </button>
                            <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">6</span> of{" "}
                  <span className="font-medium">6</span> products
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                    1
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
