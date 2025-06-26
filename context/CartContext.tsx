"use client";

import { useNotification } from "@/context/NotificationContext";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  maxQuantity: number;
}

interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minAmount?: number;
  isValid: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    item: Omit<CartItem, "quantity" | "maxQuantity">,
    quantity?: number
  ) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  originalSubtotal: number;
  savings: number;
  shipping: number;
  total: number;
  promoCode: PromoCode | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  promoDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [usedPromoCodes, setUsedPromoCodes] = useState<string[]>([]);
  const { showNotification } = useNotification();

  // Load cart, promo code, and used promo codes from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedPromo = localStorage.getItem("promoCode");
    const storedUsedCodes = localStorage.getItem("usedPromoCodes");

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }

    if (storedPromo) {
      try {
        setPromoCode(JSON.parse(storedPromo));
      } catch (error) {
        console.error("Failed to parse promo code from localStorage:", error);
      }
    }

    if (storedUsedCodes) {
      try {
        setUsedPromoCodes(JSON.parse(storedUsedCodes));
      } catch (error) {
        console.error(
          "Failed to parse used promo codes from localStorage:",
          error
        );
      }
    }

    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Save promo code to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      if (promoCode) {
        localStorage.setItem("promoCode", JSON.stringify(promoCode));
      } else {
        localStorage.removeItem("promoCode");
      }
    }
  }, [promoCode, isInitialized]);

  // Save used promo codes to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && usedPromoCodes.length > 0) {
      localStorage.setItem("usedPromoCodes", JSON.stringify(usedPromoCodes));
    }
  }, [usedPromoCodes, isInitialized]);

  // Add item to cart
  const addToCart = (
    item: Omit<CartItem, "quantity" | "maxQuantity">,
    quantity = 1
  ) => {
    setCartItems((prevItems) => {
      // Check if the item with the same id, color, and size already exists
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];

        // Ensure we don't exceed maxQuantity
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          existingItem.maxQuantity
        );

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };

        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [
          ...prevItems,
          {
            ...item,
            quantity,
            maxQuantity: 10, // Default max quantity
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string, color: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          // Ensure quantity is within valid range
          const newQuantity = Math.max(1, Math.min(quantity, item.maxQuantity));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart totals
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );

  const savings = originalSubtotal - subtotal;
  const shipping = subtotal >= 2000 ? 0 : 100; // Free shipping over ৳2000

  // Predefined promo codes
  const validPromoCodes: Record<string, Omit<PromoCode, "code" | "isValid">> = {
    SAVE10: { discount: 10, type: "percentage", minAmount: 500 },
    SAVE20: { discount: 20, type: "percentage", minAmount: 1000 },
    WELCOME100: { discount: 100, type: "fixed", minAmount: 800 },
    NEWUSER: { discount: 15, type: "percentage", minAmount: 300 },
    FREESHIP: { discount: 100, type: "fixed", minAmount: 0 }, // Free shipping
  };

  // Log available promo codes for testing (only in development)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.log("🎫 Available Promo Codes:");
      Object.entries(validPromoCodes).forEach(([code, data]) => {
        console.log(
          `  ${code}: ${
            data.type === "percentage"
              ? `${data.discount}%`
              : `৳${data.discount}`
          } off (min: ৳${data.minAmount})`
        );
      });
    }
  }, []);

  // Apply promo code
  const applyPromoCode = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    const promoData = validPromoCodes[upperCode];

    if (!promoData) {
      showNotification(
        "error",
        "Invalid Code",
        `The promo code "${upperCode}" is not valid or has expired.`
      );
      return false; // Invalid code
    }

    if (promoData.minAmount && subtotal < promoData.minAmount) {
      showNotification(
        "error",
        "Minimum Purchase Required",
        `This promo code requires a minimum purchase of ৳${promoData.minAmount}.`
      );
      return false; // Minimum amount not met
    }

    // Check if the code is a one-time use code (NEWUSER) and has been used before
    if (upperCode === "NEWUSER" && usedPromoCodes.includes(upperCode)) {
      showNotification(
        "error",
        "Code Already Used",
        `The promo code "${upperCode}" can only be used once and has already been used.`
      );
      return false;
    }

    setPromoCode({
      code: upperCode,
      ...promoData,
      isValid: true,
    });

    // If it's a one-time use code, add it to used codes
    if (upperCode === "NEWUSER") {
      setUsedPromoCodes((prev) => [...prev, upperCode]);

      // Show success notification
      showNotification(
        "success",
        "Promo Code Applied",
        `Your promo code "${upperCode}" has been applied successfully!`
      );

      // Show warning notification after a short delay
      setTimeout(() => {
        showNotification(
          "warning",
          "One-time Use Only",
          `The promo code "${upperCode}" can only be used once. You will not be able to use it again.`
        );
      }, 2000);
    } else {
      // Show regular success notification for other codes
      showNotification(
        "success",
        "Promo Code Applied",
        `Your promo code "${upperCode}" has been applied successfully!`
      );
    }

    return true;
  };

  // Remove promo code
  const removePromoCode = () => {
    if (promoCode) {
      showNotification(
        "info",
        "Promo Code Removed",
        `The promo code "${promoCode.code}" has been removed.`
      );
    }
    setPromoCode(null);
  };

  // Calculate promo discount
  const promoDiscount = promoCode
    ? promoCode.type === "percentage"
      ? Math.round(subtotal * (promoCode.discount / 100))
      : promoCode.code === "FREESHIP"
      ? shipping // For free shipping, discount equals shipping cost
      : promoCode.discount
    : 0;

  // Calculate final total with promo discount
  const total = subtotal + shipping - promoDiscount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        originalSubtotal,
        savings,
        shipping,
        total,
        promoCode,
        applyPromoCode,
        removePromoCode,
        promoDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
