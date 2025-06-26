"use client";

import CustomerLayout from "@/components/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowRight,
  FiFilter,
  FiGrid,
  FiHeart,
  FiList,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";

// Mock product data for men's category
const menProducts = [
  {
    id: "m1",
    name: "Premium Wool Overcoat",
    price: 3500,
    image: "/images/products/m1-premium-wool-overcoat.jpg",
    category: "Men",
    rating: 4.9,
    reviews: 132,
    colors: ["#000000", "#8B4513", "#808080"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
  {
    id: "m2",
    name: "Slim Fit Dress Shirt",
    price: 1200,
    originalPrice: 1500,
    image: "/images/products/m2-slim-fit-dress-shirt.jpg",
    category: "Men",
    rating: 4.7,
    reviews: 98,
    colors: ["#FFFFFF", "#87CEEB", "#000000", "#FFB6C1"],
    sizes: ["S", "M", "L", "XL"],
    isOnSale: true,
  },
  {
    id: "m3",
    name: "Tailored Suit Pants",
    price: 1800,
    image: "/images/products/m3-tailored-suit-pants.jpg",
    category: "Men",
    rating: 4.8,
    reviews: 75,
    colors: ["#000000", "#000080", "#808080"],
    sizes: ["30", "32", "34", "36", "38"],
  },
  {
    id: "m4",
    name: "Cashmere Sweater",
    price: 2200,
    originalPrice: 2500,
    image: "/images/products/m4-cashmere-sweater.jpg",
    category: "Men",
    rating: 4.9,
    reviews: 112,
    colors: ["#8B4513", "#000000", "#F5F5DC"],
    sizes: ["S", "M", "L", "XL"],
    isOnSale: true,
  },
  {
    id: "m5",
    name: "Leather Derby Shoes",
    price: 2800,
    image: "/images/products/m5-leather-derby-shoes.jpg",
    category: "Men",
    rating: 4.8,
    reviews: 89,
    colors: ["#000000", "#8B4513"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    isNew: true,
  },
  {
    id: "m6",
    name: "Structured Blazer",
    price: 2600,
    image: "/images/products/m6-structured-blazer.jpg",
    category: "Men",
    rating: 4.7,
    reviews: 64,
    colors: ["#000080", "#000000", "#808080"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m7",
    name: "Selvedge Denim Jeans",
    price: 1600,
    image: "/images/products/m7-selvedge-denim-jeans.jpg",
    category: "Men",
    rating: 4.8,
    reviews: 103,
    colors: ["#000080", "#000000"],
    sizes: ["30", "32", "34", "36", "38"],
  },
  {
    id: "m8",
    name: "Merino Wool Scarf",
    price: 800,
    originalPrice: 950,
    image: "/images/products/m8-merino-wool-scarf.jpg",
    category: "Men",
    rating: 4.6,
    reviews: 47,
    colors: ["#000000", "#8B4513", "#000080", "#808080"],
    isOnSale: true,
  },
];

// Filter categories
const categories = [
  "All",
  "Shirts",
  "Pants",
  "Suits",
  "Outerwear",
  "Shoes",
  "Accessories",
];

// Size options
const sizeOptions = ["S", "M", "L", "XL", "XXL"];

// Color options
const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Navy", value: "#000080" },
  { name: "Gray", value: "#808080" },
  { name: "Brown", value: "#8B4513" },
  { name: "Beige", value: "#F5F5DC" },
  { name: "Blue", value: "#87CEEB" },
];

// Price ranges
const priceRanges = [
  { name: "Under ৳1000", range: [0, 1000] },
  { name: "৳1000 - ৳2000", range: [1000, 2000] },
  { name: "৳2000 - ৳3000", range: [2000, 3000] },
  { name: "Over ৳3000", range: [3000, Infinity] },
];

export default function MenPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <CustomerLayout>
      {/* Enhanced Header Banner */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/products/men123.png"
            alt="Men's Fashion"
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 backdrop-blur-sm">
              <FiTrendingUp className="w-4 h-4 mr-2" />
              Premium Men's Fashion
            </div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-8 leading-tight">
              Men's
              <span className="block text-yellow-400">Collection</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mb-8 leading-relaxed">
              Discover our premium selection of men's clothing designed with
              clean lines, exceptional materials, and timeless style that
              defines modern masculinity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                Shop Collection
                <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Size Guide
                <FiGrid className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Sorting */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-md"
              >
                <FiFilter className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider">
                  Filters
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  View:
                </span>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 ${
                    viewMode === "grid"
                      ? "text-amber-400"
                      : "text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 ${
                    viewMode === "list"
                      ? "text-amber-400"
                      : "text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <select className="border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-4 text-sm uppercase tracking-wider focus:outline-none focus:border-black dark:focus:border-white rounded-md">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 whitespace-nowrap text-sm uppercase tracking-wider rounded-full ${
                    activeCategory === category
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Sidebar (Mobile) */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
              <div className="w-full max-w-md bg-white dark:bg-black h-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl uppercase tracking-wider font-light">
                    Filters
                  </h2>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Filter Sections */}
                <div className="space-y-8">
                  {/* Size Filter */}
                  <div>
                    <h3 className="text-lg uppercase tracking-wider font-light mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                      Size
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          className="border border-gray-300 dark:border-gray-700 py-2 text-center text-sm hover:border-black dark:hover:border-white transition-colors rounded-md"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div>
                    <h3 className="text-lg uppercase tracking-wider font-light mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                      Color
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {colorOptions.map((color) => (
                        <div
                          key={color.name}
                          className="flex flex-col items-center space-y-1"
                        >
                          <button
                            className="w-8 h-8 border border-gray-300 dark:border-gray-700 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="text-xs">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="text-lg uppercase tracking-wider font-light mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                      Price
                    </h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label
                          key={range.name}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                          />
                          <span>{range.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="pt-4 flex space-x-4">
                    <button className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 uppercase tracking-wider text-sm rounded-md">
                      Apply Filters
                    </button>
                    <button className="flex-1 border border-gray-300 dark:border-gray-700 py-3 uppercase tracking-wider text-sm rounded-md">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div
            className={viewMode === "grid" ? "men-products-grid" : "space-y-6"}
          >
            {menProducts.map((product) => (
              <div key={product.id}>
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="w-1/3">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 33vw, 25vw"
                          onError={(e) => {
                            // @ts-ignore - Next.js Image doesn't have proper types for onError
                            e.currentTarget.src = "/images/profile-avatar.jpg";
                          }}
                        />
                        {product.isNew && (
                          <div className="absolute top-3 left-3 bg-white dark:bg-black text-black dark:text-white text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                            New
                          </div>
                        )}
                        {product.isOnSale && product.originalPrice && (
                          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                            -
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            %
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                          {product.category}
                        </p>
                        <Link href={`/shop/products/${product.id}`}>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          Premium quality men's clothing designed for comfort
                          and style.
                        </p>
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Colors:
                            </span>
                            <div className="flex items-center gap-2">
                              {product.colors.map((color) => (
                                <div
                                  key={color}
                                  className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        )}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Sizes:
                            </span>
                            <div className="flex items-center gap-2">
                              {product.sizes.map((size) => (
                                <span
                                  key={size}
                                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-sm"
                                >
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span
                            className={`text-xl font-medium ${
                              product.originalPrice
                                ? "text-red-600 dark:text-red-500"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            ৳{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                              ৳{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FiHeart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          </button>
                          <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors">
                            <FiShoppingBag className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Featured Collections */}
          <div className="mt-20">
            <h2 className="text-2xl font-light uppercase tracking-wider mb-8 text-center">
              Featured Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                href="#"
                className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src="/images/collections/formal-collection.jpg"
                    alt="Formal Collection"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-light uppercase tracking-wider text-white mb-4">
                        Formal Collection
                      </h3>
                      <span className="inline-block border-b border-white text-white text-sm uppercase tracking-wider pb-1 group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src="/images/collections/casual-collection.jpg"
                    alt="Casual Collection"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-light uppercase tracking-wider text-white mb-4">
                        Casual Collection
                      </h3>
                      <span className="inline-block border-b border-white text-white text-sm uppercase tracking-wider pb-1 group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px overflow-hidden">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 border border-gray-300 dark:border-gray-700 ${
                    page === 1
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
