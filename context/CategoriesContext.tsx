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
  addSubCategory: (categoryId: string) => void;
  updateCategory: (categoryId: string, newName: string) => void;
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
      subCategories: 3,
      products: 12,
      variants: 24,
    },
    {
      id: "2",
      name: "Women",
      subCategories: 5,
      products: 18,
      variants: 32,
    },
    {
      id: "3",
      name: "Kids",
      subCategories: 2,
      products: 8,
      variants: 15,
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

    // Generate random statistics for the new category
    const randomSubcategories = Math.floor(Math.random() * 5);
    const randomProducts = Math.floor(Math.random() * 10) + 1;
    const randomVariants = Math.floor(Math.random() * 20) + randomProducts;

    const newCategory: Category = {
      id: Date.now().toString(), // Simple unique ID generation
      name: categoryName,
      subCategories: randomSubcategories,
      products: randomProducts,
      variants: randomVariants,
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

  // Add subcategory to a category (increments the count)
  const addSubCategory = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subCategories: category.subCategories + 1,
          };
        }
        return category;
      })
    );
  };

  // Update a category
  const updateCategory = (categoryId: string, newName: string) => {
    // Check if another category already exists with this name
    if (
      categories.some(
        (cat) =>
          cat.id !== categoryId &&
          cat.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      throw new Error("Category name already exists");
    }

    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: newName,
          };
        }
        return category;
      })
    );
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        getCategoryById,
        addSubCategory,
        updateCategory,
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
