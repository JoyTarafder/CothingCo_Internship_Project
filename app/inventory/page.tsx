"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";

type Category = {
  name: string;
  subCategories: number;
  products: number;
  variants: number;
};

export default function InventoryPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      name: "Men",
      subCategories: 2,
      products: 4,
      variants: 6,
    },
    {
      name: "Women",
      subCategories: 1,
      products: 2,
      variants: 4,
    },
    {
      name: "Kids",
      subCategories: 0,
      products: 0,
      variants: 0,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleDeleteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;

    setCategories([
      ...categories,
      {
        name: newCategoryName,
        subCategories: 0,
        products: 0,
        variants: 0,
      },
    ]);

    setNewCategoryName("");
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Inventory" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Inventory
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your product categories and inventory
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Category
            </button>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 relative">
                  <button
                    onClick={() => handleDeleteCategory(index)}
                    className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 transition-colors rounded-md w-7 h-7 flex items-center justify-center"
                    aria-label={`Delete ${category.name} category`}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Sub-Categories:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {category.subCategories}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Products:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {category.products}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        variants:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {category.variants}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Out of Stock Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Out of Stock
              </h2>
            </div>
            <div className="p-5 text-center text-gray-500 dark:text-gray-400">
              No out of Stock Products Found
            </div>
          </div>

          {/* Low on Stock Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Low on Stock
              </h2>
            </div>
            <div className="p-5 text-center text-gray-500 dark:text-gray-400">
              No Low Stock Products Found
            </div>
          </div>

          {/* Add Category Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Add New Category
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter category name"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
