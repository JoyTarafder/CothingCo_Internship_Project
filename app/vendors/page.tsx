"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiPackage,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

type Vendor = {
  id: string;
  name: string;
  type: string;
  email: string;
  contact: string;
  address: string;
  comment?: string;
};

export default function VendorManagementPage() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Test Vendor",
      type: "Shop",
      email: "vendor@gmail.com",
      contact: "017",
      address: "Dhaka Basundora",
      comment: "Good",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newVendor, setNewVendor] = useState<Vendor>({
    id: "",
    name: "",
    type: "",
    email: "",
    contact: "",
    address: "",
  });
  const [editVendor, setEditVendor] = useState<Vendor>({
    id: "",
    name: "",
    type: "",
    email: "",
    contact: "",
    address: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteVendor = (id: string) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.email) return;

    // Generate a simple ID
    const newId = (
      Math.max(...vendors.map((v) => Number(v.id)), 0) + 1
    ).toString();

    setVendors([...vendors, { ...newVendor, id: newId }]);
    setShowAddModal(false);
    setNewVendor({
      id: "",
      name: "",
      type: "",
      email: "",
      contact: "",
      address: "",
    });
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditVendor({ ...vendor });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editVendor.name || !editVendor.email) return;

    setVendors(
      vendors.map((vendor) =>
        vendor.id === editVendor.id ? { ...editVendor } : vendor
      )
    );
    setShowEditModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: value,
    });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditVendor({
      ...editVendor,
      [name]: value,
    });
  };

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.id.includes(searchQuery)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Vendor Management" />
        <main className="p-6 overflow-y-auto">
          {/* Header with Stats */}
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <FiPackage className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full dark:text-blue-400 dark:bg-blue-900/30">
                  {vendors.length}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  All Vendors
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total registered vendors
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className="flex-shrink-0 p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <FiSearch className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:text-green-400 dark:bg-green-900/30">
                  {vendors.filter((v) => v.type === "Shop").length}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Shop Vendors
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Shop type vendors
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <FiEdit className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full dark:text-purple-400 dark:bg-purple-900/30">
                  {vendors.filter((v) => v.type !== "Shop").length}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Other Vendors
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Non-shop type vendors
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className="flex-shrink-0 p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <FiPlus className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="rounded-full w-8 h-8 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Add Vendor
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Register a new vendor
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="block w-full p-3 pl-10 text-sm border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary focus:outline-none transition-colors duration-200 shadow-sm"
                  placeholder="Search vendors by name, email, address..."
                />
              </div>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Vendor Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
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
                      Comment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedVendors.length > 0 ? (
                    paginatedVendors.map((vendor) => (
                      <tr
                        key={vendor.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          #{vendor.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {vendor.name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              vendor.type === "Shop"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {vendor.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {vendor.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {vendor.contact}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {vendor.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {vendor.comment || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditVendor(vendor)}
                              className="p-1.5 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteVendor(vendor.id)}
                              className="p-1.5 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No vendors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
              {/* Pagination info */}
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredVendors.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredVendors.length}</span>{" "}
                  results
                </p>
              </div>

              {/* Pagination controls */}
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
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
                              ? "z-10 bg-primary border-primary text-white"
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
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
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

          {/* Add Vendor Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 animate-scaleIn">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                      <FiPackage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Add New Vendor
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newVendor.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Vendor Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={newVendor.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Type</option>
                      <option value="Shop">Shop</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Wholesaler">Wholesaler</option>
                    </select>
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
                      value={newVendor.email}
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
                      value={newVendor.contact}
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
                      value={newVendor.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={newVendor.comment || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter comment"
                      rows={3}
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
                      onClick={handleAddVendor}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Save Vendor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Vendor Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 animate-scaleIn">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                      <FiEdit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Edit Vendor
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      name="name"
                      value={editVendor.name}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-type"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Vendor Type
                    </label>
                    <select
                      id="edit-type"
                      name="type"
                      value={editVendor.type}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Type</option>
                      <option value="Shop">Shop</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Wholesaler">Wholesaler</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="edit-email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="edit-email"
                      name="email"
                      value={editVendor.email}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-contact"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="edit-contact"
                      name="contact"
                      value={editVendor.contact}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="edit-address"
                      name="address"
                      value={editVendor.address}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-comment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Comment
                    </label>
                    <textarea
                      id="edit-comment"
                      name="comment"
                      value={editVendor.comment || ""}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Enter comment"
                      rows={3}
                    />
                  </div>
                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No vendors message */}
          {paginatedVendors.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                <FiPackage className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No vendors found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                {searchQuery
                  ? "No vendors match your search criteria. Try a different search term."
                  : "You haven't added any vendors yet. Get started by adding your first vendor."}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark"
              >
                <FiPlus className="mr-2" />
                Add Your First Vendor
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
