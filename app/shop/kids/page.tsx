"use client";

import CustomerLayout from "@/components/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

// Mock product data for kids' category
const kidsProducts = [
  {
    id: "k1",
    name: "Cotton T-Shirt Set",
    price: 800,
    image: "/images/products/k1-cotton-t-shirt-set.jpg",
    category: "Kids",
    rating: 4.7,
    reviews: 86,
    colors: ["#FFFFFF", "#000000", "#87CEEB", "#FFB6C1"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    isNew: true,
  },
  {
    id: "k2",
    name: "Denim Overalls",
    price: 1200,
    originalPrice: 1500,
    image: "/images/products/k2-denim-overalls.jpg",
    category: "Kids",
    rating: 4.6,
    reviews: 52,
    colors: ["#000080", "#8B4513"],
    sizes: ["3-4Y", "5-6Y", "7-8Y"],
    isOnSale: true,
  },
  {
    id: "k3",
    name: "Hooded Sweatshirt",
    price: 900,
    image: "/images/products/k3-hooded-sweatshirt.jpg",
    category: "Kids",
    rating: 4.8,
    reviews: 74,
    colors: ["#808080", "#000000", "#FFB6C1", "#87CEEB"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
  {
    id: "k4",
    name: "Stretch Pants",
    price: 850,
    originalPrice: 1000,
    image: "/images/products/k4-stretch-pants.jpg",
    category: "Kids",
    rating: 4.5,
    reviews: 63,
    colors: ["#000000", "#808080", "#000080"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    isOnSale: true,
  },
  {
    id: "k5",
    name: "Patterned Dress",
    price: 1100,
    image: "/images/products/k5-patterned-dress.jpg",
    category: "Kids",
    rating: 4.9,
    reviews: 48,
    colors: ["#FFB6C1", "#E6E6FA", "#FFFFFF"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    isNew: true,
  },
  {
    id: "k6",
    name: "Lightweight Jacket",
    price: 1400,
    image: "/images/products/k6-lightweight-jacket.jpg",
    category: "Kids",
    rating: 4.7,
    reviews: 39,
    colors: ["#000080", "#000000", "#8B4513"],
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: "k7",
    name: "Pajama Set",
    price: 750,
    image: "/images/products/k7-pajama-set.jpg",
    category: "Kids",
    rating: 4.8,
    reviews: 57,
    colors: ["#87CEEB", "#FFB6C1", "#E6E6FA"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
  {
    id: "k8",
    name: "School Uniform Set",
    price: 1300,
    image: "/images/products/k8-school-uniform-set.jpg",
    category: "Kids",
    rating: 4.6,
    reviews: 42,
    colors: ["#000080", "#FFFFFF"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  },
];

// Age group categories
const ageGroups = [
  "All",
  "Baby (0-2Y)",
  "Toddler (2-4Y)",
  "Kids (4-7Y)",
  "Older Kids (8-12Y)",
];

// Categories
const categories = [
  "All",
  "T-Shirts",
  "Pants",
  "Dresses",
  "Outerwear",
  "Sleepwear",
  "School Uniforms",
  "Accessories",
];

// Size options
const sizeOptions = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"];

// Color options
const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Navy", value: "#000080" },
  { name: "Gray", value: "#808080" },
  { name: "Pink", value: "#FFB6C1" },
  { name: "Blue", value: "#87CEEB" },
  { name: "Lavender", value: "#E6E6FA" },
  { name: "Brown", value: "#8B4513" },
];

export default function KidsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeAgeGroup, setActiveAgeGroup] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <CustomerLayout>
      {/* Header Banner */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/products/kids123.png"
            alt="Kids' Fashion"
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light uppercase tracking-wider mb-6">
              Kids' Collection
            </h1>
            <p className="text-lg text-gray-300 font-light max-w-xl">
              Quality, comfort, and style for the little ones. Discover our
              range of kids' clothing designed for durability and playful
              expression.
            </p>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/collections/kids-casual-collection.jpg"
                  alt="Kids Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 dark:bg-black/90 backdrop-blur-sm p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
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
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider mb-4 text-blue-600 dark:text-blue-400">
                Back to School Sale!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto lg:mx-0">
                Get your little ones ready for school with our comfortable and
                durable collection. From uniforms to casual wear, we have
                everything they need.
              </p>
              <Link
                href="/shop/products"
                className="inline-block bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-4 text-sm uppercase tracking-wider font-medium transition-all duration-300 transform hover:-translate-y-1 rounded-md"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Age Group Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((ageGroup) => (
                <button
                  key={ageGroup}
                  onClick={() => setActiveAgeGroup(ageGroup)}
                  className={`px-4 py-2 text-sm uppercase tracking-wider ${
                    activeAgeGroup === ageGroup
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                  }`}
                >
                  {ageGroup}
                </button>
              ))}
            </div>
          </div>

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
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 whitespace-nowrap text-sm uppercase tracking-wider ${
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
                  {/* Age Group Filter */}
                  <div>
                    <h3 className="text-lg uppercase tracking-wider font-light mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                      Age Group
                    </h3>
                    <div className="space-y-2">
                      {ageGroups.map((ageGroup) => (
                        <label
                          key={ageGroup}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            name="ageGroup"
                            className="form-radio h-4 w-4"
                            checked={activeAgeGroup === ageGroup}
                            onChange={() => setActiveAgeGroup(ageGroup)}
                          />
                          <span>{ageGroup}</span>
                        </label>
                      ))}
                    </div>
                  </div>

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
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                        />
                        <span>Under ৳500</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                        />
                        <span>৳500 - ৳1000</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                        />
                        <span>৳1000 - ৳1500</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                        />
                        <span>Over ৳1500</span>
                      </label>
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
          <div className="men-products-grid">
            {kidsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Featured Categories */}
          <div className="mt-20">
            <h2 className="text-2xl font-light uppercase tracking-wider mb-8 text-center">
              Shop By Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Everyday Essentials",
                  image: "/images/products/k1-cotton-t-shirt-set.jpg",
                  href: "/shop/products",
                },
                {
                  name: "School Collection",
                  image: "/images/products/k8-school-uniform-set.jpg",
                  href: "/shop/products",
                },
                {
                  name: "Playtime Favorites",
                  image: "/images/products/k3-hooded-sweatshirt.jpg",
                  href: "/shop/products",
                },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/5] relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4">
                        <h3 className="text-xl font-light uppercase tracking-wider text-white mb-2">
                          {category.name}
                        </h3>
                        <span className="inline-block border-b border-white text-white text-sm uppercase tracking-wider pb-1 group-hover:border-yellow-400 group-hover:text-yellow-400 transition-colors">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
        </div>
      </div>
    </CustomerLayout>
  );
}
