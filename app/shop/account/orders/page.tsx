"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FiArrowLeft,
  FiBox,
  FiCheck,
  FiClock,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrder();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/shop/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <CustomerLayout>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link
                href="/shop/account"
                className="mr-6 flex items-center text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <FiArrowLeft className="h-5 w-5 mr-2" />
                <span>Back to Account</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FiBox className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Order History</h1>
                <p className="text-xl text-white/90">
                  Track all your purchases and deliveries
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          {orders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-16 text-center">
              <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                <FiPackage className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                No orders yet
              </h2>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                You haven't placed any orders yet. Start shopping to see your
                order history here.
              </p>
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <FiShoppingBag className="mr-3 h-5 w-5" />
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-8 py-6 flex flex-wrap justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Order {order.id}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <FiClock className="mr-2 h-4 w-4" />
                        Placed on {order.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Total Amount
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ৳{order.payment.total.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                        }`}
                      >
                        {order.status === "Delivered" && (
                          <FiCheck className="mr-2 h-4 w-4" />
                        )}
                        {order.status === "Shipped" && (
                          <FiTruck className="mr-2 h-4 w-4" />
                        )}
                        {order.status === "Processing" && (
                          <FiBox className="mr-2 h-4 w-4" />
                        )}
                        {order.status}
                      </span>
                      <Link
                        href={`/shop/account/orders/${order.id}`}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
                      >
                        <span>View Details</span>
                        <FiArrowLeft className="h-4 w-4 rotate-180" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Order Items */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                          Items
                        </h3>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={`${order.id}-${item.id}-${item.color}-${item.size}`}
                              className="flex items-center"
                            >
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.color} • Size {item.size}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Qty: {item.quantity} × ৳
                                  {item.price.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  ৳
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                          Shipping Information
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Shipping Address
                              </h4>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {order.shipping.address.firstName}{" "}
                                {order.shipping.address.lastName}
                              </p>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {order.shipping.address.address}
                                {order.shipping.address.apartment &&
                                  `, ${order.shipping.address.apartment}`}
                              </p>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {order.shipping.address.city},{" "}
                                {order.shipping.address.postalCode}
                              </p>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {order.shipping.address.country}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Shipping Method
                              </h4>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {order.shipping.method}
                              </p>
                              {order.shipping.tracking && (
                                <>
                                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-3 mb-1">
                                    Tracking Number
                                  </h4>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {order.shipping.tracking}
                                  </p>
                                </>
                              )}
                              {order.shipping.estimatedDelivery && (
                                <>
                                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-3 mb-1">
                                    Estimated Delivery
                                  </h4>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {order.shipping.estimatedDelivery}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                          Payment Information
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Payment Method
                              </h4>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {order.payment.method.type === "card"
                                  ? "Credit/Debit Card"
                                  : order.payment.method.type === "cod"
                                  ? "Cash on Delivery"
                                  : order.payment.method.type === "bkash"
                                  ? "bKash"
                                  : "Nagad"}
                                {order.payment.method.cardLast4 &&
                                  ` (**** **** **** ${order.payment.method.cardLast4})`}
                              </p>
                            </div>
                            <div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Subtotal:
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    ৳{order.payment.subtotal.toLocaleString()}
                                  </p>
                                </div>
                                {order.payment.discount > 0 && (
                                  <div className="flex justify-between">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Discount:
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                      -৳
                                      {order.payment.discount.toLocaleString()}
                                    </p>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Shipping:
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {order.payment.shipping === 0
                                      ? "Free"
                                      : `৳${order.payment.shipping.toLocaleString()}`}
                                  </p>
                                </div>
                                {order.payment.tax > 0 && (
                                  <div className="flex justify-between">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Tax:
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                      ৳{order.payment.tax.toLocaleString()}
                                    </p>
                                  </div>
                                )}
                                {order.payment.giftWrapping > 0 && (
                                  <div className="flex justify-between">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Gift Wrapping:
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                      ৳
                                      {order.payment.giftWrapping.toLocaleString()}
                                    </p>
                                  </div>
                                )}
                                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Total:
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    ৳{order.payment.total.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Timeline */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                          Order Timeline
                        </h3>
                        <div className="space-y-4">
                          {order.timeline.map((event, index) => (
                            <div
                              key={`${order.id}-event-${index}`}
                              className="flex items-start"
                            >
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                  index === 0
                                    ? "bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-400"
                                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                }`}
                              >
                                {index === 0 ? (
                                  <FiCheck className="w-5 h-5" />
                                ) : index === order.timeline.length - 1 &&
                                  order.status === "Delivered" ? (
                                  <FiBox className="w-5 h-5" />
                                ) : (
                                  <FiTruck className="w-5 h-5" />
                                )}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {event.status}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {event.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          {order.status !== "Delivered" &&
                            order.status !== "Cancelled" && (
                              <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                                Cancel Order
                              </button>
                            )}
                        </div>
                        <div className="flex space-x-4">
                          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Download Invoice
                          </button>
                          {order.status === "Delivered" && (
                            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                              Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
