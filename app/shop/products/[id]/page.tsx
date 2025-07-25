"use client";

import CustomerLayout from "@/components/CustomerLayout";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from "react-icons/fi";

// Define a proper Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  colors: { name: string; value: string }[];
  sizes: { name: string; available: boolean }[] | string[];
  isNew: boolean;
  isOnSale: boolean;
  features: string[];
  specifications: { [key: string]: string };
}

// Image mapping
const imageMappings = {
  "1": "/images/products/1-classic-cotton-tshirt.jpg",
  "2": "/images/products/2-womens-summer-dress.jpg",
  "3": "/images/products/3-kids-casual-joggers.jpg",
  "4": "/images/products/4-premium-hoodie.jpg",
  "5": "/images/products/5-slim-fit-jeans.jpg",
  "6": "/images/products/6-floral-print-blouse.jpg",
  "7": "/images/products/7-kids-graphic-tshirt.jpg",
  "8": "/images/products/8-oversized-sweater.jpg",
  m1: "/images/products/m1-premium-wool-overcoat.jpg",
  m2: "/images/products/m2-slim-fit-dress-shirt.jpg",
  m3: "/images/products/m3-tailored-suit-pants.jpg",
  m4: "/images/products/m4-cashmere-sweater.jpg",
  m5: "/images/products/m5-leather-derby-shoes.jpg",
  m6: "/images/products/m6-structured-blazer.jpg",
  m7: "/images/products/m7-selvedge-denim-jeans.jpg",
  m8: "/images/products/m8-merino-wool-scarf.jpg",
  w1: "/images/products/w1-minimalist-wool-coat.jpg",
  w2: "/images/products/w2-high-waisted-tailored-pants.jpg",
  w3: "/images/products/w3-silk-button-up-blouse.jpg",
  w4: "/images/products/w4-cashmere-turtleneck-sweater.jpg",
  w5: "/images/products/w5-pleated-midi-skirt.jpg",
  w6: "/images/products/w6-structured-blazer.jpg",
  w7: "/images/products/w7-linen-maxi-dress.jpg",
  w8: "/images/products/w8-premium-denim-jeans.jpg",
  k1: "/images/products/k1-cotton-t-shirt-set.jpg",
  k2: "/images/products/k2-denim-overalls.jpg",
  k3: "/images/products/k3-hooded-sweatshirt.jpg",
  k4: "/images/products/k4-stretch-pants.jpg",
  k5: "/images/products/k5-patterned-dress.jpg",
  k6: "/images/products/k6-lightweight-jacket.jpg",
  k7: "/images/products/k7-pajama-set.jpg",
  k8: "/images/products/k8-school-uniform-set.jpg",
};

// Product database
const productsDatabase: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Classic Cotton T-Shirt",
    price: 1200,
    originalPrice: 1500,
    description:
      "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this classic piece features a relaxed fit perfect for everyday wear. The breathable fabric keeps you cool throughout the day while maintaining its shape wash after wash.",
    images: [
      "/images/products/1-classic-cotton-tshirt.jpg",
      "/images/products/m2-slim-fit-dress-shirt.jpg",
      "/images/products/m4-cashmere-sweater.jpg",
      "/images/products/m7-selvedge-denim-jeans.jpg",
    ],
    category: "Men",
    rating: 4.5,
    reviews: 128,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Red", value: "#FF0000" },
      { name: "Blue", value: "#0000FF" },
    ],
    sizes: [
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
      { name: "XL", available: true },
      { name: "XXL", available: false },
    ],
    isNew: true,
    isOnSale: true,
    features: [
      "100% Organic Cotton",
      "Pre-shrunk Fabric",
      "Machine Washable",
      "Tagless Design",
      "Reinforced Seams",
    ],
    specifications: {
      fabric: "100% Organic Cotton",
      weight: "180 GSM",
      fit: "Regular Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Made in Bangladesh",
    },
  },
  "4": {
    id: "4",
    name: "Premium Hoodie",
    price: 3500,
    description:
      "Stay warm and stylish with our premium hoodie. Features a soft inner lining, adjustable hood, and convenient front pocket.",
    images: [
      "/images/products/4-premium-hoodie.jpg",
      "/images/products/m4-cashmere-sweater.jpg",
      "/images/products/k3-hooded-sweatshirt.jpg",
      "/images/products/m1-premium-wool-overcoat.jpg",
    ],
    category: "Men",
    rating: 4.7,
    reviews: 203,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
      { name: "Navy", value: "#000080" },
    ],
    sizes: [
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
      { name: "XL", available: true },
      { name: "XXL", available: true },
    ],
    isNew: false,
    isOnSale: false,
    features: [
      "80% Cotton, 20% Polyester",
      "Double-layered hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Drawstring hood",
    ],
    specifications: {
      fabric: "80% Cotton, 20% Polyester",
      weight: "350 GSM",
      fit: "Regular Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Made in Bangladesh",
    },
  },
  "5": {
    id: "5",
    name: "Slim Fit Jeans",
    price: 2800,
    originalPrice: 3200,
    description:
      "These slim fit jeans offer the perfect combination of style and comfort. Made from premium denim with just the right amount of stretch.",
    images: [
      "/images/products/5-slim-fit-jeans.jpg",
      "/images/products/m7-selvedge-denim-jeans.jpg",
      "/images/products/w8-premium-denim-jeans.jpg",
      "/images/products/m3-tailored-suit-pants.jpg",
    ],
    category: "Men",
    rating: 4.4,
    reviews: 89,
    colors: [
      { name: "Blue", value: "#4169E1" },
      { name: "Navy", value: "#000080" },
      { name: "Black", value: "#000000" },
    ],
    sizes: [
      { name: "30", available: true },
      { name: "32", available: true },
      { name: "34", available: true },
      { name: "36", available: true },
      { name: "38", available: false },
    ],
    isNew: false,
    isOnSale: true,
    features: [
      "98% Cotton, 2% Elastane",
      "5-pocket styling",
      "Button closure with zip fly",
      "Slim fit through hip and thigh",
      "Tapered leg",
    ],
    specifications: {
      fabric: "98% Cotton, 2% Elastane",
      weight: "12 oz denim",
      fit: "Slim Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Made in Bangladesh",
    },
  },
};

