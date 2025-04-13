"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiBarChart2,
  FiCreditCard,
  FiEdit,
  FiEye,
  FiFilter,
  FiPackage,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Order = {
  id: string;
  customer: string;
  date: string;
  status: "pending" | "processing" | "delivered" | "canceled";
  total: number;
};

export default function OrdersPage() {
  // Sample data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2025-04-10",
      status: "delivered",
      total: 125.99,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2025-04-11",
      status: "processing",
      total: 85.5,
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2025-04-12",
      status: "pending",
      total: 220.75,
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      date: "2025-04-09",
      status: "canceled",
      total: 65.25,
    },
    {
      id: "ORD-005",
      customer: "Michael Brown",
      date: "2025-04-08",
      status: "delivered",
      total: 149.99,
    },
    {
      id: "ORD-006",
      customer: "Emily Davis",
      date: "2025-04-07",
      status: "processing",
      total: 99.5,
    },
  ]);

  // State for managing modal view
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Form state for edited order
  const [editFormData, setEditFormData] = useState<{
    customer: string;
    status: Order["status"];
    total: number;
  }>({
    customer: "",
    status: "pending",
    total: 0,
  });

  // Analytics data
  const analyticsData = [
    { name: "Jan", orders: 65 },
    { name: "Feb", orders: 59 },
    { name: "Mar", orders: 80 },
    { name: "Apr", orders: 81 },
    { name: "May", orders: 56 },
    { name: "Jun", orders: 55 },
    { name: "Jul", orders: 40 },
  ];

  const statusAnalytics = [
    {
      name: "Delivered",
      value: orders.filter((o) => o.status === "delivered").length,
      color: "#10B981",
    },
    {
      name: "Processing",
      value: orders.filter((o) => o.status === "processing").length,
      color: "#3B82F6",
    },
    {
      name: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      color: "#F59E0B",
    },
    {
      name: "Canceled",
      value: orders.filter((o) => o.status === "canceled").length,
      color: "#EF4444",
    },
  ];

  // Handle viewing order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  // Handle editing order
  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditFormData({
      customer: order.customer,
      status: order.status,
      total: order.total,
    });
    setIsEditModalOpen(true);
  };

  // Handle deleting order
  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete order
  const confirmDelete = () => {
    if (selectedOrder) {
      setOrders(orders.filter((order) => order.id !== selectedOrder.id));
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
      // Show success notification
      setNotification({
        show: true,
        message: `Order #${selectedOrder.id} was successfully deleted`,
        type: "success",
      });
    }
  };

  // Save edited order
  const saveEditedOrder = () => {
    if (selectedOrder) {
      const updatedOrder = {
        ...selectedOrder,
        customer: editFormData.customer,
        status: editFormData.status,
        total: editFormData.total,
      };

      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id ? updatedOrder : order
        )
      );

      // Show success notification
      setNotification({
        show: true,
        message: `Order #${selectedOrder.id} was successfully updated`,
        type: "success",
      });

      setIsEditModalOpen(false);
      setSelectedOrder(null);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <FiTruck className="mr-1.5 h-3.5 w-3.5" />;
      case "processing":
        return <FiPackage className="mr-1.5 h-3.5 w-3.5" />;
      case "pending":
        return <FiCreditCard className="mr-1.5 h-3.5 w-3.5" />;
      case "canceled":
        return <FiXCircle className="mr-1.5 h-3.5 w-3.5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Show analytics modal
  const handleShowAnalytics = () => {
    setIsAnalyticsModalOpen(true);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Order Management" />
        <main className="p-6 overflow-y-auto">
          {/* Header with gradient background */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 shadow-md">
            <div className="flex flex-col text-white">
              <h1 className="text-3xl font-bold">Order Management</h1>
              <p className="mt-2 text-blue-100">
                Track and manage all customer orders in one place
              </p>
            </div>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                  <FiShoppingBag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Orders
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {orders.length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
            >
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <FiTruck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Delivered
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {orders.filter((o) => o.status === "delivered").length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
            >
              <div className="flex items-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                  <FiPackage className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Processing
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {orders.filter((o) => o.status === "processing").length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
            >
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                  <FiXCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Canceled
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {orders.filter((o) => o.status === "canceled").length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Notification */}
          <AnimatePresence>
            {notification.show && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-6 p-4 rounded-lg shadow-sm ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                    : "bg-red-100 text-red-800 border-l-4 border-red-500"
                }`}
              >
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Orders Table Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-auto flex items-center">
                  <div className="relative flex-1 md:w-80">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="search"
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 block w-full pl-10 p-2.5 transition-all"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-2 p-2.5 flex items-center text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiFilter className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex space-x-3 w-full md:w-auto">
                  <select
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    value={statusFilter}
                    onChange={handleStatusFilter}
                  >
                    <option value="">All Statuses</option>
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="canceled">Canceled</option>
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 px-4 py-2 rounded-lg transition-colors"
                    onClick={handleShowAnalytics}
                  >
                    <FiBarChart2 className="mr-2 h-5 w-5" />
                    Analytics
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                  >
                    <FiPlus className="mr-2 h-5 w-5" />
                    Add Order
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1.5 inline-flex text-xs leading-4 font-medium rounded-full items-center ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          ৳{order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full"
                              onClick={() => handleViewOrder(order)}
                              title="View Order Details"
                            >
                              <FiEye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full"
                              onClick={() => handleEditOrder(order)}
                              title="Edit Order"
                            >
                              <FiEdit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                              onClick={() => handleDeleteOrder(order)}
                              title="Delete Order"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center">
                          <FiShoppingBag className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
                          <p>No orders found</p>
                          <p className="text-xs mt-1">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  orders
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    1
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Order Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedOrder && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsViewModalOpen(false)}
              ></motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-auto z-10 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">
                      Order #{selectedOrder.id} Details
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Customer
                        </span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Date
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900 dark:text-white">
                          {selectedOrder.customer}
                        </span>
                        <span className="text-base text-gray-700 dark:text-gray-300">
                          {formatDate(selectedOrder.date)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1.5 inline-flex text-sm leading-5 font-medium rounded-full items-center ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Order Total
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ৳{selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Order Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedOrder && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsEditModalOpen(false)}
              ></motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-auto z-10 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <FiEdit className="w-5 h-5 mr-2" />
                      Edit Order #{selectedOrder.id}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditModalOpen(false)}
                      className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-5">
                    <div>
                      <label
                        htmlFor="customer"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        name="customer"
                        id="customer"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2.5"
                        value={editFormData.customer}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            customer: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2.5"
                        value={editFormData.status}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            status: e.target.value as Order["status"],
                          })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="total"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Total
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                            ৳
                          </span>
                        </div>
                        <input
                          type="number"
                          name="total"
                          id="total"
                          className="pl-7 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2.5"
                          value={editFormData.total}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              total: parseFloat(e.target.value) || 0,
                            })
                          }
                          step="0.01"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none transition-colors flex items-center"
                    onClick={saveEditedOrder}
                  >
                    <FiEdit className="w-4 h-4 mr-1.5" />
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedOrder && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsDeleteModalOpen(false)}
              ></motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-auto z-10 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-gradient-to-r from-red-600 to-pink-600 p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <FiAlertCircle className="w-5 h-5 mr-2" />
                      Confirm Deletion
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <FiTrash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        Delete Order #{selectedOrder.id}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Are you sure you want to delete this order? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none transition-colors flex items-center"
                    onClick={confirmDelete}
                  >
                    <FiTrash2 className="w-4 h-4 mr-1.5" />
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {isAnalyticsModalOpen && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsAnalyticsModalOpen(false)}
              ></motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-auto z-10 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <FiBarChart2 className="w-5 h-5 mr-2" />
                      Order Analytics
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsAnalyticsModalOpen(false)}
                      className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-xl"
                    >
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                        <FiBarChart2 className="w-4 h-4 mr-1.5 text-indigo-500" />
                        Monthly Orders
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              opacity={0.2}
                            />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow:
                                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                            />
                            <Legend />
                            <Bar
                              dataKey="orders"
                              name="Orders"
                              fill="#6366F1"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-xl"
                    >
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                        <FiBarChart2 className="w-4 h-4 mr-1.5 text-indigo-500" />
                        Order Status Distribution
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {statusAnalytics.map((status) => (
                          <div
                            key={status.name}
                            className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center"
                          >
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: status.color }}
                            ></div>
                            <div className="flex-1 flex justify-between items-center">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {status.name}
                              </span>
                              <span className="text-sm font-medium text-gray-800 dark:text-white">
                                {status.value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="h-40 flex items-center justify-center">
                        <ResponsiveContainer width="60%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={statusAnalytics}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              opacity={0.2}
                              horizontal={false}
                            />
                            <XAxis type="number" tick={{ fontSize: 12 }} />
                            <YAxis
                              dataKey="name"
                              type="category"
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow:
                                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                            />
                            <Bar
                              dataKey="value"
                              name="Orders"
                              radius={[0, 4, 4, 0]}
                            >
                              {statusAnalytics.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsAnalyticsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none transition-colors flex items-center"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
