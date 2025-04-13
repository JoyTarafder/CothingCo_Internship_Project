"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Category type definition
export interface Category {
  id: string;
  name: string;
  subCategories: number;
  products: number;
  variants: number;
}

interface CategoriesContextType {
  categories: Category[];
  addCategory: (categoryName: string) => void;
  deleteCategory: (categoryId: string) => void;
  getCategoryById: (categoryId: string) => Category | undefined;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  // Initial categories data
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

  // Store categories in localStorage
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      const storedCategories = localStorage.getItem("categories");
      if (storedCategories) {
        try {
          setCategories(JSON.parse(storedCategories));
        } catch (error) {
          console.error("Failed to parse stored categories", error);
        }
      }
    }
  }, []);

  // Update localStorage when categories change
  useEffect(() => {
    if (typeof window !== "undefined" && categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  // Add a new category
  const addCategory = (categoryName: string) => {
    // Check if category already exists
    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      )
    ) {
      throw new Error("Category already exists");
    }

    const newCategory: Category = {
      id: Date.now().toString(), // Simple unique ID generation
      name: categoryName,
      subCategories: 0,
      products: 0,
      variants: 0,
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Delete a category
  const deleteCategory = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  // Get a category by ID
  const getCategoryById = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId);
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        getCategoryById,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

// Custom hook to use the categories context
export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}
