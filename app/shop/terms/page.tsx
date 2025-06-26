"use client";

import CustomerLayout from "@/components/CustomerLayout";
import {
  FiAlertCircle,
  FiBook,
  FiCalendar,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiInfo,
  FiLock,
  FiRefreshCw,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <FiBook className="w-5 h-5" />,
      content: [
        "By accessing and using the ClothingCo website, mobile application, or any of our services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use our services.",
        "We reserve the right to change these terms at any time without prior notice to you.",
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      icon: <FiInfo className="w-5 h-5" />,
      content: [
        '"Company" (referred to either as "we", "us" or "our") refers to ClothingCo.',
        '"You" refers to the user or viewer of our website or services.',
        '"Services" refers to our website, mobile applications, and all related services.',
        '"Products" refers to clothing items and accessories available for purchase.',
        '"Content" refers to all text, images, videos, and other materials on our platform.',
      ],
    },
    {
      id: "account",
      title: "User Account",
      icon: <FiUsers className="w-5 h-5" />,
      content: [
        "You may need to create an account to access certain features of our services.",
        "You are responsible for maintaining the confidentiality of your account and password.",
        "You are responsible for all activities that occur under your account.",
        "You must provide accurate and complete information when creating an account.",
        "You must immediately notify us of any unauthorized use of your account.",
      ],
    },
    {
      id: "purchases",
      title: "Purchases and Payment",
      icon: <FiCreditCard className="w-5 h-5" />,
      content: [
        "All purchases are subject to product availability and our acceptance of your order.",
        "Prices are subject to change without notice until payment is completed.",
        "We reserve the right to refuse or cancel any order for any reason.",
        "Payment must be received by us before dispatch of products.",
        "We accept various payment methods including credit cards, mobile banking, and cash on delivery.",
      ],
    },
    {
      id: "shipping",
      title: "Shipping and Delivery",
      icon: <FiTruck className="w-5 h-5" />,
      content: [
        "Delivery times are estimates and not guaranteed unless specifically stated.",
        "Risk of loss and title for products pass to you upon delivery to the carrier.",
        "Shipping charges are non-refundable unless we made an error in fulfillment.",
        "We are not responsible for delays caused by customs, weather, or carrier issues.",
        "You must inspect products immediately upon delivery and report any issues within 48 hours.",
      ],
    },
    {
      id: "returns",
      title: "Returns and Refunds",
      icon: <FiRefreshCw className="w-5 h-5" />,
      content: [
        "Returns must be initiated within 30 days of delivery for most items.",
        "Products must be in original condition with tags attached.",
        "Certain items like intimate apparel and customized products are not returnable.",
        "Refunds will be processed within 5-7 business days after we receive the returned item.",
        "Return shipping costs may be deducted from your refund unless the return is due to our error.",
      ],
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: <FiLock className="w-5 h-5" />,
      content: [
        "All content on our website is owned by ClothingCo or our licensors.",
        "You may not copy, reproduce, distribute, or create derivative works without permission.",
        "Product images and descriptions are for illustrative purposes only.",
        "Our trademarks, logos, and brand names are protected intellectual property.",
        "User-generated content may be used by us for marketing and promotional purposes.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      icon: <FiShield className="w-5 h-5" />,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy.",
        "We collect and use personal information as described in our Privacy Policy.",
        "We implement appropriate security measures to protect your information.",
        "We do not sell or rent your personal information to third parties.",
        "You have rights regarding your personal data as outlined in our Privacy Policy.",
      ],
    },
    {
      id: "prohibited",
      title: "Prohibited Uses",
      icon: <FiAlertCircle className="w-5 h-5" />,
      content: [
        "You may not use our services for any unlawful purpose or to solicit others to perform unlawful acts.",
        "You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.",
        "You may not transmit any worms, viruses, or any code of a destructive nature.",
        "You may not infringe upon or violate our intellectual property rights or the rights of others.",
        "You may not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <FiShield className="w-5 h-5" />,
      content: [
        'Our services are provided on an "as is" and "as available" basis.',
        "We do not warrant that our services will be uninterrupted or error-free.",
        "We are not liable for any indirect, incidental, special, or consequential damages.",
        "Our total liability to you for any claim shall not exceed the amount paid by you for the specific product or service.",
        "Some jurisdictions do not allow certain limitations of liability, so some limitations may not apply to you.",
      ],
    },
    {
      id: "indemnification",
      title: "Indemnification",
      icon: <FiShield className="w-5 h-5" />,
      content: [
        "You agree to defend, indemnify, and hold harmless ClothingCo from and against any claims, damages, costs, and expenses.",
        "This includes reasonable attorneys' fees arising from or related to your use of our services.",
        "This includes your violation of these Terms of Service or your violation of any law or rights of a third party.",
        "This indemnification obligation will survive termination of these terms.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      icon: <FiAlertCircle className="w-5 h-5" />,
      content: [
        "We may terminate or suspend your account and access to our services immediately, without prior notice.",
        "Termination may occur for any reason, including breach of these Terms of Service.",
        "Upon termination, your right to use our services will cease immediately.",
        "All provisions of these Terms which should survive termination shall survive termination.",
      ],
    },
    {
      id: "governing",
      title: "Governing Law",
      icon: <FiGlobe className="w-5 h-5" />,
      content: [
        "These Terms shall be interpreted and governed by the laws of Bangladesh.",
        "Any disputes arising from these terms shall be resolved in the courts of Dhaka, Bangladesh.",
        "If any provision of these terms is found to be unenforceable, the remainder shall remain in full force.",
        "Our failure to enforce any right or provision shall not constitute a waiver of such right or provision.",
      ],
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: <FiCalendar className="w-5 h-5" />,
      content: [
        "We reserve the right to update or change our Terms of Service at any time.",
        "Changes will be posted on this page with an updated revision date.",
        "Your continued use of our services after changes constitutes acceptance of the new terms.",
        "We encourage you to review these terms periodically for any changes.",
      ],
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: <FiFileText className="w-5 h-5" />,
      content: [
        "If you have any questions about these Terms of Service, please contact us:",
        "Email: legal@clothingco.com",
        "Phone: +880-1234-567890",
        "Address: ClothingCo Legal Department, Gulshan, Dhaka, Bangladesh",
        "We will respond to your inquiries within 48 hours during business days.",
      ],
    },
  ];

  const lastUpdated = "January 15, 2024";

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Please read these terms and conditions carefully before using our
              services
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
              <FiCalendar className="w-4 h-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <FiInfo className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Important Notice
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  By using ClothingCo's website and services, you agree to be
                  legally bound by these terms and conditions. These terms
                  govern your relationship with us and outline your rights and
                  responsibilities as a user. Please take the time to read and
                  understand these terms before making any purchases or using
                  our services.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-yellow-500">{section.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {index + 1}. {section.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Acknowledgment */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white mt-12">
            <div className="text-center">
              <FiShield className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Acknowledgment</h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                By using our services, you acknowledge that you have read these
                Terms & Conditions, understood them, and agree to be bound by
                them. If you do not agree to these terms, please do not use our
                services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop"
                  className="bg-white text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Continue Shopping
                </a>
                <a
                  href="/shop/helpcenter"
                  className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                >
                  Need Help?
                </a>
              </div>
              <div className="mt-6 text-sm opacity-90">
                <p>Questions about these terms? Contact our legal team</p>
                <p>Email: legal@clothingco.com | Phone: +880-1234-567890</p>
              </div>
            </div>
          </div>

          {/* Related Policies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Related Policies & Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/shop/privacy"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors duration-200"
              >
                <FiLock className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy Policy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  How we collect, use, and protect your personal information
                </p>
              </a>
              <a
                href="/shop/returnexchange"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors duration-200"
              >
                <FiRefreshCw className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Return Policy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Detailed information about returns and exchanges
                </p>
              </a>
              <a
                href="/shop/shippinginfo"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors duration-200"
              >
                <FiTruck className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Shipping Info
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Delivery areas, costs, and shipping policies
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
