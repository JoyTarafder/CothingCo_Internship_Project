"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useOrder } from "@/context/OrderContext";
import { useEffect, useState } from "react";
import {
  FiBox,
  FiCheck,
  FiClock,
  FiInfo,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiTruck,
} from "react-icons/fi";

export default function TrackOrderPage() {
  const { orders, getOrderById } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showOrderList, setShowOrderList] = useState(false);

  // Auto-refresh every 10 seconds if tracking an order
  useEffect(() => {
    if (searchResult) {
      const interval = setInterval(() => {
        const updatedOrder = getOrderById(searchResult.id);
        if (
          updatedOrder &&
          (updatedOrder.status !== searchResult.status ||
            updatedOrder.timeline.length !== searchResult.timeline.length)
        ) {
          setSearchResult(updatedOrder);
          setLastUpdated(new Date());
        }
      }, 10000); // Check every 10 seconds for faster updates

      return () => clearInterval(interval);
    }
  }, [searchResult, getOrderById]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Please enter an order ID or tracking number");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setSearchResult(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const searchTerm = searchQuery.trim();

    // Enhanced search - case insensitive and multiple methods
    let order = null;

    // 1. Exact match
    order = getOrderById(searchTerm);

    // 2. Case-insensitive match
    if (!order) {
      order = orders.find(
        (o) => o.id.toLowerCase() === searchTerm.toLowerCase()
      );
    }

    // 3. Search by tracking number
    if (!order) {
      order = orders.find(
        (o) =>
          o.shipping?.tracking &&
          o.shipping.tracking.toLowerCase() === searchTerm.toLowerCase()
      );
    }

    // 4. Partial ID match (for user convenience)
    if (!order) {
      order = orders.find(
        (o) =>
          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          searchTerm.toLowerCase().includes(o.id.toLowerCase())
      );
    }

    if (order) {
      setSearchResult(order);
      setLastUpdated(new Date());
    } else {
      setSearchError(
        `Order not found. Please check your order ID or tracking number. ${orders.length} orders available in system.`
      );
    }

    setIsSearching(false);
  };

  const handleRefresh = async () => {
    if (searchResult) {
      setIsSearching(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updatedOrder = getOrderById(searchResult.id);
      if (updatedOrder) {
        setSearchResult(updatedOrder);
        setLastUpdated(new Date());
      }
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <FiClock className="w-5 h-5" />;
      case "processing":
        return <FiBox className="w-5 h-5" />;
      case "shipped":
        return <FiTruck className="w-5 h-5" />;
      case "delivered":
        return <FiCheck className="w-5 h-5" />;
      default:
        return <FiPackage className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
      case "shipped":
        return "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString; // Fallback if date parsing fails
    }
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enter your order ID or tracking number to see the latest updates
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Order ID or Tracking Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., ORD-2024-001 or TRK123456789"
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 disabled:opacity-50"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isSearching ? "Searching..." : "Track Order"}
                </button>
                {searchResult && (
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isSearching}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg transition-colors duration-200"
                    title="Refresh order status"
                  >
                    <FiRefreshCw
                      className={`w-5 h-5 ${isSearching ? "animate-spin" : ""}`}
                    />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowOrderList(!showOrderList)}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors duration-200"
                  title="Show available orders"
                >
                  <FiInfo className="w-5 h-5" />
                </button>
              </div>
            </form>

            {searchError && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {searchError}
                </p>
              </div>
            )}

            {lastUpdated && (
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <FiRefreshCw className="w-3 h-3" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>

          {/* Available Orders Helper */}
          {showOrderList && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <FiInfo className="w-5 h-5" />
                Available Orders ({orders.length})
              </h3>
              {orders.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <p className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                          {order.id}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Status:{" "}
                          <span className="font-medium">{order.status}</span> •
                          Customer:{" "}
                          {order.shipping?.address?.firstName || "N/A"}{" "}
                          {order.shipping?.address?.lastName || ""}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSearchQuery(order.id);
                          setShowOrderList(false);
                        }}
                        className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                      >
                        Track
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiPackage className="w-12 h-12 text-blue-300 dark:text-blue-600 mx-auto mb-3" />
                  <p className="text-blue-600 dark:text-blue-400">
                    No orders found in the system
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-500 mt-1">
                    Place an order from the shop to see it here
                  </p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  💡 Tip: Order IDs are case-insensitive. You can also search by
                  tracking number or partial ID.
                </p>
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchResult && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Order #{searchResult.id}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Placed on {formatDate(searchResult.date)}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        searchResult.status
                      )}`}
                    >
                      {getStatusIcon(searchResult.status)}
                      <span className="ml-2">{searchResult.status}</span>
                    </div>
                    {lastUpdated && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Live Update Notice */}
              <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 px-8 py-3">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Live Tracking Active
                  </span>
                  <span className="text-xs">• Updates every 10 seconds</span>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="px-8 py-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Order Timeline
                </h3>
                <div className="space-y-4">
                  {searchResult.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.status}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Shipping Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Shipping Address
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        {searchResult.shipping.address.firstName}{" "}
                        {searchResult.shipping.address.lastName}
                      </p>
                      <p>{searchResult.shipping.address.address}</p>
                      {searchResult.shipping.address.apartment && (
                        <p>{searchResult.shipping.address.apartment}</p>
                      )}
                      <p>
                        {searchResult.shipping.address.city},{" "}
                        {searchResult.shipping.address.postalCode}
                      </p>
                      <p>{searchResult.shipping.address.country}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tracking Details
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {searchResult.shipping.tracking && (
                        <p>
                          <span className="font-medium">Tracking Number:</span>{" "}
                          {searchResult.shipping.tracking}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Shipping Method:</span>{" "}
                        {searchResult.shipping.method}
                      </p>
                      {searchResult.shipping.estimatedDelivery && (
                        <p>
                          <span className="font-medium">
                            Estimated Delivery:
                          </span>{" "}
                          {searchResult.shipping.estimatedDelivery}
                        </p>
                      )}
                      {searchResult.shipping.deliveredOn && (
                        <p>
                          <span className="font-medium">Delivered On:</span>{" "}
                          {formatDate(searchResult.shipping.deliveredOn)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Order Items ({searchResult.items.length} item
                  {searchResult.items.length !== 1 ? "s" : ""})
                </h3>
                <div className="space-y-4">
                  {searchResult.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-x-4">
                          <span>Color: {item.color}</span>
                          <span>Size: {item.size}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ৳{item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>৳{searchResult.payment.subtotal.toFixed(2)}</span>
                  </div>
                  {searchResult.payment.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount</span>
                      <span>-৳{searchResult.payment.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>৳{searchResult.payment.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>৳{searchResult.payment.tax.toFixed(2)}</span>
                  </div>
                  {searchResult.payment.giftWrapping > 0 && (
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Gift Wrapping</span>
                      <span>
                        ৳{searchResult.payment.giftWrapping.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>৳{searchResult.payment.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    Download Invoice
                  </button>
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Need Help?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  How to find your order ID:
                </h4>
                <ul className="space-y-1">
                  <li>• Check your order confirmation email</li>
                  <li>• Look in your account order history</li>
                  <li>• Find it on your receipt</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Tracking number location:
                </h4>
                <ul className="space-y-1">
                  <li>• Shipping confirmation email</li>
                  <li>• SMS notification</li>
                  <li>• Account dashboard</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Still can't find your order?{" "}
                <a
                  href="/shop/contact"
                  className="text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Contact our support team
                </a>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
