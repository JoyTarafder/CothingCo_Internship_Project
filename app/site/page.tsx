"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import {
  FiBell,
  FiGlobe,
  FiImage,
  FiPlus,
  FiPlusCircle,
  FiSettings,
  FiShare2,
  FiSliders,
  FiTrash,
  FiX,
} from "react-icons/fi";

// Tab type
type TabType = "banners" | "general" | "seo" | "social" | "notifications";

// Banner interface
interface Banner {
  id: number;
  title: string;
  image: string;
  status: boolean;
}

// Notification interface
interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  status: boolean;
  startDate: string;
  endDate: string;
}

// Banner Modal Props
interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, image: string) => void;
}

// Notification Modal Props
interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (notification: Omit<Notification, "id">) => void;
}

// Banner Add Modal Component
const AddBannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && image) {
      onAdd(title, image);
      setTitle("");
      setImage("");
      setPreviewImage(null);
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setPreviewImage(imageUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Add New Banner
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Banner Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter banner title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Banner Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {previewImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-40 object-contain mb-3"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setImage("");
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Add Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Notification Add Modal Component
const AddNotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<Notification["type"]>("info");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && message && startDate && endDate) {
      onAdd({
        title,
        message,
        type,
        status: true,
        startDate,
        endDate,
      });
      setTitle("");
      setMessage("");
      setType("info");
      setStartDate("");
      setEndDate("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Add New Notification
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Notification Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter notification title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter notification message"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Notification Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as Notification["type"])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="info">Information</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function SiteManagementPage() {
  // Active tab state
  const [activeTab, setActiveTab] = useState<TabType>("banners");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddNotificationModalOpen, setIsAddNotificationModalOpen] =
    useState(false);

  // Sample banners data
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 7,
      title: "Winter Collection",
      image: "https://i.imgur.com/uKQqsuA.jpg",
      status: true,
    },
    {
      id: 4,
      title: "Sale 30% Off",
      image:
        "https://i.ibb.co.com/dsBZ0MfV/winter-collection-design-template-fe990eac161e0a26bc20be885059b39f-screen.jpg",
      status: true,
    },
    {
      id: 2,
      title: "Summer Special",
      image:
        "https://i.ibb.co.com/dsBZ0MfV/winter-collection-design-template-fe990eac161e0a26bc20be885059b39f-screen.jpg",
      status: false,
    },
  ]);

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Welcome to our store",
      message: "Thank you for visiting our online store. Enjoy shopping!",
      type: "info",
      status: true,
      startDate: "2025-04-01",
      endDate: "2025-04-30",
    },
    {
      id: 2,
      title: "Special Discount",
      message: "Get 20% off on all products for a limited time!",
      type: "success",
      status: true,
      startDate: "2025-04-15",
      endDate: "2025-05-15",
    },
    {
      id: 3,
      title: "Holiday Notice",
      message: "Our store will be closed on April 30th for maintenance.",
      type: "warning",
      status: false,
      startDate: "2025-04-25",
      endDate: "2025-04-30",
    },
  ]);

  // Handle status toggle
  const toggleStatus = (id: number) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, status: !banner.status } : banner
      )
    );
  };

  // Handle toggle notification status
  const toggleNotificationStatus = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: !notification.status }
          : notification
      )
    );
  };

  // Handle delete banner
  const deleteBanner = (id: number) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  // Handle delete notification
  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Handle add banner
  const addBanner = (title: string, image: string) => {
    const newBanner: Banner = {
      id: Math.floor(Math.random() * 1000), // Generate random ID
      title,
      image,
      status: true,
    };
    setBanners([...banners, newBanner]);
  };

  // Handle add notification
  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      id: Math.floor(Math.random() * 1000), // Generate random ID
      ...notification,
    };
    setNotifications([...notifications, newNotification]);
  };

  // Tab configurations
  const tabs = [
    { id: "banners", label: "Banners", icon: FiImage },
    { id: "general", label: "General Settings", icon: FiSliders },
    { id: "seo", label: "SEO Settings", icon: FiGlobe },
    { id: "social", label: "Social Media", icon: FiShare2 },
    { id: "notifications", label: "Notifications", icon: FiBell },
  ];

  // Helper function to get notification type style
  const getNotificationTypeStyle = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "banners":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            {/* Banner Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <FiImage className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Banners
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {banners.length}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Active Banners
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {banners.filter((banner) => banner.status).length}
                  </p>
                </div>
              </div>

              <div
                className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow duration-300"
                onClick={() => setIsAddModalOpen(true)}
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <FiPlusCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Add New
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Create Banner
                  </p>
                </div>
              </div>
            </div>

            {/* Banner Table */}
            <div className="overflow-x-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FiImage className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    All Banners
                  </h2>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Total: {banners.length}</span>
                    <span className="mx-2">•</span>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="flex items-center text-primary hover:text-primary-dark transition-colors"
                    >
                      <FiPlus className="mr-1 h-4 w-4" />
                      Add New
                    </button>
                  </div>
                </div>

                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Banner
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {banners.length > 0 ? (
                      banners.map((banner) => (
                        <tr
                          key={banner.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                <img
                                  src={banner.image}
                                  alt={banner.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {banner.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {banner.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleStatus(banner.id)}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                banner.status
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  banner.status
                                    ? "bg-green-600 dark:bg-green-500"
                                    : "bg-gray-600 dark:bg-gray-400"
                                }`}
                              ></span>
                              {banner.status ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => toggleStatus(banner.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  banner.status
                                    ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                                }`}
                                aria-label="Toggle status"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>

                              <button
                                onClick={() => deleteBanner(banner.id)}
                                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                aria-label="Delete banner"
                              >
                                <FiTrash className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <FiImage className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                              No banners found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                              Get started by creating your first banner
                            </p>
                            <button
                              onClick={() => setIsAddModalOpen(true)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark"
                            >
                              <FiPlus className="mr-2 h-4 w-4" />
                              Add Banner
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "general":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            <div className="border-b border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                      <FiSettings className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      General Settings
                    </h2>
                  </div>
                  <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full">
                    Core Configuration
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Configure basic information about your website that appears
                  across all pages.
                </p>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your Site Name"
                        defaultValue="Taiga Admin"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        This will be displayed in the browser tab and title bar
                      </p>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Site URL
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                          placeholder="yourdomain.com"
                          defaultValue="taiga-admin.com"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your website's main address
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    Description & Content
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Site Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Brief description of your site"
                      rows={4}
                      defaultValue="Modern Admin Panel for your e-commerce application"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      This description will appear in search results and when
                      sharing your site
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Default Language
                      </label>
                      <select
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Time Zone
                      </label>
                      <select
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        defaultValue="UTC"
                      >
                        <option value="UTC">
                          UTC (Coordinated Universal Time)
                        </option>
                        <option value="EST">EST (Eastern Standard Time)</option>
                        <option value="CST">CST (Central Standard Time)</option>
                        <option value="MST">
                          MST (Mountain Standard Time)
                        </option>
                        <option value="PST">PST (Pacific Standard Time)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-5">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mr-3"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case "seo":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            <div className="border-b border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                      <FiGlobe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      SEO Settings
                    </h2>
                  </div>
                  <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs px-3 py-1 rounded-full">
                    Search Optimization
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Optimize your website for search engines and improve your
                  visibility in search results.
                </p>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                    <svg
                      className="h-5 w-5 text-purple-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                      />
                    </svg>
                    Page Metadata
                  </h3>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Meta Title (60-70 characters)"
                      defaultValue="Taiga Admin Panel - Modern E-commerce Management"
                    />
                    <div className="mt-2 flex justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Recommended length: 60-70 characters
                      </p>
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        57 characters
                      </span>
                    </div>

                    <div className="mt-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        SERP Preview
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 text-base font-medium mt-2 truncate">
                        Taiga Admin Panel - Modern E-commerce Management
                      </p>
                      <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                        https://taiga-admin.com
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        Taiga Admin Panel provides powerful tools for managing
                        your e-commerce business, inventory, orders, and
                        customers with an intuitive interface.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Meta Description (150-160 characters)"
                      rows={3}
                      defaultValue="Taiga Admin Panel provides powerful tools for managing your e-commerce business, inventory, orders, and customers with an intuitive interface."
                    />
                    <div className="mt-2 flex justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Recommended length: 150-160 characters
                      </p>
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        140 characters
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                    <svg
                      className="h-5 w-5 text-purple-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    Keywords & Indexing
                  </h3>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Focus Keywords
                    </label>
                    <div className="flex flex-wrap items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 px-3 py-1">
                      {[
                        "admin panel",
                        "e-commerce",
                        "inventory management",
                        "order tracking",
                      ].map((keyword) => (
                        <span
                          key={keyword}
                          className="m-1 flex items-center text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full overflow-hidden"
                        >
                          <span className="pl-2.5 pr-1 py-1.5">{keyword}</span>
                          <button className="p-1.5 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder="Add a keyword..."
                        className="flex-grow outline-none px-2 py-1.5 bg-transparent text-gray-800 dark:text-white text-sm min-w-[120px]"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter keywords separated by commas or press Enter
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Robots Meta Tag
                      </label>
                      <select
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        defaultValue="index,follow"
                      >
                        <option value="index,follow">
                          Index, Follow (Default)
                        </option>
                        <option value="noindex,follow">No Index, Follow</option>
                        <option value="index,nofollow">Index, No Follow</option>
                        <option value="noindex,nofollow">
                          No Index, No Follow
                        </option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Controls search engine behavior
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Canonical URL
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://yourdomain.com"
                        defaultValue="https://taiga-admin.com"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Prevents duplicate content issues
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-5">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mr-3"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case "social":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            <div className="border-b border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-3">
                      <FiShare2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Social Media Settings
                    </h2>
                  </div>
                  <span className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs px-3 py-1 rounded-full">
                    Social Presence
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect your site with popular social media platforms to
                  extend your reach.
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Facebook */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Facebook
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Connect your Facebook page
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="relative inline-block w-10 align-middle select-none">
                          <input
                            type="checkbox"
                            id="facebook-toggle"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="block h-6 rounded-full bg-gray-200 dark:bg-gray-700 w-12 peer-checked:bg-blue-600"></div>
                          <div className="absolute w-4 h-4 rounded-full bg-white left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="relative">
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          facebook.com/
                        </span>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="yourpage"
                          defaultValue="taigaadmin"
                        />
                      </div>
                      <div className="mt-3">
                        <a
                          href="https://facebook.com/taigaadmin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          View page
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Twitter */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-900/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                        <svg
                          className="w-6 h-6 text-sky-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Twitter
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Connect your Twitter account
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="relative inline-block w-10 align-middle select-none">
                          <input
                            type="checkbox"
                            id="twitter-toggle"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="block h-6 rounded-full bg-gray-200 dark:bg-gray-700 w-12 peer-checked:bg-sky-500"></div>
                          <div className="absolute w-4 h-4 rounded-full bg-white left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="relative">
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          @
                        </span>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                          placeholder="username"
                          defaultValue="taigaadmin"
                        />
                      </div>
                      <div className="mt-3">
                        <a
                          href="https://twitter.com/taigaadmin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-sky-500 dark:text-sky-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          View profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                        <svg
                          className="w-6 h-6 text-pink-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.265.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Instagram
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Connect your Instagram profile
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="relative inline-block w-10 align-middle select-none">
                          <input
                            type="checkbox"
                            id="instagram-toggle"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="block h-6 rounded-full bg-gray-200 dark:bg-gray-700 w-12 peer-checked:bg-pink-500"></div>
                          <div className="absolute w-4 h-4 rounded-full bg-white left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="relative">
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          instagram.com/
                        </span>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                          placeholder="username"
                          defaultValue="taigaadmin"
                        />
                      </div>
                      <div className="mt-3">
                        <a
                          href="https://instagram.com/taigaadmin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-pink-600 dark:text-pink-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          View profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                        <svg
                          className="w-6 h-6 text-blue-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          LinkedIn
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Connect your LinkedIn company page
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="relative inline-block w-10 align-middle select-none">
                          <input
                            type="checkbox"
                            id="linkedin-toggle"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="block h-6 rounded-full bg-gray-200 dark:bg-gray-700 w-12 peer-checked:bg-blue-700"></div>
                          <div className="absolute w-4 h-4 rounded-full bg-white left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="relative">
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          linkedin.com/company/
                        </span>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-700 dark:bg-gray-700 dark:text-white"
                          placeholder="companyname"
                          defaultValue="taigaadmin"
                        />
                      </div>
                      <div className="mt-3">
                        <a
                          href="https://linkedin.com/company/taigaadmin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-700 dark:text-blue-400 hover:underline flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          View company page
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add More Social Platform Button */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-dashed rounded-xl overflow-hidden flex items-center justify-center p-8 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                      <FiPlus className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Add More Platforms
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Connect other social networks
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-700 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mr-3"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            {/* Notification Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <FiBell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Notifications
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {notifications.length}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Active Notifications
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {
                      notifications.filter(
                        (notification) => notification.status
                      ).length
                    }
                  </p>
                </div>
              </div>

              <div
                className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow duration-300"
                onClick={() => setIsAddNotificationModalOpen(true)}
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <FiPlusCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Add New
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Create Notification
                  </p>
                </div>
              </div>
            </div>

            {/* Notifications Table */}
            <div className="overflow-x-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FiBell className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                    All Notifications
                  </h2>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Total: {notifications.length}</span>
                    <span className="mx-2">•</span>
                    <button
                      onClick={() => setIsAddNotificationModalOpen(true)}
                      className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <FiPlus className="mr-1 h-4 w-4" />
                      Add New
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    About Popup Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Popup notifications appear to users when they visit your
                    site. They can be used for announcements, promotions, or
                    important information. Set the date range to control when
                    notifications are shown to users.
                  </p>
                </div>

                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Date Range
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <tr
                          key={notification.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {notification.id}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                              {notification.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${getNotificationTypeStyle(
                                notification.type
                              )}`}
                            >
                              {notification.type.charAt(0).toUpperCase() +
                                notification.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(
                                notification.startDate
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                notification.endDate
                              ).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                toggleNotificationStatus(notification.id)
                              }
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                notification.status
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  notification.status
                                    ? "bg-green-600 dark:bg-green-500"
                                    : "bg-gray-600 dark:bg-gray-400"
                                }`}
                              ></span>
                              {notification.status ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="p-1.5 rounded-lg transition-colors text-red-600 hover:text-red-900 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                            >
                              <FiTrash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                        >
                          No notifications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Site Management" />
        <main className="p-6 overflow-y-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Site Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage website settings, banners, SEO, and social media links
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 flex items-center">
                  <FiGlobe className="mr-2 h-5 w-5" />
                  <span>
                    Active Settings:{" "}
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-5">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                  activeTab === tab.id
                    ? "border-primary dark:border-primary-dark ring-1 ring-primary"
                    : "border-gray-100 dark:border-gray-700"
                } hover:shadow-lg transition-all duration-300 group relative overflow-hidden cursor-pointer`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getTabGradient(
                    tab.id
                  )} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <div
                    className={`flex-shrink-0 p-3 rounded-full ${getTabBgColor(
                      tab.id
                    )} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tab.icon
                      className={`w-6 h-6 ${getTabIconColor(tab.id)}`}
                    />
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activeTab === tab.id
                        ? "bg-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                </div>
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold text-gray-800 dark:text-white group-hover:${getTabHoverColor(
                      tab.id
                    )} transition-colors`}
                  >
                    {tab.label}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getTabDescription(tab.id)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Add Banner Modal */}
          <AddBannerModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={addBanner}
          />

          {/* Add Notification Modal */}
          <AddNotificationModal
            isOpen={isAddNotificationModalOpen}
            onClose={() => setIsAddNotificationModalOpen(false)}
            onAdd={addNotification}
          />
        </main>
      </div>
    </div>
  );
}

// Helper functions for tab colors and descriptions
function getTabGradient(tabId: string): string {
  switch (tabId) {
    case "banners":
      return "from-blue-50 to-transparent dark:from-blue-900/10";
    case "general":
      return "from-green-50 to-transparent dark:from-green-900/10";
    case "seo":
      return "from-purple-50 to-transparent dark:from-purple-900/10";
    case "social":
      return "from-amber-50 to-transparent dark:from-amber-900/10";
    case "notifications":
      return "from-purple-50 to-transparent dark:from-purple-900/10";
    default:
      return "from-gray-50 to-transparent dark:from-gray-900/10";
  }
}

function getTabBgColor(tabId: string): string {
  switch (tabId) {
    case "banners":
      return "bg-blue-100 dark:bg-blue-900/30";
    case "general":
      return "bg-green-100 dark:bg-green-900/30";
    case "seo":
      return "bg-purple-100 dark:bg-purple-900/30";
    case "social":
      return "bg-amber-100 dark:bg-amber-900/30";
    case "notifications":
      return "bg-purple-100 dark:bg-purple-900/30";
    default:
      return "bg-gray-100 dark:bg-gray-800/30";
  }
}

function getTabIconColor(tabId: string): string {
  switch (tabId) {
    case "banners":
      return "text-blue-600 dark:text-blue-400";
    case "general":
      return "text-green-600 dark:text-green-400";
    case "seo":
      return "text-purple-600 dark:text-purple-400";
    case "social":
      return "text-amber-600 dark:text-amber-400";
    case "notifications":
      return "text-purple-600 dark:text-purple-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

function getTabHoverColor(tabId: string): string {
  switch (tabId) {
    case "banners":
      return "text-blue-700 dark:text-blue-400";
    case "general":
      return "text-green-700 dark:text-green-400";
    case "seo":
      return "text-purple-700 dark:text-purple-400";
    case "social":
      return "text-amber-700 dark:text-amber-400";
    case "notifications":
      return "text-purple-700 dark:text-purple-400";
    default:
      return "text-gray-700 dark:text-gray-400";
  }
}

function getTabDescription(tabId: string): string {
  switch (tabId) {
    case "banners":
      return "Manage homepage banner images";
    case "general":
      return "Configure basic site information";
    case "seo":
      return "Optimize search engine visibility";
    case "social":
      return "Connect social media accounts";
    case "notifications":
      return "Configure notification settings";
    default:
      return "";
  }
}
