"use client";

import { useNotification } from "@/context/NotificationContext";
import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface PromoCodeInputProps {
  onApply?: (code: string, discount: number) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onApply }) => {
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [usedCodes, setUsedCodes] = useState<string[]>([]);
  const { showNotification } = useNotification();

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      showNotification(
        "error",
        "Invalid Code",
        "Please enter a valid promo code."
      );
      return;
    }

    if (usedCodes.includes(code)) {
      showNotification(
        "error",
        "Code Already Used",
        `The promo code "${code}" has already been used and cannot be applied again.`
      );
      return;
    }

    // Check if the code is valid (in a real app, this would be a server call)
    if (code === "NEWUSER") {
      // Apply the discount
      setIsApplied(true);
      setUsedCodes([...usedCodes, code]);

      // Show success notification
      showNotification(
        "success",
        "Promo Code Applied",
        `Your promo code "${code}" has been applied successfully!`
      );

      // Show warning notification after a short delay
      setTimeout(() => {
        showNotification(
          "warning",
          "One-time Use Only",
          `The promo code "${code}" can only be used once. You will not be able to use it again.`
        );
      }, 2000);

      // Call the onApply callback with the discount amount
      onApply?.(code, 10); // 10% discount for NEWUSER
    } else {
      showNotification(
        "error",
        "Invalid Code",
        `The promo code "${code}" is not valid or has expired.`
      );
    }
  };

  const handleRemovePromo = () => {
    setIsApplied(false);
    setPromoCode("");
    showNotification(
      "info",
      "Promo Code Removed",
      "Your promo code has been removed."
    );
    onApply?.("", 0);
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
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={isApplied}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                isApplied ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            />
            {isApplied && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-green-500 dark:text-green-400">
                  <FiCheck className="h-5 w-5" />
                </span>
              </div>
            )}
          </div>
          {!isApplied ? (
            <button
              onClick={handleApplyPromo}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Apply
            </button>
          ) : (
            <button
              onClick={handleRemovePromo}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
        {isApplied && (
          <div className="text-sm text-green-600 dark:text-green-400">
            Promo code applied: 10% discount
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodeInput;
