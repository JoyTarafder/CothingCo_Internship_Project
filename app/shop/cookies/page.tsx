"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useState } from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiCookie,
  FiEye,
  FiInfo,
  FiSettings,
  FiShield,
  FiTarget,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: true,
    marketing: false,
    functional: true,
  });

  const cookieTypes = [
    {
      id: "essential",
      name: "Essential Cookies",
      icon: <FiShield className="w-5 h-5" />,
      description:
        "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: [
        "Session management",
        "Security tokens",
        "Load balancing",
        "Authentication",
      ],
      duration: "Session or up to 1 year",
      canDisable: false,
      color: "red",
    },
    {
      id: "functional",
      name: "Functional Cookies",
      icon: <FiSettings className="w-5 h-5" />,
      description:
        "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: [
        "Language preferences",
        "Region selection",
        "Theme settings",
        "Cart contents",
      ],
      duration: "Up to 2 years",
      canDisable: true,
      color: "blue",
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      icon: <FiEye className="w-5 h-5" />,
      description:
        "These cookies allow us to count visits and traffic sources so we can measure and improve performance.",
      examples: [
        "Google Analytics",
        "Page views",
        "User behavior",
        "Performance metrics",
      ],
      duration: "Up to 2 years",
      canDisable: true,
      color: "green",
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      icon: <FiTarget className="w-5 h-5" />,
      description:
        "These cookies may be set by our advertising partners to build a profile of your interests.",
      examples: [
        "Facebook Pixel",
        "Google Ads",
        "Retargeting",
        "Personalized ads",
      ],
      duration: "Up to 2 years",
      canDisable: true,
      color: "purple",
    },
  ];

  const handleCookieToggle = (cookieType: string) => {
    if (cookieType === "essential") return; // Can't disable essential cookies

    setCookiePreferences((prev) => ({
      ...prev,
      [cookieType]: !prev[cookieType as keyof typeof prev],
    }));
  };

  const savePreferences = () => {
    // In a real implementation, this would save to localStorage and update the cookie consent
    console.log("Saving cookie preferences:", cookiePreferences);
    alert("Cookie preferences saved!");
  };

  const lastUpdated = "January 15, 2024";

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <FiCookie className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Learn about how we use cookies and similar technologies
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
              <FiCalendar className="w-4 h-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* What Are Cookies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <FiInfo className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What Are Cookies?
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Cookies are small text files that are stored on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work, or work more efficiently, as well as to
                provide information to website owners.
              </p>
              <p>
                We use cookies and similar technologies (like pixels and local
                storage) to enhance your browsing experience, analyze site
                traffic, personalize content, and serve targeted advertisements.
              </p>
              <p>
                You can control and/or delete cookies as you wish. You can
                delete all cookies that are already on your computer and you can
                set most browsers to prevent them from being placed.
              </p>
            </div>
          </div>

          {/* Cookie Types */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Types of Cookies We Use
            </h2>

            {cookieTypes.map((cookie) => (
              <div
                key={cookie.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 bg-${cookie.color}-100 dark:bg-${cookie.color}-900/30 rounded-lg flex items-center justify-center text-${cookie.color}-600 dark:text-${cookie.color}-400`}
                    >
                      {cookie.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {cookie.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Duration: {cookie.duration}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleCookieToggle(cookie.id)}
                    disabled={!cookie.canDisable}
                    className={`flex items-center space-x-2 ${
                      !cookie.canDisable
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-80 cursor-pointer"
                    }`}
                  >
                    {cookiePreferences[
                      cookie.id as keyof typeof cookiePreferences
                    ] ? (
                      <FiToggleRight
                        className={`w-8 h-8 text-${cookie.color}-500`}
                      />
                    ) : (
                      <FiToggleLeft className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {cookiePreferences[
                        cookie.id as keyof typeof cookiePreferences
                      ]
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {cookie.description}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Examples:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map((example, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 bg-${cookie.color}-100 dark:bg-${cookie.color}-900/30 text-${cookie.color}-800 dark:text-${cookie.color}-200 rounded-full text-sm`}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {!cookie.canDisable && (
                  <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiAlertCircle className="w-4 h-4" />
                    <span>
                      These cookies are essential and cannot be disabled
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cookie Preferences */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white mb-8">
            <div className="text-center">
              <FiSettings className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Manage Your Cookie Preferences
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                You can customize which cookies you want to accept. Essential
                cookies cannot be disabled as they are necessary for the website
                to function properly.
              </p>
              <button
                onClick={savePreferences}
                className="bg-white text-yellow-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Save Cookie Preferences
              </button>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Third-Party Cookies and Services
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Google Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  We use Google Analytics to analyze website traffic and usage
                  patterns.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  Google Privacy Policy
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Facebook Pixel
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  We use Facebook Pixel for advertising and analytics purposes.
                </p>
                <a
                  href="https://www.facebook.com/privacy/explanation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  Facebook Privacy Policy
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Payment Processors
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Payment processing services may set their own cookies for
                  security and fraud prevention.
                </p>
              </div>
            </div>
          </div>

          {/* Browser Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Browser Cookie Controls
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Chrome
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Settings → Privacy and Security → Cookies and other site data
                </p>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  Learn more
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Firefox
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Options → Privacy & Security → Cookies and Site Data
                </p>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  Learn more
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Safari
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Preferences → Privacy → Manage Website Data
                </p>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  Learn more
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Edge
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Settings → Cookies and site permissions → Cookies and site
                  data
                </p>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white mb-8">
            <div className="text-center">
              <FiInfo className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Questions About Cookies?
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                If you have any questions about our use of cookies or this
                Cookie Policy, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@clothingco.com"
                  className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Contact Us
                </a>
                <a
                  href="/shop/privacy"
                  className="bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-300 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          {/* Related Policies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Related Policies & Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/shop/privacy"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors duration-200"
              >
                <FiShield className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy Policy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  How we collect, use, and protect your personal information
                </p>
              </a>
              <a
                href="/shop/terms"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors duration-200"
              >
                <FiInfo className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Terms & Conditions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Legal terms and conditions for using our services
                </p>
              </a>
              <a
                href="/shop/accessibility"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors duration-200"
              >
                <FiEye className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Accessibility
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our commitment to digital accessibility
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
