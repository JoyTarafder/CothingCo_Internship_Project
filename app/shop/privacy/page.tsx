"use client";

import CustomerLayout from "@/components/CustomerLayout";
import {
  FiCalendar,
  FiDatabase,
  FiEye,
  FiFileText,
  FiGlobe,
  FiInfo,
  FiLock,
  FiMail,
  FiSettings,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      icon: <FiInfo className="w-5 h-5" />,
      content: [
        "ClothingCo is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
        "By accessing or using our services, you agree to the collection and use of information in accordance with this policy.",
        "We will not use or share your information with anyone except as described in this Privacy Policy.",
        "This policy applies to all information collected through our website, mobile applications, and any related services.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <FiDatabase className="w-5 h-5" />,
      content: [
        "Personal Information: Name, email address, phone number, billing and shipping addresses, payment information, and date of birth.",
        "Account Information: Username, password, order history, preferences, and wishlist items.",
        "Technical Information: IP address, browser type, device information, operating system, and website usage data.",
        "Communication Data: Records of your communications with us, including emails, chat logs, and customer service interactions.",
        "Marketing Data: Your preferences for receiving marketing communications and your responses to our campaigns.",
      ],
    },
    {
      id: "how-we-collect",
      title: "How We Collect Information",
      icon: <FiEye className="w-5 h-5" />,
      content: [
        "Directly from you when you create an account, make a purchase, or contact us.",
        "Automatically through cookies and similar technologies when you browse our website.",
        "From third parties such as payment processors, delivery companies, and social media platforms.",
        "Through analytics tools that help us understand how you use our website.",
        "When you participate in surveys, contests, or promotional activities.",
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: <FiSettings className="w-5 h-5" />,
      content: [
        "Process and fulfill your orders, including payment processing and delivery.",
        "Provide customer service and respond to your inquiries and requests.",
        "Send you important updates about your orders, account, and our services.",
        "Personalize your experience and recommend products that may interest you.",
        "Improve our website, products, and services based on your feedback and usage patterns.",
        "Detect and prevent fraud, security breaches, and other harmful activities.",
        "Comply with legal obligations and enforce our terms of service.",
      ],
    },
    {
      id: "sharing",
      title: "Information Sharing and Disclosure",
      icon: <FiUserCheck className="w-5 h-5" />,
      content: [
        "Service Providers: We share information with trusted third-party service providers who help us operate our business.",
        "Payment Processors: Credit card and payment information is shared with secure payment processing companies.",
        "Shipping Partners: Delivery information is shared with logistics companies to fulfill your orders.",
        "Legal Requirements: We may disclose information when required by law or to protect our rights and safety.",
        "Business Transfers: Information may be transferred in the event of a merger, acquisition, or sale of our business.",
        "We do not sell, trade, or rent your personal information to third parties for marketing purposes.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <FiLock className="w-5 h-5" />,
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All sensitive data is encrypted during transmission using SSL/TLS protocols.",
        "Payment information is processed through PCI-compliant payment processors.",
        "Our servers are protected by firewalls and regular security monitoring.",
        "Access to your personal information is restricted to authorized personnel only.",
        "We regularly update our security practices to address emerging threats.",
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: <FiCalendar className="w-5 h-5" />,
      content: [
        "We retain your personal information for as long as necessary to provide our services.",
        "Account information is kept active until you request account deletion.",
        "Order history is maintained for 7 years for accounting and legal purposes.",
        "Marketing data is retained until you opt out of communications.",
        "Technical logs are typically deleted after 12 months unless required for legal purposes.",
        "You can request deletion of your data at any time, subject to legal retention requirements.",
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: <FiShield className="w-5 h-5" />,
      content: [
        "Access: You can request a copy of the personal information we hold about you.",
        "Correction: You can update or correct inaccurate personal information.",
        "Deletion: You can request deletion of your personal information, subject to legal requirements.",
        "Portability: You can request your data in a portable format.",
        "Objection: You can object to certain types of data processing.",
        "Restriction: You can request that we limit how we use your information.",
        "To exercise these rights, please contact our privacy team at privacy@clothingco.com.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: <FiGlobe className="w-5 h-5" />,
      content: [
        "We use cookies and similar technologies to enhance your browsing experience.",
        "Essential cookies are necessary for the website to function properly.",
        "Analytics cookies help us understand how visitors use our website.",
        "Marketing cookies allow us to show you relevant advertisements.",
        "You can control cookie settings through your browser preferences.",
        "For detailed information about cookies, please see our Cookie Policy.",
      ],
    },
    {
      id: "international",
      title: "International Data Transfers",
      icon: <FiGlobe className="w-5 h-5" />,
      content: [
        "Your information may be transferred to and processed in countries other than Bangladesh.",
        "We ensure adequate protection through appropriate safeguards and security measures.",
        "Data transfers comply with applicable data protection laws and regulations.",
        "We only work with service providers who meet our strict data protection standards.",
        "You consent to these transfers by using our services.",
      ],
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: <FiShield className="w-5 h-5" />,
      content: [
        "Our services are not intended for children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If we discover that we have collected information from a child under 13, we will delete it immediately.",
        "Parents or guardians who believe their child has provided us with personal information should contact us.",
        "We encourage parents to monitor their children's online activities.",
      ],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: <FiFileText className="w-5 h-5" />,
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices.",
        "We will notify you of any material changes by posting the new policy on our website.",
        "For significant changes, we may also send you an email notification.",
        "Your continued use of our services after changes constitutes acceptance of the updated policy.",
        "We encourage you to review this policy periodically.",
      ],
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: <FiMail className="w-5 h-5" />,
      content: [
        "If you have questions about this Privacy Policy, please contact us:",
        "Email: privacy@clothingco.com",
        "Phone: +880-1234-567890",
        "Address: ClothingCo Privacy Office, Gulshan, Dhaka, Bangladesh",
        "We will respond to your privacy inquiries within 30 days.",
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Learn how we collect, use, and protect your personal information
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-sm">
              <FiCalendar className="w-4 h-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <FiShield className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                  We are committed to protecting your privacy and being
                  transparent about how we use your information. This policy
                  explains our practices in clear, easy-to-understand language.
                  If you have any questions, please don't hesitate to contact
                  our privacy team.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiDatabase className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      What We Collect
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Personal info, account data, and usage analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiSettings className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      How We Use It
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Process orders, improve services, and personalize
                      experience
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiLock className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      How We Protect It
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Encryption, secure servers, and strict access controls
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiUserCheck className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Your Rights
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Access, correct, delete, or port your data anytime
                    </p>
                  </div>
                </div>
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
                  <span className="text-blue-500">{section.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {index + 1}. {section.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
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

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white mt-12">
            <div className="text-center">
              <FiMail className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Questions About Your Privacy?
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                We're here to help! If you have any questions about this Privacy
                Policy or how we handle your data, our privacy team is ready to
                assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@clothingco.com"
                  className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Email Privacy Team
                </a>
                <a
                  href="/shop/helpcenter"
                  className="bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-300 transition-colors duration-200"
                >
                  Help Center
                </a>
              </div>
              <div className="mt-6 text-sm opacity-90">
                <p>Email: privacy@clothingco.com | Phone: +880-1234-567890</p>
                <p>We respond to privacy inquiries within 30 days</p>
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
                href="/shop/terms"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
              >
                <FiFileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Terms & Conditions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Legal terms and conditions for using our services
                </p>
              </a>
              <a
                href="/shop/cookies"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
              >
                <FiSettings className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Cookie Policy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Information about cookies and tracking technologies
                </p>
              </a>
              <a
                href="/shop/accessibility"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
              >
                <FiShield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
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
