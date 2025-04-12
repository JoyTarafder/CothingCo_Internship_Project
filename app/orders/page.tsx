"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  FiAlertCircle,
  FiBarChart2,
  FiEdit,
  FiEye,
  FiFilter,
  FiPlus,
  FiSearch,
  FiTrash2,
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

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);

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

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Order Management" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Orders
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and track all your customer orders
            </p>
          </div>

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
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-primary/50 block w-full pl-10 p-2.5 transition-all"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <button className="ml-2 p-2.5 flex items-center text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <FiFilter className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex space-x-2 w-full md:w-auto">
                  <select
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    value={statusFilter}
                    onChange={handleStatusFilter}
                  >
                    <option value="">All Statuses</option>
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="canceled">Canceled</option>
                  </select>

                  <button
                    className="admin-button flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors"
                    onClick={handleShowAnalytics}
                  >
                    <FiBarChart2 className="mr-2" />
                    Analytics
                  </button>

                  <button className="admin-button flex items-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-dark transition-all">
                    <FiPlus className="mr-2" />
                    Add Order
                  </button>
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
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                              onClick={() => handleViewOrder(order)}
                              title="View Order Details"
                            >
                              <FiEye className="w-5 h-5" />
                            </button>
                            <button
                              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors p-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                              onClick={() => handleEditOrder(order)}
                              title="Edit Order"
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                              onClick={() => handleDeleteOrder(order)}
                              title="Delete Order"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  results
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                    1
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Order Modal */}
      {isViewModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsViewModalOpen(false)}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      id="modal-title"
                    >
                      Order Details
                    </h3>
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Order ID:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white font-bold">
                          #{selectedOrder.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Customer:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {selectedOrder.customer}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Date:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDate(selectedOrder.date)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            selectedOrder.status
                          )}`}
                        >
                          {selectedOrder.status.charAt(0).toUpperCase() +
                            selectedOrder.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Total:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white font-bold">
                          ${selectedOrder.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsEditModalOpen(false)}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      id="modal-title"
                    >
                      Edit Order
                    </h3>
                    <div className="mt-4">
                      <form className="space-y-4">
                        <div>
                          <label
                            htmlFor="customer"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Customer
                          </label>
                          <input
                            type="text"
                            name="customer"
                            id="customer"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Total
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                                $
                              </span>
                            </div>
                            <input
                              type="number"
                              name="total"
                              id="total"
                              className="pl-7 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveEditedOrder}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      id="modal-title"
                    >
                      Delete Order
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete order #
                        {selectedOrder.id}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {isAnalyticsModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsAnalyticsModalOpen(false)}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4"
                      id="modal-title"
                    >
                      Order Analytics
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
                                  borderRadius: "4px",
                                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                                }}
                              />
                              <Legend />
                              <Bar
                                dataKey="orders"
                                fill="#3B82F6"
                                name="Orders"
                                radius={[4, 4, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Order Status Distribution
                        </h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={statusAnalytics}
                              layout="vertical"
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
                                horizontal={true}
                                vertical={false}
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
                                  borderRadius: "4px",
                                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                                }}
                                formatter={(value) => [
                                  `${value} orders`,
                                  "Count",
                                ]}
                              />
                              <Legend />
                              <Bar
                                dataKey="value"
                                name="Count"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAnalyticsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 z-50 rounded-lg shadow-lg px-6 py-4 flex items-center ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white transition-all duration-300 transform translate-y-0 opacity-100`}
        >
          <span className="mr-2">
            {notification.type === "success" ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
}
