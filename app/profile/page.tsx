"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiAward,
  FiCalendar,
  FiEdit2,
  FiKey,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";

export default function ProfilePage() {
  // Animation states
  const [loaded, setLoaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  // In a real app, this would come from an API or auth context
  const [adminData, setAdminData] = useState({
    name: "John Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    role: "Super Admin",
    avatar: "/profile-avatar.jpg", // This would be a real image path in production
    joinDate: "February 12, 2022",
    address: "123 Business Ave, New York, NY 10001",
    lastActive: "Today at 9:30 AM",
    loginCount: 48,
    permissions: [
      "Full Access",
      "User Management",
      "Content Management",
      "Settings",
    ],
  });

  const openEditModal = () => {
    // Pre-fill form with current data
    setFormData({
      name: adminData.name,
      email: adminData.email,
      phone: adminData.phone,
      address: adminData.address,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Update admin data with form data
    setAdminData((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    }));

    // Close modal
    setIsEditModalOpen(false);

    // Show success notification - in a real app, you'd send this to an API
    alert("Profile updated successfully!");
  };

  return (
    <div
      className={`container mx-auto py-8 px-4 transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Pattern background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-900/10 to-transparent opacity-70 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-indigo/[0.03] bg-[size:20px_20px]"></div>
      </div>

      <div className="bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-gray-100 dark:border-gray-700/30">
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
          {/* Header pattern */}
          <div className="absolute inset-0 bg-pattern opacity-10"></div>

          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/10 to-indigo-500/20 animate-gradient-shift"></div>

          <div className="absolute -bottom-20 left-8">
            <div className="relative h-40 w-40 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white transform transition-all duration-500 hover:scale-105 group">
              {adminData.avatar ? (
                <Image
                  src={adminData.avatar}
                  alt={adminData.name}
                  width={160}
                  height={160}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                  // Fallback avatar if image fails to load
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    // Create beautiful gradient avatar with user initials
                    const initials = adminData.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase();

                    // Custom gradient background with user initials - much more beautiful than generic icon
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234F46E5'/%3E%3Cstop offset='50%25' stop-color='%23818CF8'/%3E%3Cstop offset='100%25' stop-color='%233B82F6'/%3E%3C/linearGradient%3E%3CradialGradient id='shadow' cx='50%25' cy='50%25' r='50%25' fx='50%25' fy='50%25'%3E%3Cstop offset='0%25' stop-color='rgba(0,0,0,0)'/%3E%3Cstop offset='100%25' stop-color='rgba(0,0,0,0.15)'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23gradient)'/%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23shadow)'/%3E%3Ctext x='100' y='120' font-family='Arial' font-size='80' font-weight='bold' text-anchor='middle' fill='white'%3E${initials}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-400 via-blue-500 to-violet-500 text-white">
                  <span className="text-4xl font-bold">
                    {adminData.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              )}

              {/* Add subtle radial highlight effect */}
              <div className="absolute inset-0 bg-radial-highlight opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"></div>

              {/* Status indicator with pulse animation */}
              <div className="absolute bottom-2 right-2 transition-all duration-300">
                <span className="flex h-4 w-4">
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-800"></span>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={openEditModal}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-all duration-200 shadow-lg hover:shadow-indigo-500/20 transform hover:scale-105"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>

          {/* Header stats */}
          <div className="absolute bottom-6 right-8 flex space-x-3">
            <div className="bg-white/15 backdrop-blur-md rounded-lg px-3 py-2 flex items-center space-x-2">
              <FiActivity className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                {adminData.lastActive}
              </span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-lg px-3 py-2 flex items-center space-x-2">
              <FiAward className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                {adminData.loginCount} logins
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-24 pb-10 px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div className="transform transition-all duration-500 hover:translate-x-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {adminData.name}
              </h1>
              <div className="flex items-center mt-1">
                <div className="h-6 w-6 rounded-md bg-indigo-500/20 flex items-center justify-center mr-2">
                  <FiShield className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <p className="bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text font-semibold">
                  {adminData.role}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-800/30 dark:to-emerald-800/30 dark:text-green-400 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-2 animate-pulse"></span>
                Active Account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/30 transform transition-all duration-500 hover:shadow-md hover:-translate-y-1">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="bg-blue-100 dark:bg-blue-900/30 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                  <FiUser className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </span>
                Personal Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-700/40 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center text-blue-500 shadow-sm">
                      <FiMail className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {adminData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-700/40 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center text-purple-500 shadow-sm">
                      <FiPhone className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {adminData.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-700/40 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-orange-500 shadow-sm">
                      <FiMapPin className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {adminData.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-700/40 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center text-green-500 shadow-sm">
                      <FiCalendar className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Join Date
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {adminData.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Access & Permissions */}
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/30 transform transition-all duration-500 hover:shadow-md hover:-translate-y-1">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                  <FiShield className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </span>
                Access & Permissions
              </h2>

              <div className="space-y-5">
                <div className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-700/40 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 flex items-center justify-center text-indigo-500 shadow-sm">
                      <FiShield className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Role
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {adminData.role}
                    </p>
                  </div>
                </div>

                <div className="p-3 hover:bg-white dark:hover:bg-gray-700/40 rounded-lg transition-colors duration-200">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 flex items-center justify-center text-teal-500 shadow-sm">
                        <FiKey className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permissions
                      </p>
                    </div>
                  </div>

                  <div className="ml-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {adminData.permissions.map((permission, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2.5 shadow-sm border border-gray-100 dark:border-gray-700/30 transform transition-all duration-300 hover:shadow-md hover:scale-105"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {permission}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openEditModal}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:translate-y-[-2px]"
            >
              Edit Profile
            </button>
            <button className="px-6 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md transition-all duration-200 transform hover:translate-y-[-2px]">
              Change Password
            </button>
            <button className="px-6 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md transition-all duration-200 transform hover:translate-y-[-2px]">
              Manage Permissions
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
              <button
                onClick={closeEditModal}
                className="bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg shadow-md transition-colors flex items-center"
              >
                <FiSave className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add this to your global CSS or tailwind.config.js */}
      <style jsx global>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .bg-grid-indigo {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M0 0h50v50H0V0zm50 50h50v50H50V50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .bg-radial-highlight {
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 70%
          );
        }

        @keyframes gradient-shift {
          0% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) rotate(360deg);
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s linear infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
