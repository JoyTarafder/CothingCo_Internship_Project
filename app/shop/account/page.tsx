"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiAward,
  FiBell,
  FiBox,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiEdit,
  FiEye,
  FiHeart,
  FiLogOut,
  FiMapPin,
  FiPlus,
  FiSettings,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

// Mock data
const mockOrders = [
  {
    id: "ORD-12345",
    date: "2023-10-15",
    status: "Delivered",
    total: 3500,
    items: [
      { id: "1", name: "Classic Cotton T-Shirt", quantity: 2, price: 1200 },
      { id: "4", name: "Premium Hoodie", quantity: 1, price: 3500 },
    ],
  },
  {
    id: "ORD-12346",
    date: "2023-11-02",
    status: "Processing",
    total: 2200,
    items: [{ id: "5", name: "Slim Fit Jeans", quantity: 1, price: 2200 }],
  },
  {
    id: "ORD-12347",
    date: "2023-11-20",
    status: "Shipped",
    total: 4300,
    items: [
      { id: "6", name: "Floral Print Blouse", quantity: 1, price: 1800 },
      { id: "8", name: "Oversized Sweater", quantity: 1, price: 2500 },
    ],
  },
];

const mockAddresses = [
  {
    id: "addr-1",
    type: "Home",
    name: "John Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "Work",
    name: "John Doe",
    street: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
    isDefault: false,
  },
];

