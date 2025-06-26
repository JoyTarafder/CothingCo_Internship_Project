"use client";

import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface PromoCodeInputProps {
  onApply?: (code: string, discount: number) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onApply }) => {
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const { promoCode, applyPromoCode, removePromoCode, promoDiscount } =
    useCart();
  const { showNotification } = useNotification();

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim();

    if (!code) {
      showNotification(
        "error",
        "Invalid Code",
        "Please enter a valid promo code."
      );
      return;
    }

    const success = applyPromoCode(code);
    if (success) {
      setPromoCodeInput("");
      // Call the onApply callback if provided
      onApply?.(code, promoDiscount);
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoCodeInput("");
    // Call the onApply callback to notify of removal
    onApply?.("", 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyPromo();
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="promo-code"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Promo Code
        </label>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              id="promo-code"
              placeholder="Enter promo code"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!!promoCode}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                promoCode ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            />
            {promoCode && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-green-500 dark:text-green-400">
                  <FiCheck className="h-5 w-5" />
                </span>
              </div>
            )}
          </div>
          {!promoCode ? (
            <button
              onClick={handleApplyPromo}
              disabled={!promoCodeInput.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          ) : (
            <button
              onClick={handleRemovePromo}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              title="Remove promo code"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
        {promoCode && (
          <div className="text-sm text-green-600 dark:text-green-400">
            Promo code applied: {promoCode.code} -{" "}
            {promoCode.type === "percentage"
              ? `${promoCode.discount}% off`
              : `৳${promoCode.discount} off`}{" "}
            (Save ৳{promoDiscount})
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodeInput;
