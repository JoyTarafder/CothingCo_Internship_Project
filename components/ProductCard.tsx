"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiEye, FiHeart, FiShoppingBag } from "react-icons/fi";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  href?: string;
  product?: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
    isOnSale?: boolean;
    href?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  // Support both product object and individual props
  const {
    id: propId,
    name: propName,
    price: propPrice,
    originalPrice: propOriginalPrice,
    image: propImage,
    category: propCategory,
    isNew: propIsNew = false,
    isSale: propIsSale = false,
    href: propHref,
    product,
  } = props;

  // Use product object if provided, otherwise use individual props
  const id = product?.id || propId || "";
  const name = product?.name || propName || "";
  const price = product?.price || propPrice || 0;
  const originalPrice = product?.originalPrice || propOriginalPrice;
  const image = product?.image || propImage || "";
  const category = product?.category || propCategory || "";
  const isNew = product?.isNew || propIsNew;
  const isSale = product?.isOnSale || propIsSale;
  const href = product?.href || propHref || `/shop/products/${id}`;

  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Get cart context
  const { addToCart } = useCart();

  // Get wishlist context
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Check if product is in wishlist
  const isWishlisted = isInWishlist(id);

  // Fallback image for when external images fail to load
  const fallbackImage = "/images/profile-avatar.jpg";

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Toggle wishlist state using context
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        price,
        originalPrice,
        image,
        category,
      });
    }

    // Create a toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 transform transition-all duration-300 translate-y-0";
    toast.style.opacity = "0";

    // Add heart icon
    const icon = document.createElement("div");
    icon.className = isWishlisted
      ? "text-gray-400 flex-shrink-0"
      : "text-red-400 flex-shrink-0";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${
        !isWishlisted ? "currentColor" : "none"
      }" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `;

    // Add message
    const message = document.createElement("div");
    message.textContent = isWishlisted
      ? `${name} removed from wishlist`
      : `${name} added to wishlist`;

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Add the product to cart with default options
    addToCart({
      id,
      name,
      price,
      originalPrice,
      image,
      color: "Default", // Using a default color since we don't have color selection in the card
      size: "M", // Using a default size since we don't have size selection in the card
    });

    // Create a toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-black text-white px-6 py-4 rounded-lg shadow-xl z-50 flex flex-col gap-3 transform transition-all duration-300 translate-y-0 max-w-xs";
    toast.style.opacity = "0";

    // Create header with close button
    const header = document.createElement("div");
    header.className = "flex items-center justify-between";

    // Add success message
    const title = document.createElement("div");
    title.className = "font-medium flex items-center gap-2";
    title.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Added to Cart</span>
    `;

    // Add close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "text-gray-400 hover:text-white transition-colors";
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    closeBtn.onclick = () => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    };

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Add product info
    const content = document.createElement("div");
    content.className = "flex items-center gap-3";

    const productImage = document.createElement("div");
    productImage.className =
      "w-12 h-12 bg-gray-800 rounded-md overflow-hidden flex-shrink-0";
    productImage.innerHTML = `<img src="${image}" alt="${name}" class="w-full h-full object-cover" />`;

    const productInfo = document.createElement("div");
    productInfo.className = "flex-1 min-w-0";
    productInfo.innerHTML = `
      <div class="font-medium text-sm truncate">${name}</div>
      <div class="text-xs text-gray-400">Size: M, Color: Default</div>
    `;

    content.appendChild(productImage);
    content.appendChild(productInfo);

    // Add action buttons
    const actions = document.createElement("div");
    actions.className = "flex items-center justify-between gap-2 mt-2";

    const viewCartBtn = document.createElement("a");
    viewCartBtn.href = "/shop/cart";
    viewCartBtn.className =
      "bg-white text-black text-xs font-medium px-3 py-2 rounded-md hover:bg-yellow-400 transition-colors flex-1 text-center";
    viewCartBtn.textContent = "View Cart";

    const checkoutBtn = document.createElement("a");
    checkoutBtn.href = "/shop/cart/checkout";
    checkoutBtn.className =
      "bg-yellow-400 text-black text-xs font-medium px-3 py-2 rounded-md hover:bg-yellow-500 transition-colors flex-1 text-center";
    checkoutBtn.textContent = "Checkout";

    actions.appendChild(viewCartBtn);
    actions.appendChild(checkoutBtn);

    // Append elements
    toast.appendChild(header);
    toast.appendChild(content);
    toast.appendChild(actions);
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 10);

    // Auto-remove after 5 seconds
    const autoRemoveTimeout = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);

    // Clear timeout if user closes manually
    closeBtn.addEventListener("click", () => {
      clearTimeout(autoRemoveTimeout);
    });
  };

  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 border-0">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-700">
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}

          <Image
            src={imageError ? fallbackImage : image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-black text-white text-xs px-3 py-1.5 font-medium">
                NEW
              </span>
            )}
            {isSale && discount > 0 && (
              <span className="bg-yellow-400 text-black text-xs px-3 py-1.5 font-medium">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-2">
              <button
                onClick={handleAddToWishlist}
                className={`w-10 h-10 rounded-full ${
                  isWishlisted ? "bg-red-500 text-white" : "bg-white text-black"
                } flex items-center justify-center hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 shadow-md`}
                aria-label="Add to wishlist"
              >
                <FiHeart
                  size={18}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </button>
              <Link href={href}>
                <button
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 shadow-md"
                  aria-label="Quick view"
                >
                  <FiEye size={18} />
                </button>
              </Link>
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="Add to cart"
              >
                <FiShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <Link href={href}>
          <div className="p-4 text-center">
            <div className="mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-light">
                {category}
              </span>
            </div>

            <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {name}
            </h3>

            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ৳{price.toLocaleString()}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
