"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useState } from "react";
import {
  FiBook,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiHelpCircle,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPackage,
  FiPhone,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from "react-icons/fi";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Topics", icon: <FiBook className="w-5 h-5" /> },
    {
      id: "orders",
      name: "Orders & Tracking",
      icon: <FiShoppingBag className="w-5 h-5" />,
    },
    {
      id: "shipping",
      name: "Shipping & Delivery",
      icon: <FiTruck className="w-5 h-5" />,
    },
    {
      id: "returns",
      name: "Returns & Exchanges",
      icon: <FiRefreshCw className="w-5 h-5" />,
    },
    {
      id: "payment",
      name: "Payment & Billing",
      icon: <FiCreditCard className="w-5 h-5" />,
    },
    {
      id: "account",
      name: "Account & Profile",
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      id: "products",
      name: "Products & Sizing",
      icon: <FiPackage className="w-5 h-5" />,
    },
  ];

  const faqs = [
    {
      id: "1",
      category: "orders",
      question: "How can I track my order?",
      answer:
        "You can track your order by visiting our Track Order page and entering your order ID or tracking number. You'll also receive tracking information via SMS and email once your order ships.",
      popular: true,
    },
    {
      id: "2",
      category: "orders",
      question: "Can I cancel or modify my order?",
      answer:
        "Orders can be cancelled or modified within 2 hours of placement. After that, we begin processing and changes may not be possible. Contact our support team immediately if you need to make changes.",
      popular: true,
    },
    {
      id: "3",
      category: "shipping",
      question: "What are your delivery areas in Bangladesh?",
      answer:
        "We deliver across Bangladesh including Dhaka (1-2 days), major cities like Chittagong, Sylhet (2-3 days), district towns (3-5 days), and remote areas (5-7 days). Shipping costs vary by location.",
      popular: true,
    },
    {
      id: "4",
      category: "shipping",
      question: "Do you offer Cash on Delivery (COD)?",
      answer:
        "Yes, we offer COD in most areas across Bangladesh. There's a ৳20 handling fee for COD orders. COD is not available in some remote locations.",
      popular: false,
    },
    {
      id: "5",
      category: "returns",
      question: "What is your return policy?",
      answer:
        "Most items can be returned within 30 days of delivery. Items must be unworn with original tags. Defective items can be returned within 60 days. We provide free return shipping for most returns.",
      popular: true,
    },
    {
      id: "6",
      category: "returns",
      question: "How long do refunds take?",
      answer:
        "Refunds are processed within 5-7 business days after we receive your return. The time for money to appear in your account depends on your payment method: cards (5-7 days), bKash/Nagad (3-5 days).",
      popular: false,
    },
    {
      id: "7",
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, bKash, Nagad, bank transfers, and Cash on Delivery. All online payments are secured with SSL encryption for your safety.",
      popular: true,
    },
    {
      id: "8",
      category: "payment",
      question: "Is it safe to pay online on your website?",
      answer:
        "Yes, absolutely! We use SSL encryption and work with trusted payment gateways. We never store your complete card details on our servers. Your payment information is completely secure.",
      popular: false,
    },
    {
      id: "9",
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button and provide your email, name, and password. You'll receive a verification email to activate your account. You can also create an account during checkout.",
      popular: false,
    },
    {
      id: "10",
      category: "account",
      question: "I forgot my password. How can I reset it?",
      answer:
        "Click 'Forgot Password' on the login page and enter your email. You'll receive a password reset link. Click the link and create a new password for your account.",
      popular: false,
    },
    {
      id: "11",
      category: "products",
      question: "How do I find the right size?",
      answer:
        "Each product page has a detailed size guide. Measure yourself and compare with our size chart. If you're between sizes, we recommend going one size up. You can also contact us for personalized sizing advice.",
      popular: true,
    },
    {
      id: "12",
      category: "products",
      question: "Are the colors accurate in photos?",
      answer:
        "We try our best to show accurate colors, but screen settings can affect how colors appear. If the color is significantly different from what's shown, you can return the item within 30 days.",
      popular: false,
    },
  ];

  const quickLinks = [
    {
      title: "Track Your Order",
      description: "Get real-time updates on your shipment",
      icon: <FiTruck className="w-6 h-6" />,
      link: "/shop/trackorder",
      color: "bg-blue-500",
    },
    {
      title: "Start a Return",
      description: "Easy returns and exchanges",
      icon: <FiRefreshCw className="w-6 h-6" />,
      link: "/shop/returnexchange",
      color: "bg-green-500",
    },
    {
      title: "Shipping Info",
      description: "Delivery areas and costs",
      icon: <FiMapPin className="w-6 h-6" />,
      link: "/shop/shippinginfo",
      color: "bg-purple-500",
    },
    {
      title: "Size Guide",
      description: "Find your perfect fit",
      icon: <FiPackage className="w-6 h-6" />,
      link: "/shop/sizing",
      color: "bg-orange-500",
    },
  ];

  const contactOptions = [
    {
      method: "Live Chat",
      description: "Chat with our support team",
      availability: "9 AM - 9 PM (Sat-Thu)",
      icon: <FiMessageCircle className="w-6 h-6" />,
      action: "Start Chat",
      primary: true,
    },
    {
      method: "Email Support",
      description: "support@clothingco.com",
      availability: "24/7 - Response within 24 hours",
      icon: <FiMail className="w-6 h-6" />,
      action: "Send Email",
      primary: false,
    },
    {
      method: "Phone Support",
      description: "+880-1234-567890",
      availability: "9 AM - 6 PM (Sat-Thu)",
      icon: <FiPhone className="w-6 h-6" />,
      action: "Call Now",
      primary: false,
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFaqs = faqs.filter((faq) => faq.popular);

  const handleFaqToggle = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to your questions, get support, and learn more about
              shopping with ClothingCo
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 group"
              >
                <div
                  className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  {link.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {link.description}
                </p>
              </a>
            ))}
          </div>

          {/* Popular FAQs */}
          {!searchQuery && activeCategory === "all" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Popular Questions
              </h2>
              <div className="space-y-4">
                {popularFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <button
                      onClick={() => handleFaqToggle(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeCategory === "all"
                  ? "All Questions"
                  : categories.find((c) => c.id === activeCategory)?.name}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredFaqs.length} question
                {filteredFaqs.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <FiHelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No questions found. Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <button
                      onClick={() => handleFaqToggle(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        {faq.popular && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                            Popular
                          </span>
                        )}
                      </div>
                      {expandedFaq === faq.id ? (
                        <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <FiChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Can't find what you're looking for? Our support team is here to
                help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-6 text-center transition-all duration-200 ${
                    option.primary
                      ? "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 hover:border-yellow-400"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                      option.primary
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {option.method}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {option.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-center">
                    <FiClock className="w-4 h-4 mr-1" />
                    {option.availability}
                  </p>
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      option.primary
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <FiShield className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Your Satisfaction is Our Priority
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                We're committed to providing excellent customer service. If
                you're not completely satisfied with your purchase or
                experience, let us know and we'll make it right.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop/contact"
                  className="bg-white text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Contact Us
                </a>
                <a
                  href="/shop/about"
                  className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
