"use client";

import CustomerLayout from "@/components/CustomerLayout";
import PromoCodeInput from "@/components/PromoCodeInput";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowLeft,
  FiChevronRight,
  FiCreditCard,
  FiLock,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTag,
  FiTrash2,
  FiTruck,
  FiX,
} from "react-icons/fi";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    originalSubtotal,
    savings,
    shipping,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
    promoDiscount,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleUpdateQuantity = (
    id: string,
    color: string,
    size: string,
    newQuantity: number
  ) => {
    updateQuantity(id, color, size, newQuantity);
  };

  const handleRemoveItem = (id: string, color: string, size: string) => {
    removeFromCart(id, color, size);
  };

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);
    setPromoError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = applyPromoCode(promoInput.trim());

    if (success) {
      setPromoInput("");
      setPromoError("");
    } else {
      setPromoError("Invalid promo code or minimum amount not met");
    }

    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoInput("");
    setPromoError("");
  };

  if (cartItems.length === 0) {
    return (
      <CustomerLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="w-28 h-28 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg float-animation">
              <FiShoppingBag className="w-14 h-14 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Explore
              our collections and find something you'll love.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 add-to-cart-btn"
            >
              <FiArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-10">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/shop"
                  className="text-sm font-light text-gray-600 dark:text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FiChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                    Shopping Cart
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
            Your Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your shopping bag
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider text-xs text-gray-500 dark:text-gray-400 font-medium">
                <div className="col-span-6 md:col-span-6">Product</div>
                <div className="col-span-2 md:col-span-2 text-center">
                  Price
                </div>
                <div className="col-span-2 md:col-span-2 text-center">
                  Quantity
                </div>
                <div className="col-span-2 md:col-span-2 text-right">Total</div>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className={`grid grid-cols-12 gap-4 p-6 ${
                    index !== cartItems.length - 1
                      ? "border-b border-gray-200 dark:border-gray-700"
                      : ""
                  }`}
                >
                  {/* Product Image & Details */}
                  <div className="col-span-12 md:col-span-6 flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover hover-opacity"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span className="inline-flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: item.color.toLowerCase(),
                            }}
                          ></span>
                          {item.color}
                        </span>
                        <span>Size: {item.size}</span>
                      </div>

                      {/* Mobile Price */}
                      <div className="md:hidden flex items-center gap-2 mt-2">
                        <span className="text-base font-medium text-gray-900 dark:text-white">
                          ৳{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ৳{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Remove button - mobile only */}
                      <button
                        onClick={() =>
                          handleRemoveItem(item.id, item.color, item.size)
                        }
                        className="md:hidden mt-3 text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        <FiTrash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price - desktop */}
                  <div className="hidden md:flex col-span-2 items-center justify-center">
                    <div className="text-center">
                      <span className="text-base font-medium text-gray-900 dark:text-white block">
                        ৳{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ৳{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-8 md:col-span-2 flex items-center justify-start md:justify-center">
                    <div className="inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        disabled={item.quantity >= item.maxQuantity}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove - desktop */}
                  <div className="col-span-4 md:col-span-2 flex items-center justify-end">
                    <div className="text-right">
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() =>
                          handleRemoveItem(item.id, item.color, item.size)
                        }
                        className="hidden md:inline-flex mt-2 text-xs text-gray-500 hover:text-red-500 transition-colors items-center gap-1"
                      >
                        <FiTrash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">
                        Savings
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        -৳{savings.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600 dark:text-green-400">
                          Free
                        </span>
                      ) : (
                        `৳${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  {/* Promo Code Section */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {!promoCode ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <FiTag className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Promo Code
                          </span>
                        </div>
                        <PromoCodeInput
                          onApply={(code, discount) => {
                            if (code && discount) {
                              applyPromoCode(code);
                            } else if (!code) {
                              removePromoCode();
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2 promo-discount-appear">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FiTag className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Promo Code Applied
                            </span>
                          </div>
                          <button
                            onClick={handleRemovePromo}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between promo-badge">
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            {promoCode.code} (
                            {promoCode.type === "percentage"
                              ? `${promoCode.discount}%`
                              : `৳${promoCode.discount}`}{" "}
                            off)
                          </span>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            -৳{promoDiscount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <Link
                  href="/shop/cart/checkout"
                  className="w-full bg-black text-white py-4 rounded-md flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 add-to-cart-btn"
                >
                  <FiLock className="w-4 h-4" />
                  Proceed to Checkout
                </Link>

                {/* Available Promo Codes */}
                {/* {!promoCode && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Available Promo Codes
                    </h3>
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between promo-code-item p-2 rounded">
                        <span>SAVE10 - 10% off orders over ৳500</span>
                        <button
                          onClick={() => setPromoInput("SAVE10")}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 promo-apply-btn"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between promo-code-item p-2 rounded">
                        <span>SAVE20 - 20% off orders over ৳1000</span>
                        <button
                          onClick={() => setPromoInput("SAVE20")}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 promo-apply-btn"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between promo-code-item p-2 rounded">
                        <span>NEWUSER - 15% off orders over ৳300</span>
                        <button
                          onClick={() => setPromoInput("NEWUSER")}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 promo-apply-btn"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between promo-code-item p-2 rounded">
                        <span>WELCOME100 - ৳100 off orders over ৳800</span>
                        <button
                          onClick={() => setPromoInput("WELCOME100")}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 promo-apply-btn"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )} */}

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FiTruck className="w-4 h-4" />
                    <span>Free shipping on orders over ৳2000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FiCreditCard className="w-4 h-4" />
                    <span>Secure payment processing</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="/shop"
                    className="w-full text-center block text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
