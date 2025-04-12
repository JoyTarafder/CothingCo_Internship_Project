"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import {
  FiGlobe,
  FiImage,
  FiPlusCircle,
  FiSettings,
  FiShare2,
  FiTrash,
  FiX,
} from "react-icons/fi";

// Tab type
type TabType = "banners" | "general" | "seo" | "social";

// Banner interface
interface Banner {
  id: number;
  title: string;
  image: string;
  status: boolean;
}

// Banner Modal Props
interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, image: string) => void;
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

export default function SiteManagementPage() {
  // Active tab state
  const [activeTab, setActiveTab] = useState<TabType>("banners");

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sample banners data
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 7,
      title: "Winter Collection",
      image: "/banners/winter-collection.jpg",
      status: true,
    },
    {
      id: 4,
      title: "Sale 30% Off",
      image: "/banners/sale-banner.jpg",
      status: true,
    },
    {
      id: 2,
      title: "Summer Special",
      image: "/banners/summer-special.jpg",
      status: false,
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

  // Handle delete banner
  const deleteBanner = (id: number) => {
    setBanners(banners.filter((banner) => banner.id !== id));
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

  // Tab configurations
  const tabs = [
    { id: "banners", label: "Banners", icon: FiImage },
    { id: "general", label: "General Settings", icon: FiSettings },
    { id: "seo", label: "SEO Settings", icon: FiGlobe },
    { id: "social", label: "Social Media", icon: FiShare2 },
  ];

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "banners":
        return (
          <>
            {/* Add New Banner Card */}
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => setIsAddModalOpen(true)}
            >
              <div className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FiPlusCircle className="text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Add New Banner
                </h2>
              </div>
            </div>

            {/* All Banners Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  All Banners
                </h2>

                {/* Banner Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Banner Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Banner
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {banners.map((banner) => (
                        <tr
                          key={banner.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-800 dark:text-white">
                              {banner.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-32">
                              <img
                                src={banner.image}
                                alt={banner.title}
                                className="h-full rounded-md shadow-sm object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                              <input
                                type="checkbox"
                                id={`toggle-${banner.id}`}
                                checked={banner.status}
                                onChange={() => toggleStatus(banner.id)}
                                className="opacity-0 absolute block w-6 h-6 rounded-full bg-white border-4 cursor-pointer"
                              />
                              <label
                                htmlFor={`toggle-${banner.id}`}
                                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                                  banner.status
                                    ? "bg-blue-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <span
                                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                                    banner.status
                                      ? "translate-x-6"
                                      : "translate-x-0"
                                  }`}
                                ></span>
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => deleteBanner(banner.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2"
                            >
                              <FiTrash className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      case "general":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              General Settings
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your Site Name"
                    defaultValue="Taiga Admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site URL
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://yourdomain.com"
                    defaultValue="https://taiga-admin.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Brief description of your site"
                  rows={3}
                  defaultValue="Modern Admin Panel for your e-commerce application"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      case "seo":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              SEO Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Meta Title (60-70 characters)"
                  defaultValue="Taiga Admin Panel - Modern E-commerce Management"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Recommended length: 60-70 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Meta Description (150-160 characters)"
                  rows={3}
                  defaultValue="Taiga Admin Panel provides powerful tools for managing your e-commerce business, inventory, orders, and customers with an intuitive interface."
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Recommended length: 150-160 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. admin panel, e-commerce, management"
                  defaultValue="admin panel, e-commerce, inventory management, order tracking"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      case "social":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Social Media Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Facebook URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://facebook.com/yourpage"
                  defaultValue="https://facebook.com/taigaadmin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Twitter URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://twitter.com/yourhandle"
                  defaultValue="https://twitter.com/taigaadmin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://instagram.com/yourprofile"
                  defaultValue="https://instagram.com/taigaadmin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://linkedin.com/company/yourcompany"
                  defaultValue="https://linkedin.com/company/taigaadmin"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Save Changes
                </button>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Site Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage website settings, banners, SEO, and social media links
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center py-4 border-b-2 font-medium text-sm focus:outline-none ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Add Banner Modal */}
          <AddBannerModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={addBanner}
          />
        </main>
      </div>
    </div>
  );
}
