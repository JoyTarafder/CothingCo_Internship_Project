"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  FiChevronDown,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import WishlistModal from "./WishlistModal";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { wishlistCount, openWishlistModal } = useWishlist();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navigation = [
    { name: "Home", href: "/shop" },
    {
      name: "Men",
      href: "/shop/men",
      submenu: [
        { name: "T-Shirts", href: "/shop/men/t-shirts" },
        { name: "Shirts", href: "/shop/men/shirts" },
        { name: "Pants", href: "/shop/men/pants" },
        { name: "Jackets", href: "/shop/men/jackets" },
        { name: "Accessories", href: "/shop/men/accessories" },
      ],
    },
    {
      name: "Women",
      href: "/shop/women",
      submenu: [
        { name: "Dresses", href: "/shop/women/dresses" },
        { name: "Tops", href: "/shop/women/tops" },
        { name: "Pants", href: "/shop/women/pants" },
        { name: "Skirts", href: "/shop/women/skirts" },
        { name: "Accessories", href: "/shop/women/accessories" },
      ],
    },
    {
      name: "Kids",
      href: "/shop/kids",
      submenu: [
        { name: "Boys", href: "/shop/kids/boys" },
        { name: "Girls", href: "/shop/kids/girls" },
        { name: "Infants", href: "/shop/kids/infants" },
        { name: "Accessories", href: "/shop/kids/accessories" },
      ],
    },
    { name: "About", href: "/shop/about" },
    { name: "Contact", href: "/shop/contact" },
  ];

  const footerLinks = {
    company: [
      { name: "About Us", href: "/shop/about" },
      { name: "Careers", href: "/shop/careers" },
      { name: "Store Locations", href: "/shop/storelocations" },
      { name: "Our Responsibility", href: "/shop/ourresponsibility" },
    ],
    support: [
      { name: "Help Center", href: "/shop/helpcenter" },
      { name: "Returns & Exchanges", href: "/shop/returnexchange" },
      { name: "Shipping Information", href: "/shop/shippinginfo" },
      { name: "Track Your Order", href: "/shop/trackorder" },
    ],
    legal: [
      { name: "Terms & Conditions", href: "/shop/terms" },
      { name: "Privacy Policy", href: "/shop/privacy" },
      { name: "Cookie Policy", href: "/shop/cookies" },
      { name: "Accessibility", href: "/shop/accessibility" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm">
        Free shipping on orders over ৳2000 | Use code WELCOME100 for ৳100 off
        your first order
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/shop" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-black dark:border-white flex items-center justify-center transform group-hover:border-yellow-400 transition-all duration-300">
                  <span className="text-black dark:text-white font-bold text-lg tracking-widest">
                    C
                  </span>
                </div>
              </div>
              <span className="text-xl font-light uppercase tracking-[0.2em] text-black dark:text-white">
                CLOTHINGCO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-10">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`text-sm uppercase font-light tracking-widest transition-all py-8 ${
                      pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`)
                        ? "text-yellow-500"
                        : "text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500"
                    }`}
                    onMouseEnter={() =>
                      item.submenu && setActiveCategory(item.name)
                    }
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <span className="flex items-center">
                      {item.name}
                      {item.submenu && (
                        <FiChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      )}
                    </span>
                    {(pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`)) && (
                      <span className="absolute bottom-5 left-0 w-full h-0.5 bg-yellow-500 transform origin-left"></span>
                    )}
                    {!(
                      pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`)
                    ) && (
                      <span className="absolute bottom-5 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transform origin-left transition-all duration-300"></span>
                    )}
                  </Link>

                  {/* Submenu */}
                  {item.submenu && activeCategory === item.name && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-0 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-md overflow-hidden z-50"
                      onMouseEnter={() => setActiveCategory(item.name)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <div className="py-4">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500 dark:hover:text-yellow-500 transition-all"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <Link
                            href={item.href}
                            className="block px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            View All {item.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-200"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={openWishlistModal}
                className="p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-200 relative"
                aria-label="Wishlist"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <Link
                href="/shop/cart"
                className="relative p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-200"
                aria-label="Cart"
              >
                <FiShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-500 text-black text-xs font-bold flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-200"
                  aria-label="User menu"
                >
                  <FiUser className="w-5 h-5" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-md shadow-xl py-1 z-50 border border-gray-100 dark:border-gray-700">
                    {user ? (
                      <>
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email || "user@example.com"}
                          </p>
                        </div>
                        <Link
                          href="/shop/account"
                          className="flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </span>
                          My Account
                        </Link>
                        <Link
                          href="/shop/account/orders"
                          className="flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                              <line x1="3" y1="6" x2="21" y2="6"></line>
                              <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                          </span>
                          My Orders
                        </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                          <button
                            onClick={() => {
                              logout();
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center w-full text-left px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500"
                          >
                            <span className="w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                              </svg>
                            </span>
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/shop/login"
                          className="flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                              <polyline points="10 17 15 12 10 7"></polyline>
                              <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                          </span>
                          Sign In
                        </Link>
                        <Link
                          href="/shop/register"
                          className="flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="8.5" cy="7" r="4"></circle>
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                          </span>
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-200"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Updated with better styling */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl">
            <nav className="px-4 pt-2 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <button
                    className={`flex items-center justify-between w-full px-4 py-4 text-base uppercase tracking-wider ${
                      pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`)
                        ? "text-yellow-500"
                        : "text-black dark:text-white"
                    }`}
                    onClick={() => {
                      if (item.submenu) {
                        setActiveCategory(
                          activeCategory === item.name ? null : item.name
                        );
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    {item.submenu && (
                      <FiChevronDown
                        className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                          activeCategory === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile submenu */}
                  {item.submenu && activeCategory === item.name && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 mb-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-yellow-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        View All {item.name}
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Account Links */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 px-4 mb-2">
                  Account
                </div>
                {user ? (
                  <>
                    <Link
                      href="/shop/account"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FiUser className="w-5 h-5 mr-3" />
                      My Account
                    </Link>
                    <Link
                      href="/shop/account/orders"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FiShoppingBag className="w-5 h-5 mr-3" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/shop/login"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      Sign In
                    </Link>
                    <Link
                      href="/shop/register"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md pt-20">
            <div className="max-w-3xl mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-light uppercase tracking-wider text-black dark:text-white">
                  Search
                </h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 rounded-full"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 py-4 pl-12 pr-4 text-black dark:text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none text-xl"
                  autoFocus
                />
                <FiSearch className="absolute left-0 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
              </form>
              <div className="mt-8">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "T-shirts",
                    "Dresses",
                    "Jeans",
                    "Jackets",
                    "Summer Collection",
                    "Accessories",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        // You could trigger the search here directly
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/20 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Wishlist Modal */}
      <WishlistModal />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="py-12 border-b border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-light uppercase tracking-wider mb-3">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-400 mb-0">
                  Stay updated with our latest collections and exclusive offers.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 rounded-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-500 text-black uppercase tracking-wider text-sm font-medium hover:bg-yellow-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 border border-white flex items-center justify-center">
                  <span className="text-white font-bold text-base tracking-widest">
                    C
                  </span>
                </div>
                <span className="text-lg font-light uppercase tracking-[0.2em]">
                  CLOTHINGCO
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your premier destination for quality clothing. We offer the
                latest fashion trends with unmatched style and comfort.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-6 font-medium">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-6 font-medium">
                Support
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-6 font-medium">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiMapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    123 Fashion Street, Dhaka 1000, Bangladesh
                  </span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="w-5 h-5 text-gray-400 mr-3" />
                  <a
                    href="tel:+8801712345678"
                    className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
                  >
                    +880 171 234 5678
                  </a>
                </li>
                <li className="flex items-center">
                  <FiMail className="w-5 h-5 text-gray-400 mr-3" />
                  <a
                    href="mailto:info@clothingco.com"
                    className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
                  >
                    info@clothingco.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ClothingCo. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xs"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
