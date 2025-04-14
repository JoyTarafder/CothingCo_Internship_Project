"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiEye,
  FiMail,
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    totalOrders: 0,
  });
  const [editUser, setEditUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    totalOrders: 0,
  });
  const [viewUser, setViewUser] = useState<User>({
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

  const handleEditClick = (user: User) => {
    setEditUser({ ...user });
    setShowEditModal(true);
  };

  const handleViewClick = (user: User) => {
    setViewUser({ ...user });
    setShowViewModal(true);
  };

  const handleUpdateUser = () => {
    if (!editUser.name || !editUser.email) return;

    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    setShowEditModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
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
          <div className="relative mb-12">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl -z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-purple-300/20 to-transparent rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-blue-300/20 to-transparent rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* User Count Card */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:w-28 group-hover:h-28 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex-shrink-0 p-3.5 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="flex items-center justify-center w-10 h-10 text-sm font-bold text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 shadow-inner rounded-full">
                    {users.length}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    All Users
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Total registered users
                  </p>
                </div>
              </div>

              {/* Orders Card */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl group-hover:w-28 group-hover:h-28 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex-shrink-0 p-3.5 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-900/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <FiShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="flex items-center justify-center w-10 h-10 text-sm font-bold text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30 shadow-inner rounded-full">
                    {totalOrdersCount}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    Total Orders
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    All user purchase history
                  </p>
                </div>
              </div>

              {/* Emails Card */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:w-28 group-hover:h-28 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex-shrink-0 p-3.5 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-900/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <FiMail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="flex items-center justify-center w-10 h-10 text-sm font-bold text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30 shadow-inner rounded-full">
                    {users.filter((u) => u.email.includes("@")).length}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                    Active Emails
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Users with valid email accounts
                  </p>
                </div>
              </div>

              {/* Add User Card */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:w-28 group-hover:h-28 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex-shrink-0 p-3.5 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <FiUser className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-700/40 dark:to-amber-700/20 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:shadow-md transition-all duration-300 group-hover:scale-110"
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    Add User
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Register a new account
                  </p>
                </div>
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
                className="block w-full p-4 pl-12 text-sm border rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary focus:outline-none transition-colors duration-200 shadow-sm hover:shadow-md"
                placeholder="Search users by name, email, address..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-gray-500">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  Press Enter to search
                </span>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8 group transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="overflow-x-auto relative">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors relative"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2.5 py-1.5 rounded-md text-xs font-semibold">
                            #{user.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 flex items-center justify-center mr-3 shadow-sm">
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex items-center">
                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-full mr-2 shadow-sm">
                              <FiMail className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                            </div>
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {user.contact}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          <div className="max-w-xs truncate">
                            {user.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              user.totalOrders > 0
                                ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 dark:from-green-900/30 dark:to-green-900/10 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {user.totalOrders}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewClick(user)}
                              className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-blue-600 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/20 dark:to-blue-900/10 dark:text-blue-400 dark:hover:from-blue-900/30 dark:hover:to-blue-900/20 transition-colors shadow-sm hover:shadow"
                              aria-label="View user"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditClick(user)}
                              className="p-2 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg text-teal-600 hover:from-teal-100 hover:to-teal-200 dark:from-teal-900/20 dark:to-teal-900/10 dark:text-teal-400 dark:hover:from-teal-900/30 dark:hover:to-teal-900/20 transition-colors shadow-sm hover:shadow"
                              aria-label="Edit user"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 bg-gradient-to-br from-red-50 to-red-100 rounded-lg text-red-600 hover:from-red-100 hover:to-red-200 dark:from-red-900/20 dark:to-red-900/10 dark:text-red-400 dark:hover:from-red-900/30 dark:hover:to-red-900/20 transition-colors shadow-sm hover:shadow"
                              aria-label="Delete user"
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
                        className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center">
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                            <FiUsers className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                          </div>
                          No users found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
              {/* Pagination info */}
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredUsers.length}
                  </span>{" "}
                  results
                </p>
              </div>

              {/* Pagination controls */}
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px overflow-hidden"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2.5 border text-sm font-medium rounded-l-md ${
                      currentPage === 1
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
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
                          className={`relative inline-flex items-center px-4 py-2.5 border text-sm font-medium ${
                            currentPage === index + 1
                              ? "z-10 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-600 border-blue-500 dark:border-blue-700 text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-800 dark:hover:to-blue-700"
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
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
                          className="relative inline-flex items-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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
                    className={`relative inline-flex items-center px-3 py-2.5 border text-sm font-medium rounded-r-md ${
                      currentPage === totalPages
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
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
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-scaleIn relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal background decorations */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-center mb-6 relative">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/20 rounded-xl mr-3 shadow-sm">
                      <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Add New User
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-5 relative">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter user name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={newUser.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={newUser.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="inline-flex justify-center py-2.5 px-5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddUser}
                      className="inline-flex justify-center py-2.5 px-5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      Save User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-scaleIn relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal background decorations */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-center mb-6 relative">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-gradient-to-br from-teal-100 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/20 rounded-xl mr-3 shadow-sm">
                      <FiEdit2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Edit User
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-5 relative">
                  <div>
                    <label
                      htmlFor="edit-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter user name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="edit-email"
                      name="email"
                      value={editUser.email}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-contact"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="edit-contact"
                      name="contact"
                      value={editUser.contact}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="edit-address"
                      name="address"
                      value={editUser.address}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="inline-flex justify-center py-2.5 px-5 border border-gray-300 dark:border-gray-600 shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateUser}
                      className="inline-flex justify-center py-2.5 px-5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
                    >
                      Update User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View User Modal */}
          {showViewModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-full max-w-xs mx-4 animate-scaleIn relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl z-0"></div>

                {/* Modal background decorations */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500/5 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex justify-between items-center mb-4 relative z-10">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg mr-2 shadow-sm">
                      <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 dark:text-white">
                      User Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex justify-center items-center mb-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-md"></div>
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/60 dark:to-indigo-900/40 flex items-center justify-center shadow-md relative z-10 border-2 border-white dark:border-gray-700">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {viewUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Name & ID
                      </h4>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                          {viewUser.name}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          #{viewUser.id}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Email Address
                      </h4>
                      <div className="flex items-center">
                        <div className="p-1 bg-purple-100 dark:bg-purple-900/20 rounded-full mr-1.5 shadow-sm">
                          <FiMail className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-xs text-gray-900 dark:text-white font-medium truncate">
                          {viewUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Contact
                        </h4>
                        <p className="text-xs text-gray-900 dark:text-white font-medium">
                          {viewUser.contact || "Not provided"}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Orders
                        </h4>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold mr-1 ${
                              viewUser.totalOrders > 0
                                ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 dark:from-green-900/30 dark:to-green-900/10 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {viewUser.totalOrders}
                          </span>
                          <p className="text-xs text-gray-900 dark:text-white">
                            {viewUser.totalOrders > 0 ? "orders" : "order"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Address
                      </h4>
                      <p className="text-xs text-gray-900 dark:text-white font-medium">
                        {viewUser.address || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowViewModal(false);
                        handleEditClick(viewUser);
                      }}
                      className="inline-flex justify-center items-center py-1.5 px-3 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/10 hover:border-teal-300 dark:hover:border-teal-700 focus:outline-none transition-all duration-200"
                    >
                      <FiEdit2 className="mr-1 h-3 w-3" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowViewModal(false)}
                      className="inline-flex justify-center items-center py-1.5 px-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No users message */}
          {paginatedUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-purple-300/10 to-transparent rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-blue-300/10 to-transparent rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/2"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="p-5 bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/10 rounded-full mb-5 shadow-inner">
                  <FiUsers className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
                  {searchQuery
                    ? "No users match your search criteria. Try a different search term."
                    : "You haven't added any users yet. Get started by adding your first user."}
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <FiPlus className="mr-2" />
                  Add Your First User
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
