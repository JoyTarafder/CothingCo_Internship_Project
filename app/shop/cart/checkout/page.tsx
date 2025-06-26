"use client";

import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import {
  Order,
  PaymentMethod,
  ShippingAddress,
  useOrder,
} from "@/context/OrderContext";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiEdit,
  FiLock,
  FiMapPin,
  FiShield,
  FiTruck,
} from "react-icons/fi";

// Import CustomerLayout dynamically with no SSR to avoid hydration issues
const CustomerLayout = dynamic(() => import("@/components/CustomerLayout"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  ),
});

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  maxQuantity: number;
}

// Removed local interfaces - now using shared interfaces from OrderContext

export default function CheckoutPage() {
  const {
    cartItems,
    subtotal,
    originalSubtotal,
    savings,
    shipping,
    total: cartTotal,
    clearCart,
    promoCode,
    promoDiscount,
  } = useCart();
  const { showNotification } = useNotification();
  const { addOrder } = useOrder();
  const router = useRouter();

  const [step, setStep] = useState<"shipping" | "payment" | "review">(
    "shipping"
  );
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    savePaymentMethod: false,
  });

  // Additional checkout fields for form validation (not stored in order)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    mobileNumber: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGiftOrder, setIsGiftOrder] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+8801712345678",
      address: "123 Main Street",
      apartment: "Apt 4B",
      city: "Dhaka",
      postalCode: "1000",
      country: "Bangladesh",
    },
  ]);

  // Shipping methods
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("standard");

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: subtotal >= 2000 ? 0 : 100,
      estimatedDays: "5-7",
      icon: "📦",
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: subtotal >= 5000 ? 150 : 250,
      estimatedDays: "2-3",
      icon: "🚀",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 500,
      estimatedDays: "1",
      icon: "⚡",
    },
    {
      id: "pickup",
      name: "Store Pickup",
      description: "Pick up at our store",
      price: 0,
      estimatedDays: "Ready in 2-4 hours",
      icon: "🏪",
    },
  ];

  const selectedShipping = shippingMethods.find(
    (method) => method.id === selectedShippingMethod
  );
  const selectedShippingCost = selectedShipping?.price || 0;

  const tax = Math.round(subtotal * 0.05); // 5% tax

  // Calculate gift wrapping fee if any items are gift wrapped
  const giftWrappingFee = isGiftOrder ? 50 : 0;

  // Calculate additional fees based on payment method
  const paymentFee = paymentMethod.type === "cod" ? 50 : 0;

  // Calculate total with all fees including promo discount
  const total =
    subtotal +
    selectedShippingCost +
    tax +
    giftWrappingFee +
    paymentFee -
    promoDiscount;

  // Redirect to cart if no items
  if (cartItems.length === 0 && typeof window !== "undefined") {
    window.location.href = "/shop/cart";
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping information
    if (
      !shippingAddress.firstName ||
      !shippingAddress.lastName ||
      !shippingAddress.email ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode
    ) {
      alert("Please fill in all required shipping information");
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate payment information based on payment type
    if (paymentMethod.type === "card") {
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.expiryDate ||
        !paymentDetails.cvv
      ) {
        alert("Please fill in all required card information");
        return;
      }
    } else if (
      paymentMethod.type === "mobile" ||
      paymentMethod.type === "bkash" ||
      paymentMethod.type === "nagad"
    ) {
      if (!paymentDetails.mobileNumber) {
        alert("Please enter your mobile number");
        return;
      }
    }
    setStep("review");
  };

  const handlePlaceOrder = async () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);

    // Generate unique order ID
    const orderId = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(
      -6
    )}`;

    // Create order object
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      })),
      shipping: {
        address: shippingAddress,
        method: selectedShipping?.name || "Standard Shipping",
        cost: selectedShippingCost,
        estimatedDelivery: new Date(
          Date.now() +
            (function () {
              // Handle different formats of estimatedDays
              const days = selectedShipping?.estimatedDays || "7";
              // If it's a pickup with "Ready in X hours" format
              if (days.includes("hours") || days.includes("hour")) {
                return 1 * 24 * 60 * 60 * 1000; // Default to 1 day for pickup
              }
              // For regular shipping with format like "5-7" or "1"
              const firstNumber = days.split("-")[0].trim();
              return parseInt(firstNumber) * 24 * 60 * 60 * 1000;
            })()
        )
          .toISOString()
          .split("T")[0],
      },
      payment: {
        method: {
          ...paymentMethod,
          ...(paymentMethod.type === "card" && paymentDetails.cardNumber
            ? { cardLast4: paymentDetails.cardNumber.slice(-4) }
            : {}),
        },
        subtotal: subtotal,
        discount: promoDiscount,
        tax: tax,
        shipping: selectedShippingCost,
        giftWrapping: giftWrappingFee,
        total: total,
      },
      isGiftOrder: isGiftOrder,
      giftMessage: giftMessage,
      timeline: [
        {
          status: "Order Placed",
          date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        },
        {
          status: "Payment Confirmed",
          date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        },
      ],
    };

    // Add order to context
    addOrder(newOrder);

    // Show enhanced success notification
    showNotification(
      "success",
      "Order Successful!",
      `Thank you for your purchase. Your order #${orderId} has been placed successfully.`
    );

    // Create a custom full-screen notification overlay
    const notificationOverlay = document.createElement("div");
    notificationOverlay.className =
      "fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm";
    notificationOverlay.style.animation = "fadeIn 0.5s ease-out";

    const notificationContent = document.createElement("div");
    notificationContent.className =
      "bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-500 border border-green-500/20";
    notificationContent.style.animation =
      "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    notificationContent.innerHTML = `
      <div class="flex flex-col items-center text-center space-y-6">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="space-y-2">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Order Successful!</h2>
          <p class="text-gray-600 dark:text-gray-300">Thank you for your purchase.</p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mt-2">
            <p class="text-green-800 dark:text-green-200 font-medium">Order #${orderId} has been placed successfully</p>
          </div>
        </div>
        <div class="pt-4 w-full">
          <div class="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-green-500 rounded-full progress-bar"></div>
          </div>
        </div>
      </div>
    `;

    // Add animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes progress {
        from { width: 100%; }
        to { width: 0%; }
      }
      .progress-bar {
        animation: progress 3s linear forwards;
      }
    `;

    document.head.appendChild(style);
    notificationOverlay.appendChild(notificationContent);
    document.body.appendChild(notificationOverlay);

    // Remove notification and redirect after delay
    setTimeout(() => {
      notificationOverlay.style.opacity = "0";
      notificationOverlay.style.transition = "opacity 0.5s ease-out";

      setTimeout(() => {
        document.body.removeChild(notificationOverlay);
        // Redirect to orders page instead of shop page
        router.push("/shop/account/orders");
      }, 500);
    }, 3000);

    // Clear the cart after successful order
    clearCart();
  };

  // Function to load a saved address
  const loadSavedAddress = (address: ShippingAddress) => {
    setShippingAddress(address);
  };

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-10">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/shop"
                  className="text-sm font-light text-gray-600 dark:text-gray-400 hover:text-yellow-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FiChevronRight className="w-4 h-4 text-gray-400" />
                  <Link
                    href="/shop/cart"
                    className="ml-1 text-sm font-light text-gray-600 dark:text-gray-400 hover:text-yellow-400"
                  >
                    Cart
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FiChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                    Checkout
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            Secure checkout process
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { id: "shipping", label: "Shipping", icon: FiTruck },
              { id: "payment", label: "Payment", icon: FiCreditCard },
              { id: "review", label: "Review", icon: FiCheck },
            ].map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    step === stepItem.id ||
                    (stepItem.id === "payment" && step === "review") ||
                    (stepItem.id === "shipping" &&
                      (step === "payment" || step === "review"))
                      ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                      : "border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500"
                  }`}
                >
                  <stepItem.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium uppercase tracking-wider ${
                    step === stepItem.id ||
                    (stepItem.id === "payment" && step === "review") ||
                    (stepItem.id === "shipping" &&
                      (step === "payment" || step === "review"))
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {stepItem.label}
                </span>
                {index < 2 && (
                  <div
                    className={`ml-8 w-8 h-px ${
                      (stepItem.id === "shipping" &&
                        (step === "payment" || step === "review")) ||
                      (stepItem.id === "payment" && step === "review")
                        ? "bg-black dark:bg-white"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Shipping Information */}
            {step === "shipping" && (
              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-8">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                  <FiTruck className="w-5 h-5" />
                  Shipping Information
                </h2>

                {savedAddresses.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Saved Addresses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedAddresses.map((address, index) => (
                        <div
                          key={index}
                          onClick={() => loadSavedAddress(address)}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            shippingAddress.email === address.email &&
                            shippingAddress.address === address.address
                              ? "border-black dark:border-white bg-gray-50 dark:bg-gray-800"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {address.firstName} {address.lastName}
                            </p>
                            <p>{address.address}</p>
                            {address.apartment && <p>{address.apartment}</p>}
                            <p>
                              {address.city}, {address.postalCode}
                            </p>
                            <p>{address.country}</p>
                            <p>{address.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      Click an address to use it for this order
                    </div>
                  </div>
                )}

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={shippingAddress.firstName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={shippingAddress.lastName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={shippingAddress.email}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      value={shippingAddress.apartment || ""}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          apartment: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        required
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            postalCode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Country *
                    </label>
                    <select
                      id="country"
                      required
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                    </select>
                  </div>

                  {/* Shipping Method Selection */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                      <FiTruck className="w-5 h-5" />
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      {shippingMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedShippingMethod === method.id
                              ? "border-black dark:border-white bg-gray-50 dark:bg-gray-800"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                          onClick={() => setSelectedShippingMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value={method.id}
                                checked={selectedShippingMethod === method.id}
                                onChange={() =>
                                  setSelectedShippingMethod(method.id)
                                }
                                className="h-4 w-4 text-black focus:ring-black dark:focus:ring-white border-gray-300 dark:border-gray-600"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{method.icon}</span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {method.name}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {method.description}
                                </p>
                                {method.id === "standard" &&
                                  subtotal >= 2000 && (
                                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                      Free shipping on orders over ৳2,000
                                    </p>
                                  )}
                                {method.id === "express" &&
                                  subtotal >= 5000 && (
                                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                      Reduced price on orders over ৳5,000
                                    </p>
                                  )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {method.price === 0
                                  ? "Free"
                                  : `৳${method.price}`}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {method.estimatedDays}{" "}
                                {method.id !== "pickup" ? "days" : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedShippingMethod === "pickup" && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-start gap-3">
                          <FiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900 dark:text-blue-100">
                              Store Pickup Location
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                              123 Fashion Street, Dhanmondi, Dhaka 1205
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Store Hours: 10:00 AM - 9:00 PM (Daily)
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                              You'll receive a notification when your order is
                              ready for pickup.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 hover-lift"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Order Review */}
            {step === "review" && (
              <div className="space-y-8">
                {/* Shipping & Payment Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <FiMapPin className="w-4 h-4" />
                        Shipping Address
                      </h3>
                      <button
                        onClick={() => setStep("shipping")}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-400 flex items-center gap-1"
                      >
                        <FiEdit className="w-4 h-4" /> Edit
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>{shippingAddress.address}</p>
                      {shippingAddress.apartment && (
                        <p>{shippingAddress.apartment}</p>
                      )}
                      <p>
                        {shippingAddress.city}, {shippingAddress.postalCode}
                      </p>
                      <p>{shippingAddress.country}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <FiCreditCard className="w-4 h-4" />
                        Payment Method
                      </h3>
                      <button
                        onClick={() => setStep("payment")}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-400 flex items-center gap-1"
                      >
                        <FiEdit className="w-4 h-4" /> Edit
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {paymentMethod.type === "card" && (
                        <p>
                          Credit/Debit Card ending in{" "}
                          {paymentDetails.cardNumber?.slice(-4)}
                        </p>
                      )}
                      {paymentMethod.type === "mobile" && (
                        <p>Mobile Payment: {paymentDetails.mobileNumber}</p>
                      )}
                      {paymentMethod.type === "cod" && <p>Cash on Delivery</p>}
                      {paymentMethod.type === "paypal" && <p>PayPal</p>}
                      {paymentMethod.type === "applepay" && <p>Apple Pay</p>}
                      {paymentMethod.type === "googlepay" && <p>Google Pay</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping Method Summary */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <FiTruck className="w-4 h-4" />
                      Shipping Method
                    </h3>
                    <button
                      onClick={() => setStep("shipping")}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-400 flex items-center gap-1"
                    >
                      <FiEdit className="w-4 h-4" /> Edit
                    </button>
                  </div>
                  {selectedShipping && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{selectedShipping.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedShipping.name}
                        </span>
                        <span className="text-gray-500">
                          (
                          {selectedShippingCost === 0
                            ? "Free"
                            : `৳${selectedShippingCost}`}
                          )
                        </span>
                      </div>
                      <p>{selectedShipping.description}</p>
                      {selectedShippingMethod === "pickup" && (
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                          <p className="text-blue-700 dark:text-blue-300 text-xs">
                            <strong>Pickup Location:</strong> 123 Fashion
                            Street, Dhanmondi, Dhaka 1205
                          </p>
                          <p className="text-blue-700 dark:text-blue-300 text-xs">
                            Store Hours: 10:00 AM - 9:00 PM (Daily)
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
                    Order Items
                  </h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.color}-${item.size}`}
                        className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700"
                      >
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.color} • Size {item.size}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              ৳
                              {(
                                item.originalPrice * item.quantity
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gift Options */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                    Gift Options
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="is-gift"
                        type="checkbox"
                        checked={isGiftOrder}
                        onChange={(e) => setIsGiftOrder(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-yellow-400"
                      />
                      <label
                        htmlFor="is-gift"
                        className="ml-2 block text-sm text-gray-600 dark:text-gray-400"
                      >
                        This is a gift (৳50 additional fee)
                      </label>
                    </div>

                    {isGiftOrder && (
                      <div className="pt-2">
                        <label
                          htmlFor="gift-message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Gift Message (optional)
                        </label>
                        <textarea
                          id="gift-message"
                          rows={3}
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Add a personal message to your gift..."
                          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms & Place Order */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-8">
                  <div className="space-y-6">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-4 h-4 text-black dark:text-white mt-0.5"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-black dark:text-white hover:text-yellow-400 underline"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-black dark:text-white hover:text-yellow-400 underline"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setStep("payment")}
                        className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        Return to Payment
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={!agreeToTerms || isProcessing}
                        className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiLock className="w-4 h-4" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            {step === "payment" && (
              <div className="bg-white dark:bg-gray-800/50 rounded-lg p-8">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                  <FiCreditCard className="w-5 h-5" />
                  Payment Method
                </h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        {
                          type: "card",
                          label: "Credit / Debit Card",
                          icon: "💳",
                        },
                        { type: "mobile", label: "Mobile Banking", icon: "📱" },
                        { type: "cod", label: "Cash on Delivery", icon: "💵" },
                        // { type: "paypal", label: "PayPal", icon: "🅿️" },
                        // { type: "applepay", label: "Apple Pay", icon: "🍎" },
                        // { type: "googlepay", label: "Google Pay", icon: "🔍" },
                      ].map((method) => (
                        <div
                          key={method.type}
                          onClick={() =>
                            setPaymentMethod({
                              ...paymentMethod,
                              type: method.type as any,
                            })
                          }
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            paymentMethod.type === method.type
                              ? "border-black dark:border-white bg-gray-50 dark:bg-gray-800"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{method.icon}</div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {method.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Credit Card Form */}
                    {paymentMethod.type === "card" && (
                      <div className="space-y-4 mt-6">
                        <div>
                          <label
                            htmlFor="card-number"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="card-number"
                            required
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails.cardNumber || ""}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                cardNumber: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expiry-date"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="expiry-date"
                              required
                              placeholder="MM/YY"
                              value={paymentDetails.expiryDate || ""}
                              onChange={(e) =>
                                setPaymentDetails({
                                  ...paymentDetails,
                                  expiryDate: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              CVV *
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              required
                              placeholder="123"
                              value={paymentDetails.cvv || ""}
                              onChange={(e) =>
                                setPaymentDetails({
                                  ...paymentDetails,
                                  cvv: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="flex items-center mt-4">
                          <input
                            id="save-card"
                            type="checkbox"
                            checked={paymentMethod.savePaymentMethod || false}
                            onChange={(e) =>
                              setPaymentMethod({
                                ...paymentMethod,
                                savePaymentMethod: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-yellow-400"
                          />
                          <label
                            htmlFor="save-card"
                            className="ml-2 block text-sm text-gray-600 dark:text-gray-400"
                          >
                            Save card for future purchases
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Mobile Banking Form */}
                    {paymentMethod.type === "mobile" && (
                      <div className="space-y-4 mt-6">
                        <div>
                          <label
                            htmlFor="mobile-number"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            id="mobile-number"
                            required
                            placeholder="+880 1XXX XXXXXX"
                            value={paymentDetails.mobileNumber || ""}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                mobileNumber: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Supports bKash, Nagad, Rocket, and other mobile
                          banking services
                        </p>
                      </div>
                    )}

                    {/* Cash on Delivery Info */}
                    {paymentMethod.type === "cod" && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md mt-6">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <FiTruck className="w-4 h-4 inline mr-2" />
                          Pay cash when your order is delivered. Additional ৳50
                          handling fee applies.
                        </p>
                      </div>
                    )}

                    {/* Digital Wallet Info */}
                    {/* {(paymentMethod.type === "paypal" ||
                      paymentMethod.type === "applepay" ||
                      paymentMethod.type === "googlepay") && (
                      <div className="space-y-4 mt-6">
                        <div>
                          <label
                            htmlFor="wallet-email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="wallet-email"
                            required
                            placeholder="your-email@example.com"
                            value={paymentMethod.walletEmail || ""}
                            onChange={(e) =>
                              setPaymentMethod({
                                ...paymentMethod,
                                walletEmail: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          You will be redirected to complete payment after
                          reviewing your order
                        </p>
                      </div>
                    )} */}
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                    >
                      <FiArrowLeft className="w-4 h-4" />
                      Return to Shipping
                    </button>
                    <button
                      type="submit"
                      className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 hover-lift"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 sticky top-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.name} ({item.quantity}x)
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  {/* Subtotal */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal (
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Savings */}
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Savings</span>
                      <span>-৳{savings.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Promo Discount */}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Promo Code ({promoCode?.code})</span>
                      <span>-৳{promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                      <div>Shipping</div>
                      {selectedShipping && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {selectedShipping.name} (
                          {selectedShipping.estimatedDays}{" "}
                          {selectedShipping.id !== "pickup" ? "days" : ""})
                        </div>
                      )}
                    </div>
                    <span
                      className={
                        selectedShippingCost === 0
                          ? "text-green-600 dark:text-green-400 font-medium"
                          : "text-gray-900 dark:text-white"
                      }
                    >
                      {selectedShippingCost === 0
                        ? "Free"
                        : `৳${selectedShippingCost}`}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ৳{tax.toLocaleString()}
                    </span>
                  </div>

                  {/* Gift Wrapping Fee */}
                  {isGiftOrder && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Gift Wrapping
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ৳{giftWrappingFee.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Payment Method Fee */}
                  {paymentMethod.type === "cod" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Cash on Delivery Fee
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ৳{paymentFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    All prices are inclusive of applicable taxes
                  </p>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <FiLock className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <FiShield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Protected by buyer guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
