"use client";

import CustomerLayout from "@/components/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/context/CategoriesContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiAward,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

// Mock product data with real images
const featuredProducts = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    price: 1200,
    originalPrice: 1500,
    image: "/images/products/1-classic-cotton-tshirt.jpg",
    category: "Men",
    rating: 4.5,
    reviews: 128,
    colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isOnSale: true,
  },
  {
    id: "2",
    name: "Women's Summer Dress",
    price: 2500,
    image: "/images/products/women_123.jpg",
    category: "Women",
    rating: 4.8,
    reviews: 95,
    colors: ["#FFB6C1", "#87CEEB", "#98FB98"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
  },
  {
    id: "3",
    name: "Kids Casual Joggers",
    price: 800,
    originalPrice: 1000,
    image: "/images/products/3-kids-casual-joggers.jpg",
    category: "Kids",
    rating: 4.3,
    reviews: 67,
    colors: ["#000000", "#808080"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    isOnSale: true,
  },
  {
    id: "4",
    name: "Premium Hoodie",
    price: 3500,
    image: "/images/products/4-premium-hoodie.jpg",
    category: "Men",
    rating: 4.7,
    reviews: 203,
    colors: ["#000000", "#808080", "#000080"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const trendingProducts = [
  {
    id: "5",
    name: "Slim Fit Jeans",
    price: 2200,
    image: "/images/products/5-slim-fit-jeans.jpg",
    category: "Men",
    rating: 4.6,
    reviews: 156,
    colors: ["#000080", "#1E90FF"],
    sizes: ["30", "32", "34", "36"],
    isNew: true,
  },
  {
    id: "6",
    name: "Floral Print Blouse",
    price: 1800,
    originalPrice: 2200,
    image: "/images/products/6-floral-print-blouse.jpg",
    category: "Women",
    rating: 4.4,
    reviews: 89,
    colors: ["#FFFFFF", "#FFB6C1"],
    sizes: ["XS", "S", "M", "L"],
    isOnSale: true,
  },
  {
    id: "7",
    name: "Kids Graphic T-Shirt",
    price: 700,
    image: "/images/products/7-kids-graphic-tshirt.jpg",
    category: "Kids",
    rating: 4.5,
    reviews: 42,
    colors: ["#FFFFFF", "#87CEEB", "#98FB98"],
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: "8",
    name: "Oversized Sweater",
    price: 2800,
    image: "/images/products/8-oversized-sweater.jpg",
    category: "Women",
    rating: 4.9,
    reviews: 112,
    colors: ["#D3D3D3", "#FFB6C1", "#000000"],
    sizes: ["S", "M", "L"],
    isNew: true,
  },
];

// Collection images with improved data structure
const collections = [
  {
    name: "Men's Collection",
    description: "Discover our latest men's fashion",
    image: "/images/products/men123.png",
    href: "/shop/men",
    featured: true,
    gradient: "from-blue-900 to-gray-900",
  },
  {
    name: "Women's Collection",
    description: "Elegant styles for every occasion",
    image: "/images/products/women_123.jpg",
    href: "/shop/women",
    featured: true,
    gradient: "from-pink-900 to-purple-900",
  },
  {
    name: "Kids Collection",
    description: "Comfortable and fun clothing for kids",
    image: "/images/products/kids123.png",
    href: "/shop/kids",
    featured: true,
    gradient: "from-green-900 to-blue-900",
  },
  {
    name: "Formal Collection",
    description: "Sophisticated styles for special occasions",
    image: "/images/collections/formal-collection.jpg",
    href: "/shop/collections/formal",
    gradient: "from-gray-900 to-black",
  },
  {
    name: "Casual Collection",
    description: "Everyday comfort with style",
    image: "/images/collections/casual-collection.jpg",
    href: "/shop/collections/casual",
    gradient: "from-orange-900 to-red-900",
  },
];

const features = [
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "Free shipping on orders over ৳2000",
    color: "bg-blue-500",
  },
  {
    icon: FiShield,
    title: "Secure Payment",
    description: "100% secure payment processing",
    color: "bg-green-500",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    color: "bg-purple-500",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Fashion Enthusiast",
    content:
      "Amazing quality and style! The clothes fit perfectly and the delivery was super fast.",
    rating: 5,
    image: "/images/profile-avatar.jpg",
  },
  {
    name: "Rahul Khan",
    role: "Business Professional",
    content:
      "Great collection for office wear. The formal shirts are exactly what I was looking for.",
    rating: 5,
    image: "/images/profile-avatar.jpg",
  },
  {
    name: "Fatima Hassan",
    role: "Mother of Two",
    content:
      "Love the kids collection! My children are comfortable and look adorable in these clothes.",
    rating: 5,
    image: "/images/profile-avatar.jpg",
  },
];

// Stats data
const stats = [
  { label: "Happy Customers", value: "50K+", icon: FiUsers },
  { label: "Products Sold", value: "100K+", icon: FiShoppingBag },
  { label: "5-Star Reviews", value: "25K+", icon: FiStar },
  { label: "Years of Trust", value: "5+", icon: FiAward },
];

// Login Component for when user is not authenticated
function ShopLoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use the AuthContext login function
      const success = await login(email, password);

      if (success) {
        router.push("/shop");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Hero Section with Login */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/collections/casual-collection.jpg"
            alt="Fashion Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Brand Info */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Fashion
              <span className="block text-yellow-500">Redefined</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Discover our premium collection of clothing designed for the
              modern lifestyle. Quality meets style in every piece.
            </p>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to explore our exclusive collections
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Demo Credentials: user@example.com / password
              </p>
              <Link
                href="/shop/signup"
                className="text-yellow-500 hover:text-yellow-600 text-sm font-medium mt-2 inline-block"
              >
                Need an account? Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Shop Content Component for when user is authenticated
function ShopContent() {
  const { categories } = useCategories();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");

  // Slides for hero carousel
  const heroSlides = [
    {
      title: "Summer Collection 2025",
      heading: "Elevate Your Style",
      description:
        "Discover our premium collection of timeless essentials designed for the modern lifestyle.",
      image: "/images/collections/casual-collection.jpg",
      buttonText: "Shop Now",
      buttonLink: "/shop/products",
      alignment: "center",
    },
    {
      title: "New Arrivals",
      heading: "Bold & Beautiful",
      description:
        "Express yourself with our latest collection of statement pieces.",
      image: "/images/collections/formal-collection.jpg",
      buttonText: "Explore Collection",
      buttonLink: "/shop/collections",
      alignment: "left",
    },
    {
      title: "Special Offer",
      heading: "Up to 50% Off",
      description:
        "Limited time offer on selected items. Don't miss out on these amazing deals.",
      image: "/images/collections/women-casual-collection.jpg",
      buttonText: "Shop Sale",
      buttonLink: "/shop/sale",
      alignment: "right",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Carousel - Updated with more dynamic layout */}
      <section className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div
                className={`absolute inset-0 flex items-center ${
                  slide.alignment === "left"
                    ? "justify-start"
                    : slide.alignment === "right"
                    ? "justify-end"
                    : "justify-center"
                }`}
              >
                <div
                  className={`text-white px-8 md:px-16 max-w-lg md:max-w-xl ${
                    slide.alignment === "right"
                      ? "text-right mr-8"
                      : slide.alignment === "left"
                      ? "text-left ml-8"
                      : "text-center"
                  }`}
                >
                  <p className="text-sm md:text-base uppercase tracking-widest mb-4 opacity-90 font-light">
                    {slide.title}
                  </p>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.heading}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center px-8 py-4 text-base font-medium rounded-none bg-white text-black hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {slide.buttonText}
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-20"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + heroSlides.length) % heroSlides.length
            )
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % heroSlides.length)
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </section>

      {/* Features Section - Updated with better visual design */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/20 rounded-lg mb-6 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summer 2025 Premium Collection */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="mb-2 inline-block px-4 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium uppercase tracking-wider rounded-sm">
                SUMMER 2025
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Premium Collection
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Elevate your wardrobe with our premium summer collection.
                Designed for comfort and style.
              </p>
              <Link
                href="/shop/collections/premium"
                className="inline-flex items-center px-10 py-4 bg-black dark:bg-gray-800 text-white font-medium hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                Explore Collection
                <FiArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7 relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/collections/summer-premium-collection.jpg"
                alt="Summer 2025 Premium Collection"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Collections - Updated with modern grid layout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our curated collections designed for every style and
              occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[500px]">
            {collections
              .filter((c) => c.featured)
              .slice(0, 3)
              .map((collection, index) => {
                // First item takes up more space
                const isFirst = index === 0;
                return (
                  <Link
                    key={index}
                    href={collection.href}
                    className={`group relative overflow-hidden ${
                      isFirst ? "md:col-span-4 row-span-2" : "md:col-span-2"
                    } hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-white/80 mb-4 max-w-xs">
                        {collection.description}
                      </p>
                      <div className="inline-flex items-center text-sm font-medium text-white border-b border-white/0 group-hover:border-white pb-1 transition-all duration-300 w-fit">
                        Shop Collection
                        <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Products Tabs Section - Combined Featured and Trending */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-0">
              Our Products
            </h2>

            <div className="flex space-x-1 bg-white dark:bg-gray-900 p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab("featured")}
                className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === "featured"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab("trending")}
                className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === "trending"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Trending
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === "featured"
              ? featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop/products"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-none text-white bg-black hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1"
            >
              View All Products
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - New addition */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                New Season Arrivals
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Elevate your wardrobe with our latest collection of premium
                women's fashion. From elegant formal wear to comfortable casual
                pieces.
              </p>
              <Link
                href="/shop/products"
                className="inline-block px-8 py-4 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors duration-300"
              >
                Shop New Arrivals
              </Link>
            </div>
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image
                  src="/images/collections/women-formal-collection.jpg"
                  alt="Exclusive 20% OFF"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-white/20 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-light uppercase tracking-widest mb-4">
                    Exclusive
                  </h3>
                  <p className="text-4xl font-bold mb-6">20% OFF</p>
                  <p className="text-lg">On your first order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ShopHomePage() {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Loading Fashion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Preparing your style experience...
              </p>
            </div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      {/* Dynamically show login or shop content based on authentication */}
      {!user ? <ShopLoginSection /> : <ShopContent />}
    </CustomerLayout>
  );
}
