"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist, WishlistItem } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FiHeart, FiShoppingBag, FiTrash2, FiX } from "react-icons/fi";

const WishlistModal: React.FC = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    isWishlistModalOpen,
    closeWishlistModal,
    clearWishlist,
    wishlistCount,
  } = useWishlist();

  const { addToCart } = useCart();

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWishlistModal();
      }
    };

    if (isWishlistModalOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isWishlistModalOpen, closeWishlistModal]);

  // Handle adding item to cart
  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      color: item.color || "#000000",
      size: item.size || "M",
    });

    // Show toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 transform transition-all duration-300 translate-y-0";
    toast.style.opacity = "0";

    // Add shopping bag icon
    const icon = document.createElement("div");
    icon.className = "text-green-400 flex-shrink-0";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    `;

    // Add message
    const message = document.createElement("div");
    message.textContent = `${item.name} added to cart`;

    // Append elements
    toast.appendChild(icon);
    toast.appendChild(message);
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  };

  if (!isWishlistModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeWishlistModal}
      ></div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-lg shadow-xl overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <FiHeart className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                My Wishlist ({wishlistCount})
              </h2>
            </div>
            <button
              onClick={closeWishlistModal}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <FiHeart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Items added to your wishlist will appear here
                </p>
                <Link
                  href="/shop/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  onClick={closeWishlistModal}
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/products/${item.id}`}
                        onClick={closeWishlistModal}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-base font-semibold text-gray-900 dark:text-white">
                          ৳{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                            ৳{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {item.category && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.category}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        title="Add to cart"
                      >
                        <FiShoppingBag className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistItems.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <button
                onClick={clearWishlist}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center"
              >
                <FiTrash2 className="w-4 h-4 mr-1" />
                Clear Wishlist
              </button>
              <button
                onClick={closeWishlistModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
