"use client";

import CustomerLayout from "@/components/CustomerLayout";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheck,
  FiEye,
  FiHeart,
  FiInfo,
  FiMail,
  FiMousePointer,
  FiSettings,
} from "react-icons/fi";
import { MdHearing, MdKeyboard } from "react-icons/md";

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Visual Accessibility",
      features: [
        "High contrast color schemes",
        "Scalable text up to 200% zoom",
        "Alternative text for all images",
        "Clear visual hierarchy and focus indicators",
        "Color-blind friendly design",
      ],
    },
    {
      icon: <MdKeyboard className="w-6 h-6" />,
      title: "Keyboard Navigation",
      features: [
        "Full keyboard navigation support",
        "Logical tab order throughout the site",
        "Skip links to main content",
        "Keyboard shortcuts for common actions",
        "No keyboard traps",
      ],
    },
    {
      icon: <MdHearing className="w-6 h-6" />,
      title: "Screen Reader Support",
      features: [
        "Semantic HTML structure",
        "ARIA labels and descriptions",
        "Descriptive link text",
        "Form labels and error messages",
        "Live region announcements",
      ],
    },
    {
      icon: <FiMousePointer className="w-6 h-6" />,
      title: "Motor Accessibility",
      features: [
        "Large clickable areas",
        "Generous spacing between elements",
        "No time-sensitive actions",
        "Drag and drop alternatives",
        "Voice control compatibility",
      ],
    },
  ];

  const wcagCompliance = [
    {
      level: "A",
      status: "Compliant",
      icon: <FiCheck className="w-5 h-5 text-green-500" />,
      description: "Basic accessibility requirements met",
    },
    {
      level: "AA",
      status: "Compliant",
      icon: <FiCheck className="w-5 h-5 text-green-500" />,
      description: "Standard accessibility requirements met",
    },
    {
      level: "AAA",
      status: "Partial",
      icon: <FiSettings className="w-5 h-5 text-yellow-500" />,
      description: "Working towards enhanced accessibility",
    },
  ];

  const assistiveTechnologies = [
    {
      name: "Screen Readers",
      tools: ["NVDA", "JAWS", "VoiceOver", "TalkBack"],
      icon: <MdHearing className="w-5 h-5" />,
    },
    {
      name: "Voice Control",
      tools: ["Dragon NaturallySpeaking", "Voice Access", "Voice Control"],
      icon: <FiMousePointer className="w-5 h-5" />,
    },
    {
      name: "Magnification",
      tools: ["ZoomText", "MAGic", "Built-in browser zoom"],
      icon: <FiEye className="w-5 h-5" />,
    },
    {
      name: "Alternative Input",
      tools: ["Switch navigation", "Eye tracking", "Head tracking"],
      icon: <MdKeyboard className="w-5 h-5" />,
    },
  ];

  const lastUpdated = "January 15, 2024";

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <FiHeart className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Accessibility Statement
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Our commitment to making ClothingCo accessible to everyone
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-lg text-sm">
              <FiCalendar className="w-4 h-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <FiHeart className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Commitment to Accessibility
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                At ClothingCo, we believe that everyone should have equal access
                to information and functionality on our website. We are
                committed to providing a website that is accessible to the
                widest possible audience, regardless of technology or ability.
              </p>
              <p>
                We actively work to increase the accessibility and usability of
                our website and follow the Web Content Accessibility Guidelines
                (WCAG) 2.1 to ensure our website is accessible to people with
                disabilities.
              </p>
              <p>
                This statement reflects our ongoing efforts to improve digital
                accessibility for all users and outlines the measures we have
                implemented and continue to develop.
              </p>
            </div>
          </div>

          {/* WCAG Compliance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              WCAG 2.1 Compliance Status
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {wcagCompliance.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <div className="flex items-center justify-center mb-4">
                    {item.icon}
                    <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                      Level {item.level}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "Compliant"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Accessibility Features
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {accessibilityFeatures.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-2"
                      >
                        <FiCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Assistive Technologies */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Supported Assistive Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our website has been tested with and supports the following
              assistive technologies:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {assistiveTechnologies.map((tech, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-purple-500">{tech.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {tech.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Tools */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white mb-8">
            <div className="text-center">
              <FiSettings className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Browser Accessibility Tools
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Most modern browsers include built-in accessibility features.
                Here are some helpful tips:
              </p>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Keyboard Shortcuts</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Tab: Navigate between elements</li>
                    <li>• Enter/Space: Activate buttons and links</li>
                    <li>• Esc: Close modals and menus</li>
                    <li>• Arrow keys: Navigate within menus</li>
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Browser Features</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Ctrl/Cmd + Plus: Zoom in</li>
                    <li>• Ctrl/Cmd + Minus: Zoom out</li>
                    <li>• F5: Refresh page</li>
                    <li>• Browser reader mode available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Known Issues */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <FiAlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  Known Issues and Limitations
                </h3>
                <div className="text-yellow-800 dark:text-yellow-200 text-sm space-y-2">
                  <p>
                    We are continuously working to improve accessibility.
                    Currently identified areas for improvement include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Some third-party embedded content may not be fully
                      accessible
                    </li>
                    <li>
                      Complex data visualizations are being enhanced with
                      alternative formats
                    </li>
                    <li>
                      Video content is being updated with captions and
                      transcripts
                    </li>
                    <li>
                      Mobile app accessibility features are in development
                    </li>
                  </ul>
                  <p className="mt-3">
                    <strong>Timeline:</strong> We aim to address these issues by
                    Q2 2024.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testing and Monitoring */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Testing and Monitoring
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Regular Testing
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">
                      Automated accessibility scanning
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">
                      Manual testing with assistive technologies
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">
                      User testing with disabled users
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">
                      Third-party accessibility audits
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Continuous Improvement
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">
                      Monthly accessibility reviews
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">
                      Staff accessibility training
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">User feedback integration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Technology stack updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact and Feedback */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white mb-8">
            <div className="text-center">
              <FiMail className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Accessibility Feedback
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                We welcome your feedback on the accessibility of ClothingCo. If
                you encounter any barriers or have suggestions for improvement,
                please let us know.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="mailto:accessibility@clothingco.com"
                  className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Email Accessibility Team
                </a>
                <a
                  href="tel:+8801234567890"
                  className="bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-300 transition-colors duration-200"
                >
                  Call Accessibility Hotline
                </a>
              </div>

              <div className="text-sm opacity-90 space-y-1">
                <p>Email: accessibility@clothingco.com</p>
                <p>Phone: +880-1234-567890 (9 AM - 5 PM, Mon-Fri)</p>
                <p>
                  We aim to respond to accessibility feedback within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Related Policies & Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/shop/privacy"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors duration-200"
              >
                <FiEye className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy Policy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  How we protect your personal information
                </p>
              </a>
              <a
                href="/shop/terms"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors duration-200"
              >
                <FiInfo className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Terms & Conditions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Legal terms for using our services
                </p>
              </a>
              <a
                href="/shop/helpcenter"
                className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors duration-200"
              >
                <FiSettings className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Help Center
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get support and find answers
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