const mockWishlist = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    price: 1200,
    image: "/images/products/1-classic-cotton-tshirt.jpg",
  },
  {
    id: "8",
    name: "Oversized Sweater",
    price: 2800,
    image: "/images/products/8-oversized-sweater.jpg",
  },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) {
      router.push("/shop/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/shop");
  };

  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <CustomerLayout>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm p-1">
                  <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
                    <img
                      src="/profile-avatar.jpg"
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling!.classList.remove("hidden");
                      }}
                    />
                    <FiUser className="h-16 w-16 text-white hidden" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <FiAward className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Welcome back!
                </h1>
                <p className="text-2xl text-white/90 mb-2">{user.name}</p>
                <p className="text-lg text-white/70 mb-6">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <FiStar className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="font-medium">VIP Member</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <FiTrendingUp className="h-5 w-5 mr-2 text-green-400" />
                    <span>৳{totalSpent.toLocaleString()} lifetime</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <FiShield className="h-5 w-5 mr-2 text-blue-400" />
                    <span>Verified Account</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          {/* Quick Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockOrders.length}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    +2 this month
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiBox className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Wishlist
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockWishlist.length}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    items saved
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiHeart className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Addresses
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockAddresses.length}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    locations saved
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiMapPin className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Rewards
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    2,450
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    points earned
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiStar className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Modern Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-8">
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Account Hub
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage everything in one place
                  </p>
                </div>

                <nav className="p-4 space-y-2">
                  {[
                    {
                      id: "overview",
                      name: "Dashboard",
                      icon: FiActivity,
                      description: "Overview & stats",
                    },
                    {
                      id: "profile",
                      name: "Profile",
                      icon: FiUser,
                      description: "Personal info",
                    },
                    {
                      id: "orders",
                      name: "Orders",
                      icon: FiBox,
                      description: "Order history",
                    },
                    {
                      id: "addresses",
                      name: "Addresses",
                      icon: FiMapPin,
                      description: "Saved locations",
                    },
                    {
                      id: "wishlist",
                      name: "Wishlist",
                      icon: FiHeart,
                      description: "Saved items",
                    },
                    {
                      id: "payment",
                      name: "Payments",
                      icon: FiCreditCard,
                      description: "Payment methods",
                    },
                    {
                      id: "settings",
                      name: "Settings",
                      icon: FiSettings,
                      description: "Account settings",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 group ${
                          activeTab === item.id
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        }`}
                      >
                        <div
                          className={`mr-4 p-2 rounded-lg ${
                            activeTab === item.id
                              ? "bg-white/20"
                              : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              activeTab === item.id
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{item.name}</div>
                          <div
                            className={`text-xs ${
                              activeTab === item.id
                                ? "text-white/80"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
                    >
                      <div className="mr-4 p-2 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50">
                        <FiLogOut className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Sign Out</div>
                        <div className="text-xs text-red-500 dark:text-red-400">
                          Logout securely
                        </div>
                      </div>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Dashboard Overview */}
                {activeTab === "overview" && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Account Dashboard
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening with your account
                      </p>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                          <FiClock className="mr-3 text-blue-500" />
                          Recent Orders
                        </h3>
                        <div className="space-y-4">
                          {mockOrders.slice(0, 3).map((order) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {order.id}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {order.date}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  ৳{order.total.toLocaleString()}
                                </p>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                      : order.status === "Processing"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="#"
                          onClick={() => setActiveTab("orders")}
                          className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                        >
                          View all orders
                          <FiEye className="ml-2 h-4 w-4" />
                        </Link>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                          <FiHeart className="mr-3 text-red-500" />
                          Wishlist Items
                        </h3>
                        <div className="space-y-4">
                          {mockWishlist.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </p>
                                <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                  ৳{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="#"
                          onClick={() => setActiveTab("wishlist")}
                          className="mt-4 inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-500 font-medium"
                        >
                          View wishlist
                          <FiEye className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Section */}
                {activeTab === "profile" && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Profile Information
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Update your personal details and preferences
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Gender
                          </label>
                          <select className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200">
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            <option>Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Bio
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Tell us about yourself..."
                            className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Orders Section */}
                {activeTab === "orders" && (
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          Order History
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Track and manage your orders
                        </p>
                      </div>
                      <Link
                        href="/shop/account/orders"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
                      >
                        <FiEye className="h-5 w-5" />
                        <span>View All Orders</span>
                      </Link>
                    </div>

                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Order {order.id}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {order.date}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                              <span
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                    : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                                }`}
                              >
                                {order.status}
                              </span>
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ৳{order.total.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {order.items.map((item) => (
                              <div
                                key={`${order.id}-${item.id}`}
                                className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-xl p-4"
                              >
                                <FiShoppingBag className="h-8 w-8 text-indigo-500" />
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Qty: {item.quantity} × ৳
                                    {item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Addresses Section */}
                {activeTab === "addresses" && (
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          Saved Addresses
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Manage your delivery addresses
                        </p>
                      </div>
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2">
                        <FiPlus className="h-5 w-5" />
                        <span>Add Address</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockAddresses.map((address) => (
                        <div
                          key={address.id}
                          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-600 relative"
                        >
                          {address.isDefault && (
                            <div className="absolute top-4 right-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                <FiCheck className="mr-1 h-3 w-3" />
                                Default
                              </span>
                            </div>
                          )}

                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <FiMapPin className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {address.type}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {address.name}
                              </p>
                            </div>
                          </div>

                          <div className="text-gray-700 dark:text-gray-300 space-y-1 mb-6">
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                          </div>

                          <div className="flex justify-between items-center">
                            <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium flex items-center">
                              <FiEdit className="mr-2 h-4 w-4" />
                              Edit
                            </button>
                            {!address.isDefault && (
                              <button className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 font-medium">
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wishlist Section */}
                {activeTab === "wishlist" && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        My Wishlist
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Items you've saved for later
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockWishlist.map((item) => (
                        <div
                          key={item.id}
                          className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300"
                        >
                          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {item.name}
                            </h3>
                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                              ৳{item.price.toLocaleString()}
                            </p>
                            <div className="flex space-x-3">
                              <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200">
                                Add to Cart
                              </button>
                              <button className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200">
                                <FiHeart className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Methods */}
                {activeTab === "payment" && (
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          Payment Methods
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Manage your payment options
                        </p>
                      </div>
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2">
                        <FiPlus className="h-5 w-5" />
                        <span>Add Payment Method</span>
                      </button>
                    </div>

                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FiCreditCard className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No payment methods added
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Add a payment method to make checkout faster and easier.
                      </p>
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                        Add Your First Payment Method
                      </button>
                    </div>
                  </div>
                )}

                {/* Settings */}
                {activeTab === "settings" && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Account Settings
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage your account preferences and security
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Security Settings */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                          <FiShield className="mr-3 text-green-500" />
                          Security & Privacy
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="block w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                            />
                          </div>
                        </div>
                        <button className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                          Update Password
                        </button>
                      </div>

                      {/* Notification Preferences */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                          <FiBell className="mr-3 text-blue-500" />
                          Notifications
                        </h3>
                        <div className="space-y-4">
                          {[
                            {
                              id: "newsletter",
                              label: "Newsletter & Promotions",
                              description:
                                "Receive updates about new products and special offers",
                            },
                            {
                              id: "orders",
                              label: "Order Updates",
                              description:
                                "Get notified about your order status and shipping",
                            },
                            {
                              id: "wishlist",
                              label: "Wishlist Alerts",
                              description:
                                "Notifications when wishlist items go on sale",
                            },
                            {
                              id: "recommendations",
                              label: "Product Recommendations",
                              description:
                                "Personalized product suggestions based on your preferences",
                            },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl"
                            >
                              <div className="flex items-center h-5">
                                <input
                                  id={item.id}
                                  type="checkbox"
                                  defaultChecked
                                  className="h-5 w-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={item.id}
                                  className="font-medium text-gray-900 dark:text-white cursor-pointer"
                                >
                                  {item.label}
                                </label>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                          Save Preferences
                        </button>
                      </div>

                      {/* Danger Zone */}
                      <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-6 border-2 border-red-200 dark:border-red-800">
                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                          Danger Zone
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-6">
                          Once you delete your account, there is no going back.
                          Please be certain.
                        </p>
                        <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
