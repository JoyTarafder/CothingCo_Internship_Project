"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiMessageSquare,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

type User = {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  totalOrders: number;
  comment?: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "12",
      name: "test2",
      email: "test2@gmail.com",
      contact: "019",
      address: "dhaka",
      totalOrders: 0,
    },
    {
      id: "2",
      name: "test",
      email: "test@gmail.com",
      contact: "0178150000",
      address: "Dhaka basundora Dhaka",
      totalOrders: 3,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    totalOrders: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    // Generate a simple ID
    const newId = (
      Math.max(...users.map((u) => Number(u.id)), 0) + 1
    ).toString();

    setUsers([...users, { ...newUser, id: newId }]);
    setShowAddModal(false);
    setNewUser({
      id: "",
      name: "",
      email: "",
      contact: "",
      address: "",
      totalOrders: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.includes(searchQuery)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get total orders count
  const totalOrdersCount = users.reduce(
    (sum, user) => sum + user.totalOrders,
    0
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="User Management" />
        <main className="p-6 overflow-y-auto">
          {/* Header with Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                  <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="flex items-center justify-center w-9 h-9 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full dark:text-blue-400 dark:bg-blue-900/30 shadow-sm">
                  {users.length}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  All Users
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total registered users
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent dark:from-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex-shrink-0 p-3 rounded-full bg-green-100 dark:bg-green-900/30 group-hover:scale-110 transition-transform duration-300">
                  <FiShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="flex items-center justify-center w-9 h-9 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:text-green-400 dark:bg-green-900/30 shadow-sm">
                  {totalOrdersCount}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                  Total Orders
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All user orders
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 group-hover:scale-110 transition-transform duration-300">
                  <FiMail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="flex items-center justify-center w-9 h-9 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full dark:text-purple-400 dark:bg-purple-900/30 shadow-sm">
                  {users.filter((u) => u.email.includes("@")).length}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  Active Emails
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Users with valid emails
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex-shrink-0 p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:scale-110 transition-transform duration-300">
                  <FiPlus className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="rounded-full w-9 h-9 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors shadow-sm hover:shadow group-hover:scale-110 transition-transform duration-300"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  Add User
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Register a new user
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="block w-full p-3.5 pl-12 text-sm border rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary focus:outline-none transition-colors duration-200 shadow-sm"
                placeholder="Search users by name, email, address..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Press Enter to search
                </span>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4.5 text-sm font-medium text-gray-900 dark:text-white">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">
                            #{user.id}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex items-center">
                            <FiMail className="h-4 w-4 text-gray-400 mr-2" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-sm text-gray-700 dark:text-gray-300">
                          {user.contact}
                        </td>
                        <td className="px-6 py-4.5 text-sm text-gray-700 dark:text-gray-300">
                          <div className="max-w-xs truncate">
                            {user.address}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.totalOrders > 0
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {user.totalOrders}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-sm">
                          <div className="flex space-x-2">
                            <button
                              className="p-1.5 bg-teal-50 rounded-lg text-teal-600 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/30 transition-colors shadow-sm hover:shadow"
                              aria-label="Message user"
                            >
                              <FiMessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors shadow-sm hover:shadow"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
              {/* Pagination info */}
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredUsers.length}</span>{" "}
                  results
                </p>
              </div>

              {/* Pagination controls */}
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px overflow-hidden"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    // Show limited pagination buttons
                    if (
                      totalPages <= 7 ||
                      index === 0 ||
                      index === totalPages - 1 ||
                      (index >= currentPage - 2 && index <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? "z-10 bg-primary border-primary text-white hover:bg-primary-dark"
                              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    } else if (
                      (index === 1 && currentPage > 4) ||
                      (index === totalPages - 2 && currentPage < totalPages - 3)
                    ) {
                      return (
                        <span
                          key={index}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.min(page + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* Add User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 animate-scaleIn">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                      <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Add New User
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter user name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={newUser.contact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={newUser.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddUser}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Save User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No users message */}
          {paginatedUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 shadow-inner">
                <FiUsers className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
                {searchQuery
                  ? "No users match your search criteria. Try a different search term."
                  : "You haven't added any users yet. Get started by adding your first user."}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
              >
                <FiPlus className="mr-2" />
                Add Your First User
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
