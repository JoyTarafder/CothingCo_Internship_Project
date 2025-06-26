"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiArrowLeft, FiBox, FiCheck, FiTruck } from "react-icons/fi";

export default function OrderDetailPage() {
  const { user } = useAuth();
  const { orders, getOrderById } = useOrder();
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const order = getOrderById(orderId);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/shop/login");
    }
  }, [user, router]);

  // Redirect if order not found
  useEffect(() => {
    if (user && !order) {
      router.push("/shop/account/orders");
    }
  }, [user, order, router]);

  if (!user || !order) {
    return null; // Don't render anything while redirecting
  }

  return (
    <CustomerLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link
              href="/shop/account/orders"
              className="mr-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <FiArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Orders</span>
            </Link>
            <h1 className="text-3xl font-light text-gray-900 dark:text-white">
              Order {order.id}
            </h1>
            <span
              className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Order Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Order Status
                </h2>
                <div className="space-y-6">
                  {order.timeline.map((event, index) => (
                    <div key={`event-${index}`} className="flex items-start">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
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
                        <p className="text-base font-medium text-gray-900 dark:text-white">
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

              {/* Order Items */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Items
                </h2>
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex items-center"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-6 flex-1">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.color} • Size {item.size}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {order.isGiftOrder && order.giftMessage && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Gift Message
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "{order.giftMessage}"
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">
                      {order.shipping.address.firstName}{" "}
                      {order.shipping.address.lastName}
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {order.shipping.address.address}
                      {order.shipping.address.apartment &&
                        `, ${order.shipping.address.apartment}`}
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {order.shipping.address.city},{" "}
                      {order.shipping.address.postalCode}
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {order.shipping.address.country}
                    </p>
                    <p className="text-base text-gray-900 dark:text-white mt-2">
                      {order.shipping.address.phone}
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {order.shipping.address.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Shipping Method
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">
                      {order.shipping.method}
                    </p>
                    {order.shipping.tracking && (
                      <>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-6 mb-2">
                          Tracking Number
                        </h3>
                        <p className="text-base text-gray-900 dark:text-white">
                          {order.shipping.tracking}
                        </p>
                      </>
                    )}
                    {order.shipping.estimatedDelivery && (
                      <>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-6 mb-2">
                          Estimated Delivery
                        </h3>
                        <p className="text-base text-gray-900 dark:text-white">
                          {order.shipping.estimatedDelivery}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Subtotal
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      ৳{order.payment.subtotal.toLocaleString()}
                    </p>
                  </div>
                  {order.payment.discount > 0 && (
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Discount
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        -৳{order.payment.discount.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Shipping
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
                        Tax
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        ৳{order.payment.tax.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {order.payment.giftWrapping > 0 && (
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gift Wrapping
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        ৳{order.payment.giftWrapping.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        Total
                      </p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        ৳{order.payment.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Payment Method
                    </h3>
                    <p className="text-base text-gray-900 dark:text-white">
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

                  <div className="pt-6 space-y-4">
                    <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Download Invoice
                    </button>

                    {order.status !== "Delivered" &&
                      order.status !== "Cancelled" && (
                        <button className="w-full px-4 py-2 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          Cancel Order
                        </button>
                      )}

                    {order.status === "Delivered" && (
                      <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
