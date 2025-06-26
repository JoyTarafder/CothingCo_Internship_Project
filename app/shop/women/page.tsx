"use client";

import CustomerLayout from "@/components/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiFilter, FiGrid, FiList, FiX } from "react-icons/fi";

// Mock product data for women's category
const womenProducts = [
  {
    id: "w1",
    name: "Minimalist Wool Coat",
    price: 3200,
    image: "/images/products/w1-minimalist-wool-coat.jpg",
    category: "Women",
    rating: 4.8,
    reviews: 124,
    colors: ["#000000", "#F5F5DC", "#808080"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "w2",
    name: "High-Waisted Tailored Pants",
    price: 1800,
    originalPrice: 2200,
    image: "/images/products/w2-high-waisted-tailored-pants.jpg",
    category: "Women",
    rating: 4.6,
    reviews: 89,
    colors: ["#000000", "#FFFFFF", "#8B4513"],
    sizes: ["XS", "S", "M", "L"],
    isOnSale: true,
  },
  {
    id: "w3",
    name: "Silk Button-Up Blouse",
    price: 1500,
    image: "/images/products/w3-silk-button-up-blouse.jpg",
    category: "Women",
    rating: 4.7,
    reviews: 76,
    colors: ["#FFFFFF", "#FFB6C1", "#000000", "#E6E6FA"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w4",
    name: "Cashmere Turtleneck Sweater",
    price: 2400,
    image: "/images/products/w4-cashmere-turtleneck-sweater.jpg",
    category: "Women",
    rating: 4.9,
    reviews: 112,
    colors: ["#A52A2A", "#000000", "#F5F5DC"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "w5",
    name: "Pleated Midi Skirt",
    price: 1600,
    originalPrice: 1900,
    image: "/images/products/w5-pleated-midi-skirt.jpg",
    category: "Women",
    rating: 4.5,
    reviews: 67,
    colors: ["#000000", "#808080", "#F5F5DC"],
    sizes: ["XS", "S", "M", "L"],
    isOnSale: true,
  },
  {
    id: "w6",
    name: "Structured Blazer",
    price: 2800,
    image: "/images/products/w6-structured-blazer.jpg",
    category: "Women",
    rating: 4.8,
    reviews: 94,
    colors: ["#000000", "#FFFFFF", "#8B4513"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "w7",
    name: "Linen Maxi Dress",
    price: 2100,
    image: "/images/products/w7-linen-maxi-dress.jpg",
    category: "Women",
    rating: 4.7,
    reviews: 83,
    colors: ["#FFFFFF", "#FFB6C1", "#F5F5DC"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w8",
    name: "Premium Denim Jeans",
    price: 1800,
    image: "/images/products/w8-premium-denim-jeans.jpg",
    category: "Women",
    rating: 4.6,
    reviews: 108,
    colors: ["#000080", "#000000", "#4682B4"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

// Filter categories
const categories = [
  "All",
  "Dresses",
  "Tops",
  "Pants",
  "Skirts",
  "Outerwear",
  "Activewear",
  "Accessories",
];

// Size options
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

// Color options
const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Beige", value: "#F5F5DC" },
  { name: "Gray", value: "#808080" },
  { name: "Navy", value: "#000080" },
  { name: "Brown", value: "#8B4513" },
  { name: "Pink", value: "#FFB6C1" },
  { name: "Lavender", value: "#E6E6FA" },
];

// Price ranges
const priceRanges = [
  { name: "Under ৳1000", range: [0, 1000] },
  { name: "৳1000 - ৳2000", range: [1000, 2000] },
  { name: "৳2000 - ৳3000", range: [2000, 3000] },
  { name: "Over ৳3000", range: [3000, Infinity] },
];

export default function WomenPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <CustomerLayout>
      {/* Header Banner */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/collections/women-casual-collection.jpg"
            alt="Women's Fashion"
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light uppercase tracking-wider mb-6">
              Women's Collection
            </h1>
            <p className="text-lg text-gray-300 font-light max-w-xl">
              Discover our curated selection of premium women's clothing
              designed with minimalist aesthetics and exceptional quality.
            </p>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider mb-4">
                New Season Arrivals
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto lg:mx-0">
                Elevate your wardrobe with our latest collection of premium
                women's fashion. From elegant formal wear to comfortable casual
                pieces.
              </p>
              <div className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:-translate-y-1">
                Shop New Arrivals
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/collections/women-formal-collection.jpg"
                  alt="Exclusive 20% OFF"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/80 dark:bg-black/80 backdrop-blur-sm p-8 rounded-lg transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-light uppercase tracking-widest mb-4 text-black dark:text-white">
                    Exclusive
                  </h3>
                  <p className="text-4xl font-bold mb-6 text-black dark:text-white">
                    20% OFF
                  </p>
                  <p className="text-lg text-black dark:text-white">
                    On your first order
                  </p>
                </div>
              </div>
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
                className="flex items-center space-x-2 border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
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
                      ? "text-yellow-400"
                      : "text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 ${
                    viewMode === "list"
                      ? "text-yellow-400"
                      : "text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <select className="border border-gray-300 dark:border-gray-700 bg-transparent py-2 px-4 text-sm uppercase tracking-wider focus:outline-none focus:border-black dark:focus:border-white">
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
                  className={`px-4 py-2 whitespace-nowrap text-sm uppercase tracking-wider ${
                    category === "All"
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
                          className="border border-gray-300 dark:border-gray-700 py-2 text-center text-sm hover:border-black dark:hover:border-white transition-colors"
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
                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
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
                    <button className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 uppercase tracking-wider text-sm">
                      Apply Filters
                    </button>
                    <button className="flex-1 border border-gray-300 dark:border-gray-700 py-3 uppercase tracking-wider text-sm">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1"
            } gap-8`}
          >
            {womenProducts.map((product) => (
              <div key={product.id}>
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex border border-gray-200 dark:border-gray-800">
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
                        <h3 className="text-lg font-medium uppercase tracking-wider mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-base font-medium text-black dark:text-white">
                            ৳{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              ৳{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          {product.colors?.slice(0, 3).map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {(product.colors?.length || 0) > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{(product.colors?.length || 0) - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {product.sizes?.slice(0, 3).map((size) => (
                            <span
                              key={size}
                              className="text-xs border border-gray-300 dark:border-gray-700 px-2 py-1"
                            >
                              {size}
                            </span>
                          ))}
                          {(product.sizes?.length || 0) > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                              +{(product.sizes?.length || 0) - 3}
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/shop/products/${product.id}`}
                          className="text-sm uppercase tracking-wider border-b border-black dark:border-white hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex border border-gray-300 dark:border-gray-700">
              <button className="px-4 py-2 border-r border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 border-r border-gray-300 dark:border-gray-700 ${
                    page === 1
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                Next
              </button>
            </div>
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
                    src="/images/collections/women-formal-collection.jpg"
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
                    src="/images/collections/women-casual-collection.jpg"
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
        </div>
      </div>
    </CustomerLayout>
  );
}
