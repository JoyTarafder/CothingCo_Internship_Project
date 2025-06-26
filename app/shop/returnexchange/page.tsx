"use client";

import CustomerLayout from "@/components/CustomerLayout";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiInfo,
  FiRefreshCw,
  FiShield,
  FiTruck,
  FiX,
  FiXCircle,
} from "react-icons/fi";

export default function ReturnExchangePage() {
  const returnReasons = [
    {
      reason: "Size Issues",
      icon: <FiRefreshCw className="w-5 h-5" />,
      description: "Item doesn't fit as expected",
      eligible: true,
      timeLimit: "30 days",
    },
    {
      reason: "Wrong Item",
      icon: <FiX className="w-5 h-5" />,
      description: "Received different item than ordered",
      eligible: true,
      timeLimit: "30 days",
    },
    {
      reason: "Defective Product",
      icon: <FiXCircle className="w-5 h-5" />,
      description: "Manufacturing defects or damage",
      eligible: true,
      timeLimit: "60 days",
    },
    {
      reason: "Color Difference",
      icon: <FiAlertCircle className="w-5 h-5" />,
      description: "Significant color variation from photos",
      eligible: true,
      timeLimit: "30 days",
    },
    {
      reason: "Quality Issues",
      icon: <FiShield className="w-5 h-5" />,
      description: "Poor material or construction quality",
      eligible: true,
      timeLimit: "30 days",
    },
    {
      reason: "Changed Mind",
      icon: <FiInfo className="w-5 h-5" />,
      description: "No longer want the item",
      eligible: true,
      timeLimit: "15 days",
    },
  ];

  const returnProcess = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact us or use our online return form",
      details: [
        "Fill out return request form",
        "Upload photos if damaged/defective",
        "Select reason for return",
        "Provide order details",
      ],
    },
    {
      step: 2,
      title: "Approval & Instructions",
      description: "Receive return authorization and shipping label",
      details: [
        "Get return authorization number (RMA)",
        "Receive pre-paid shipping label",
        "Print packaging instructions",
        "Note: Some returns may be denied",
      ],
    },
    {
      step: 3,
      title: "Package & Ship",
      description: "Carefully package and send items back",
      details: [
        "Use original packaging if available",
        "Include all tags and accessories",
        "Attach return authorization label",
        "Drop off at courier location",
      ],
    },
    {
      step: 4,
      title: "Processing & Refund",
      description: "We process your return and issue refund",
      details: [
        "Items inspected upon arrival",
        "Refund processed within 5-7 business days",
        "Email confirmation sent",
        "Money credited to original payment method",
      ],
    },
  ];

  const exchangeItems = [
    {
      category: "Size Exchange",
      description: "Exchange for different size of same item",
      fee: "Free",
      timeframe: "3-5 business days",
      conditions: ["Same color", "Same style", "In stock"],
    },
    {
      category: "Color Exchange",
      description: "Exchange for different color of same item",
      fee: "Free",
      timeframe: "3-5 business days",
      conditions: ["Same size", "Same style", "In stock"],
    },
    {
      category: "Style Exchange",
      description: "Exchange for completely different item",
      fee: "৳50 processing fee",
      timeframe: "5-7 business days",
      conditions: ["Equal or higher value", "Pay difference if applicable"],
    },
  ];

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Returns & Exchanges
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We want you to love your purchase! If you're not completely
              satisfied, we're here to help with hassle-free returns and
              exchanges.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                30-Day Returns
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Most items can be returned within 30 days of delivery
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Free Return Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We provide pre-paid return labels for most returns
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast Refunds
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Refunds processed within 5-7 business days
              </p>
            </div>
          </div>

          {/* Return Eligibility */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Return Eligibility
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {returnReasons.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-yellow-500">{item.icon}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.reason}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.eligible
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {item.eligible ? "Eligible" : "Not Eligible"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.timeLimit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How to Return Items
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnProcess.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      {step.step}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                  </div>
                  <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  {index < returnProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full">
                      <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-600 transform -translate-x-6"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exchange Options */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Exchange Options
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {exchangeItems.map((exchange, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {exchange.category}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exchange.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Fee:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {exchange.fee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Timeframe:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {exchange.timeframe}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Conditions:
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      {exchange.conditions.map((condition, conditionIndex) => (
                        <li key={conditionIndex} className="flex items-center">
                          <FiCheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return Conditions */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* What We Accept */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FiCheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  We Accept Returns For
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Unworn items with original tags attached</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Items in original packaging (when applicable)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Defective or damaged items (any condition)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Wrong size or color received</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Items with hygiene seals intact</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Accessories and gift items included</span>
                </li>
              </ul>
            </div>

            {/* What We Don't Accept */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FiXCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  We Cannot Accept
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Worn, washed, or altered items</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Items without original tags</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Underwear and intimate apparel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Customized or personalized items</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Final sale or clearance items</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Items returned after 30 days (except defects)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Refund Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Refund Methods
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Credit/Debit Card
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      5-7 business days
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      bKash/Nagad
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      3-5 business days
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Bank Transfer
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      7-10 business days
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Store Credit
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      Instant
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Refund Amounts
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 font-medium mb-1">
                      Full Refund
                    </p>
                    <p className="text-green-600 dark:text-green-300 text-xs">
                      Defective items, wrong items sent, or our error
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-1">
                      Product Cost Only
                    </p>
                    <p className="text-yellow-600 dark:text-yellow-300 text-xs">
                      Customer changed mind (shipping cost deducted)
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200 font-medium mb-1">
                      Store Credit + 10%
                    </p>
                    <p className="text-blue-600 dark:text-blue-300 text-xs">
                      Opt for store credit instead of refund
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Policies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Special Return Policies
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Sale Items & Clearance
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Items marked as "Final Sale" or purchased during clearance
                  events are only returnable if defective. All other sale items
                  can be returned within 15 days for store credit only.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Pre-Orders & Custom Items
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pre-ordered items can be cancelled up to 24 hours before
                  shipping. Custom or personalized items cannot be returned
                  unless defective. Special order items may have different
                  return windows.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Gift Returns
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gift recipients can return items without a receipt for store
                  credit at the current selling price. Original purchaser
                  information is not shared. Gift cards and promotional items
                  have separate terms.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Hygiene & Safety Items
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For health and safety reasons, underwear, swimwear, and
                  intimate apparel cannot be returned once hygiene seals are
                  broken. These items are only returnable if received damaged or
                  defective.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Help with Returns?
              </h2>
              <p className="mb-6 opacity-90">
                Our customer service team is ready to assist you with any return
                or exchange questions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="/shop/contact"
                  className="bg-white text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Start Return Process
                </a>
                <a
                  href="/shop/trackorder"
                  className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                >
                  Track Return Status
                </a>
              </div>
              <div className="text-sm opacity-90 space-y-1">
                <p>
                  Customer Service Hours: Saturday - Thursday, 9:00 AM - 8:00 PM
                </p>
                <p>Returns Hotline: +880-1234-567891</p>
                <p>Email: returns@clothingco.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
