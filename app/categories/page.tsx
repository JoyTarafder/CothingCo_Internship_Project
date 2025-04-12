"use client";

import AddCategoryModal from "@/components/AddCategoryModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

// Category type definition
interface Category {
  id: string;
  name: string;
  subCategories: number;
  products: number;
  variants: number;
}

export default function CategoryManagement() {
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  // State for feedback message
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  // Initial categories data based on the reference image
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Men",
      subCategories: 2,
      products: 4,
      variants: 6,
    },
    {
      id: "2",
      name: "Women",
      subCategories: 1,
      products: 2,
      variants: 4,
    },
    {
      id: "3",
      name: "Kids",
      subCategories: 0,
      products: 0,
      variants: 0,
    },
  ]);

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Function to initiate deletion confirmation
  const confirmDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  // Function to delete a category
  const deleteCategory = () => {
    try {
      if (categoryToDelete) {
        setCategories(
          categories.filter((category) => category.id !== categoryToDelete.id)
        );
        setFeedback({
          message: `${categoryToDelete.name} category deleted successfully`,
          type: "success",
        });
      }
    } catch (error) {
      setFeedback({ message: "Failed to delete category", type: "error" });
      console.error("Error deleting category:", error);
    }
    setCategoryToDelete(null);
  };

  // Function to add a new category
  const addCategory = (categoryName: string) => {
    try {
      // Check if category already exists
      if (
        categories.some(
          (category) =>
            category.name.toLowerCase() === categoryName.toLowerCase()
        )
      ) {
        setFeedback({ message: "Category already exists", type: "error" });
        return;
      }

      const newCategory: Category = {
        id: Date.now().toString(), // Simple unique ID generation
        name: categoryName,
        subCategories: 0,
        products: 0,
        variants: 0,
      };

      setCategories([...categories, newCategory]);
      setFeedback({ message: "Category added successfully", type: "success" });
    } catch (error) {
      setFeedback({ message: "Failed to add category", type: "error" });
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Category Management" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Category Management
              </h1>
            </div>
          </div>

          {/* Feedback Message */}
          {feedback.message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Add New Category Button */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Add new category"
            >
              Add New Category
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {category.name}
                    </h3>
                    <button
                      onClick={() => confirmDeleteCategory(category)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      aria-label={`Delete ${category.name} category`}
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>Sub-Categories: {category.subCategories}</p>
                    <p>Products: {category.products}</p>
                    <p>variants: {category.variants}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Category Modal */}
          <AddCategoryModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={addCategory}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteCategory}
            itemName={categoryToDelete?.name || ""}
          />
        </main>
      </div>
    </div>
  );
}
