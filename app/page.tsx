"use client";

import CustomerLayout from "@/components/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiShield,
  FiTruck,
} from "react-icons/fi";

// Featured products data
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

// New arrivals data
const newArrivals = [
  {
    id: "m1",
    name: "Premium Wool Overcoat",
    price: 8500,
    image: "/images/products/m1-premium-wool-overcoat.jpg",
    category: "Men",
    rating: 4.8,
    reviews: 45,
    colors: ["#000000", "#D3D3D3", "#8B4513"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "w1",
    name: "Minimalist Wool Coat",
    price: 7800,
    image: "/images/products/w1-minimalist-wool-coat.jpg",
    category: "Women",
    rating: 4.9,
    reviews: 37,
    colors: ["#000000", "#D3D3D3", "#F5F5DC"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
  },
  {
    id: "k1",
    name: "Cotton T-Shirt Set",
    price: 1500,
    image: "/images/products/k1-cotton-t-shirt-set.jpg",
    category: "Kids",
    rating: 4.7,
    reviews: 28,
    colors: ["#FFFFFF", "#87CEEB", "#98FB98"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    isNew: true,
  },
  {
    id: "w3",
    name: "Silk Button-up Blouse",
    price: 3200,
    image: "/images/products/w3-silk-button-up-blouse.jpg",
    category: "Women",
    rating: 4.6,
    reviews: 42,
    colors: ["#FFFFFF", "#F5F5DC", "#FFB6C1"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
  },
];

// Collection data
const collections = [
  {
    name: "Men's Collection",
    description: "Discover our latest men's fashion",
    image: "/images/collections/formal-collection.jpg",
    href: "/shop/men",
    position: "left",
  },
  {
    name: "Women's Collection",
    description: "Elegant styles for every occasion",
    image: "/images/collections/women-formal-collection.jpg",
    href: "/shop/women",
    position: "right",
  },
  {
    name: "Kids Collection",
    description: "Comfortable and fun clothing for kids",
    image: "/images/collections/kids-casual-collection.jpg",
    href: "/shop/kids",
    position: "center",
  },
];

// Features data
const features = [
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "Free shipping on orders over ৳2000",
  },
  {
    icon: FiShield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
];

// Trending categories
const trendingCategories = [
  {
    name: "Summer Essentials",
    image: "/images/collections/casual-collection.jpg",
    href: "/shop/products",
  },
  {
    name: "Formal Wear",
    image: "/images/collections/formal-collection.jpg",
    href: "/shop/products",
  },
  {
    name: "Casual Style",
    image: "/images/collections/women-casual-collection.jpg",
    href: "/shop/products",
  },
  {
    name: "Accessories",
    image: "/images/collections/kids-casual-collection.jpg",
    href: "/shop/products",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const featuredRef = useRef<HTMLDivElement>(null);

  // Carousel data
  const carouselSlides = [
    {
      image: "/images/collections/women-formal-collection.jpg",
      title: "Summer Collection 2025",
      subtitle: "Elevate Your Style",
      description:
        "Discover our premium collection of timeless essentials designed for the modern lifestyle.",
      buttonText: "Shop Now",
      buttonLink: "/shop/products",
      position: "left",
    },
    {
      image: "/images/collections/formal-collection.jpg",
      title: "New Arrivals",
      subtitle: "Fresh Styles",
      description:
        "Explore our latest arrivals featuring contemporary designs and premium fabrics.",
      buttonText: "Discover Now",
      buttonLink: "/shop/products",
      position: "center",
    },
    {
      image: "/images/collections/casual-collection.jpg",
      title: "Limited Edition",
      subtitle: "Exclusive Pieces",
      description:
        "Shop our limited edition collection before it's gone. Premium quality, exceptional style.",
      buttonText: "View Collection",
      buttonLink: "/shop/products",
      position: "right",
    },
  ];

  // Featured collection data
  const featuredCollection = {
    title: "Premium Collection",
    subtitle: "SUMMER 2025",
    description:
      "Elevate your wardrobe with our premium summer collection. Designed for comfort and style.",
    image: "/images/collections/casual-collection.jpg",
    buttonText: "Explore Collection",
    buttonLink: "/shop/products",
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription for:", email);
    setEmail("");
    // Show success message or notification
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black dark:border-gray-700 dark:border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-light">
            Loading CLOTHINGCO...
          </p>
        </div>
      </div>
    );
  }

  return (
    <CustomerLayout>
      {/* Hero Carousel Section - Redesigned with modern aesthetics */}
      <section className="relative h-[90vh] overflow-hidden">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 z-20"
                : "opacity-0 z-10 pointer-events-none"
            }`}
          >
            {/* Background Image with Enhanced Parallax Effect */}
            <div
              className="absolute inset-0"
              style={{
                transform:
                  currentSlide === index
                    ? `translateY(${scrollY * 0.15}px) scale(${
                        1 + scrollY * 0.0002
                      })`
                    : "none",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full scale-105"
              />
            </div>

            {/* Content with improved positioning and animations */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 30,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`max-w-xl space-y-8 ${
                  slide.position === "left"
                    ? "mr-auto"
                    : slide.position === "right"
                    ? "ml-auto"
                    : "mx-auto text-center"
                }`}
              >
                <div className="space-y-6">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm uppercase tracking-widest font-medium"
                  >
                    {slide.title}
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 30,
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-6xl md:text-7xl font-light leading-tight uppercase tracking-wide text-white"
                  >
                    {slide.subtitle}
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 30,
                  }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-xl text-gray-100 leading-relaxed font-light"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 30,
                  }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="pt-4"
                >
                  <Link
                    href={slide.buttonLink}
                    className="group bg-white text-black px-10 py-4 font-medium uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center inline-block overflow-hidden relative btn-hover-slide"
                  >
                    {slide.buttonText}
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Enhanced Carousel Controls with elegant indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-4">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-none transition-all duration-500 ${
                currentSlide === index
                  ? "bg-yellow-400 w-20"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Arrow controls with improved styling */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 hover:bg-black/60 flex items-center justify-center text-white transition-all duration-300 border border-white/30 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 hover:bg-black/60 flex items-center justify-center text-white transition-all duration-300 border border-white/30 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Featured Collection Banner - New Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
              <img
                src={featuredCollection.image}
                alt={featuredCollection.title}
                className="w-full h-full object-cover"
                style={{
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              />
            </div>
            <div className="relative z-20 py-24 px-8 md:px-16 flex flex-col justify-center h-[400px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-lg space-y-6"
              >
                <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm uppercase tracking-widest font-medium">
                  {featuredCollection.subtitle}
                </span>
                <h2 className="text-5xl font-light uppercase tracking-wide text-white">
                  {featuredCollection.title}
                </h2>
                <p className="text-lg text-gray-100 leading-relaxed">
                  {featuredCollection.description}
                </p>
                <div className="pt-4">
                  <Link
                    href={featuredCollection.buttonLink}
                    className="group bg-white text-black px-10 py-4 font-medium uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center inline-block"
                  >
                    {featuredCollection.buttonText}
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories - Enhanced with better spacing and animations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-light uppercase tracking-wide text-gray-900 dark:text-white mb-4"
            >
              Shop by Category
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-yellow-400 mx-auto"
            ></motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {trendingCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group rounded-lg aspect-square hover-lift"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Link
                    href={category.href}
                    className="px-6 py-3 bg-white/90 hover:bg-yellow-400 text-black text-sm uppercase tracking-wider font-medium transition-all duration-300"
                  >
                    {category.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Updated with modern cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover-lift"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-yellow-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Improved with animation and heading */}
      <section className="py-24" ref={featuredRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-light uppercase tracking-wide text-gray-900 dark:text-white mb-4"
              >
                Featured Products
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-1 bg-yellow-400"
              ></motion.div>
            </div>
            <Link
              href="/shop/products"
              className="mt-6 md:mt-0 inline-flex items-center text-sm uppercase tracking-wider font-light text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group"
            >
              View All Products
              <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section - Updated with better visuals */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-light uppercase tracking-wide text-gray-900 dark:text-white mb-4"
            >
              Shop by Collection
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-yellow-400 mx-auto"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] hover-lift"
              >
                {/* Image with overlay */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                  <h3 className="text-2xl font-medium text-white mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-gray-200 mb-6 opacity-90">
                    {collection.description}
                  </p>
                  <Link
                    href={collection.href}
                    className="inline-flex items-center bg-white/90 hover:bg-yellow-400 text-black px-6 py-3 text-sm uppercase tracking-wider font-medium transition-all duration-300 self-start"
                  >
                    Shop Collection
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section - Improved with heading */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-light uppercase tracking-wide text-gray-900 dark:text-white mb-4"
              >
                New Arrivals
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-1 bg-yellow-400"
              ></motion.div>
            </div>
            <Link
              href="/shop/products"
              className="mt-6 md:mt-0 inline-flex items-center text-sm uppercase tracking-wider font-light text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group"
            >
              View All New Arrivals
              <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Redesigned with modern aesthetic */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10"></div>
          <img
            src="/images/collections/women-casual-collection.jpg"
            alt="Newsletter"
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-light uppercase tracking-wide text-white mb-4">
                Join Our Newsletter
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-1 bg-yellow-400 mx-auto"
              ></motion.div>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Subscribe to our newsletter to receive updates on new arrivals,
                special offers, and exclusive content.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="px-6 py-4 bg-white/10 border border-white/30 focus:border-yellow-400 text-white placeholder-gray-400 outline-none flex-grow rounded-none"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-yellow-400 text-black uppercase tracking-wider text-sm font-medium hover:bg-yellow-500 transition-colors rounded-none"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