// Related products
const relatedProducts = [
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
    id: "5",
    name: "Slim Fit Jeans",
    price: 2800,
    originalPrice: 3200,
    image: "/images/products/5-slim-fit-jeans.jpg",
    category: "Men",
    rating: 4.4,
    reviews: 89,
    colors: ["#4169E1", "#000080"],
    sizes: ["30", "32", "34", "36", "38"],
    isOnSale: true,
  },
  {
    id: "m2",
    name: "Slim Fit Dress Shirt",
    price: 2200,
    image: "/images/products/m2-slim-fit-dress-shirt.jpg",
    category: "Men",
    rating: 4.6,
    reviews: 156,
    colors: ["#FFFFFF", "#87CEEB", "#FFB6C1"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "m7",
    name: "Selvedge Denim Jeans",
    price: 3800,
    image: "/images/products/m7-selvedge-denim-jeans.jpg",
    category: "Men",
    rating: 4.8,
    reviews: 72,
    colors: ["#000080", "#000000"],
    sizes: ["30", "32", "34", "36"],
    isNew: true,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    value: string;
  }>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Get product data based on ID
    if (typeof productId === "string" && productId in productsDatabase) {
      // Use type assertion to tell TypeScript that the key exists
      const validProductId = productId as keyof typeof productsDatabase;
      setProduct(productsDatabase[validProductId]);
      setSelectedColor(productsDatabase[validProductId].colors[0]);
      setSelectedSize("");
    }
  }, [productId]);

  const discountPercentage = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    if (!product) {
      alert("Product not found");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!selectedColor) {
      return;
    }

    // Add to cart using context
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: selectedColor.name,
        size: selectedSize,
      },
      quantity
    );

    // Show success message
    alert(
      `Added ${quantity} ${product.name} (${selectedColor.name}, ${selectedSize}) to cart`
    );
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
      });
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-8">
          <a href="/shop" className="hover:text-blue-600">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/shop/men" className="hover:text-blue-600">
            Men
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{product?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={product?.images?.[selectedImage] || "/images/placeholder.jpg"}
                alt={product?.name || "Product image"}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              {/* Badges */}
              <div className="flex gap-2 mb-2">
                {product?.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
                {product?.isOnSale && discountPercentage > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product?.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product?.rating} ({product?.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ৳{product?.price.toLocaleString()}
                </span>
                {product?.originalPrice && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Color: {selectedColor?.name}
              </h3>
              <div className="flex gap-2">
                {product?.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor?.name === color.name
                        ? "border-gray-900 dark:border-white"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Size
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {product?.sizes.map((size) => {
                  // Handle both string and object types
                  if (typeof size === "string") {
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-600"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={size.name}
                        onClick={() =>
                          size.available && setSelectedSize(size.name)
                        }
                        disabled={!size.available}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                          selectedSize === size.name
                            ? "bg-blue-600 text-white border-blue-600"
                            : size.available
                            ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-600"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 border-gray-200 dark:border-gray-600 cursor-not-allowed"
                        }`}
                      >
                        {size.name}
                      </button>
                    );
                  }
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md w-32">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center py-2">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`w-full border py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isInWishlist(product?.id || "")
                    ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-900 dark:border-red-700 dark:text-red-400"
                    : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FiHeart
                  className={`w-5 h-5 ${
                    isInWishlist(product?.id || "") ? "fill-current" : ""
                  }`}
                />
                {isInWishlist(product?.id || "")
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FiTruck className="w-4 h-4" />
                  Free shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FiShield className="w-4 h-4" />
                  Secure payment
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FiRefreshCw className="w-4 h-4" />
                  Easy returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {product?.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Features:
                  </h4>
                  <ul className="space-y-2">
                    {product?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product?.specifications || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                      >
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {key}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product?.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product?.rating} out of 5
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({product?.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div
                      key={review}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Customer {review}
                            </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < 4
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Great quality t-shirt! The fabric is soft and
                            comfortable. Fits true to size and the color is
                            exactly as shown in the pictures.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
