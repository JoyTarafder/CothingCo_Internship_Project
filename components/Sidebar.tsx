"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBox,
  FiHome,
  FiLogOut,
  FiSettings,
  FiShoppingCart,
  FiTag,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Order Management", path: "/orders", icon: FiShoppingCart },
    { name: "Inventory", path: "/inventory", icon: FiBox },
    { name: "Category Management", path: "/categories", icon: FiTag },
    { name: "User Management", path: "/users", icon: FiUsers },
    { name: "Vendor Management", path: "/vendors", icon: FiTruck },
    { name: "Site Management", path: "/site", icon: FiSettings },
  ];

  return (
    <aside className="h-screen w-64 fixed top-0 left-0 overflow-y-auto bg-gradient-to-b from-indigo-900 via-background-dark to-gray-900 shadow-xl">
      <div
        className="px-6 py-8 border-b border-gray-700/50"
        suppressHydrationWarning
      >
        <div className="flex items-center space-x-3" suppressHydrationWarning>
          <div
            className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center"
            suppressHydrationWarning
          >
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Admin Panel
          </h1>
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-primary/90 to-primary-dark/90 text-white shadow-md shadow-primary/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full px-4 py-6 border-t border-gray-700/50 bg-gray-900/30 backdrop-blur-sm">
        <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300">
          <FiLogOut className="h-5 w-5 mr-3 text-red-400" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
