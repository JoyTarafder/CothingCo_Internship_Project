"use client";

import CustomerLayout from "@/components/CustomerLayout";
import PromoCodeInput from "@/components/PromoCodeInput";
import { useNotification } from "@/context/NotificationContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiTag } from "react-icons/fi";

export default function PromoCodeDemoPage() {
  const { showNotification } = useNotification();
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  const handleApplyPromo = (code: string, discountAmount: number) => {
    setAppliedCode(code);
    setDiscount(discountAmount);
  };

  const showExampleNotifications = () => {
    // Show a sequence of notifications
    showNotification(
      "success",
      "Promo Code Applied",
      "Your promo code has been applied successfully!"
    );

    setTimeout(() => {
      showNotification(
        "warning",
        "One-time Use Only",
        "This promo code can only be used once. You will not be able to use it again."
      );
    }, 2000);

    setTimeout(() => {
      showNotification(
        "info",
        "Need Help?",
        "Contact customer support for assistance with promo codes."
      );
    }, 4000);

    setTimeout(() => {
      showNotification(
        "error",
        "Invalid Code",
        "The promo code you entered is not valid or has expired."
      );
    }, 6000);
  };

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
            Promo Code Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            Try applying any of the available promo codes to see the
            notifications in action. Each code has different requirements and
            discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                Apply a Promo Code
              </h2>

              <div className="mb-8">
                <PromoCodeInput onApply={handleApplyPromo} />
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Available Promo Codes
                </h3>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTag className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium">SAVE10</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      10% off orders over ৳500
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTag className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium">SAVE20</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      20% off orders over ৳1000
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTag className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium">WELCOME100</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ৳100 off orders over ৳800
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTag className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium">NEWUSER</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      15% discount for new users (min ৳300).{" "}
                      <span className="text-amber-600 dark:text-amber-500 font-medium">
                        One-time use only!
                      </span>
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTag className="h-5 w-5 text-green-500" />
                      <span className="font-medium">FREESHIP</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Free shipping (৳100 value) - No minimum purchase required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                Notification Demo
              </h2>

              <button
                onClick={showExampleNotifications}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors mb-6"
              >
                Show Example Notifications
              </button>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Success
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Promo code applied successfully
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiAlertCircle className="h-5 w-5 text-amber-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Warning
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    One-time use promo code
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiInfo className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Info
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Promo code removed
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiAlertCircle className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Error
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Invalid promo code
                  </p>
                </div>
              </div>

              {appliedCode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Applied: {appliedCode}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {discount}% discount applied to your order
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
