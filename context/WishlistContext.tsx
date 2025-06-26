"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the structure of a wishlist item
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  color?: string;
  size?: string;
}

// Define the context type
interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
  isWishlistModalOpen: boolean;
  openWishlistModal: () => void;
  closeWishlistModal: () => void;
}

// Create context with default values
const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
  wishlistCount: 0,
  isWishlistModalOpen: false,
  openWishlistModal: () => {},
  closeWishlistModal: () => {},
});

// Custom hook to use the wishlist context
export const useWishlist = () => useContext(WishlistContext);

// Provider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State for wishlist items
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  // State for modal visibility
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        try {
          setWishlistItems(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Failed to parse wishlist from localStorage:", error);
          setWishlistItems([]);
        }
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists in wishlist
      if (prevItems.some((i) => i.id === item.id)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Check if item is in wishlist
  const isInWishlist = (id: string | undefined) => {
    if (!id) return false;
    return wishlistItems.some((item) => item.id === id);
  };

  // Clear all items from wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Open wishlist modal
  const openWishlistModal = () => {
    setIsWishlistModalOpen(true);
  };

  // Close wishlist modal
  const closeWishlistModal = () => {
    setIsWishlistModalOpen(false);
  };

  // Calculate total number of items in wishlist
  const wishlistCount = wishlistItems.length;

  // Context value
  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount,
    isWishlistModalOpen,
    openWishlistModal,
    closeWishlistModal,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
