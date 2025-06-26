"use client";

import CustomerLayout from "@/components/CustomerLayout";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiInfo,
  FiPackage,
  FiShield,
  FiTruck,
} from "react-icons/fi";

export default function ShippingInfoPage() {
  const shippingZones = [
    {
      zone: "Dhaka Metropolitan Area",
      areas: [
        "Dhaka City",
        "Uttara",
        "Dhanmondi",
        "Gulshan",
        "Banani",
        "Mirpur",
        "Mohammadpur",
      ],
      deliveryTime: "1-2 Business Days",
      cost: "৳60",
      cashOnDelivery: true,
    },
    {
      zone: "Major Cities",
      areas: [
        "Chittagong",
        "Sylhet",
        "Rajshahi",
        "Khulna",
        "Barisal",
        "Rangpur",
        "Mymensingh",
      ],
      deliveryTime: "2-3 Business Days",
      cost: "৳100",
      cashOnDelivery: true,
    },
    {
      zone: "District Towns",
      areas: ["All District Headquarters", "Sub-district Towns"],
      deliveryTime: "3-5 Business Days",
      cost: "৳120",
      cashOnDelivery: true,
    },
    {
      zone: "Remote Areas",
      areas: ["Villages", "Remote Locations", "Hard-to-reach Areas"],
      deliveryTime: "5-7 Business Days",
      cost: "৳150",
      cashOnDelivery: false,
    },
  ];

  const shippingMethods = [
    {
      name: "Standard Delivery",
      icon: <FiTruck className="w-6 h-6" />,
      description: "Regular delivery service across Bangladesh",
      timeframe: "1-7 business days depending on location",
      features: [
        "Package tracking",
        "SMS notifications",
        "Door-to-door delivery",
      ],
    },
    {
      name: "Express Delivery",
      icon: <FiClock className="w-6 h-6" />,
      description: "Faster delivery for urgent orders",
      timeframe: "1-3 business days (Dhaka & major cities only)",
      features: [
        "Priority handling",
        "Real-time tracking",
        "Same-day delivery available",
      ],
      additionalCost: "৳50 extra",
    },
    {
      name: "Cash on Delivery (COD)",
      icon: <FiPackage className="w-6 h-6" />,
      description: "Pay when you receive your order",
      timeframe: "Standard delivery timeframes apply",
      features: [
        "No advance payment",
        "Inspect before payment",
        "Available in most areas",
      ],
      codFee: "৳20 handling fee",
    },
  ];

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shipping Information
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Complete guide to our shipping services across Bangladesh. We
              deliver to your doorstep with care and reliability.
            </p>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-center space-x-3">
              <FiCheckCircle className="w-6 h-6" />
              <h2 className="text-xl font-semibold">
                Free Shipping on Orders Over ৳2000!
              </h2>
            </div>
            <p className="text-center mt-2 opacity-90">
              Enjoy free standard delivery anywhere in Bangladesh when you spend
              ৳2000 or more
            </p>
          </div>

          {/* Shipping Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Delivery Methods
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {shippingMethods.map((method, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-yellow-500">{method.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {method.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    {method.timeframe}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {method.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {method.additionalCost && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Additional Cost:</strong>{" "}
                        {method.additionalCost}
                      </p>
                    </div>
                  )}
                  {method.codFee && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>COD Fee:</strong> {method.codFee}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Zones */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Delivery Zones & Costs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      Zone
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      Areas Covered
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      Delivery Time
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      Shipping Cost
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      COD Available
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700"
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {zone.zone}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {zone.areas.slice(0, 3).join(", ")}
                          {zone.areas.length > 3 && (
                            <span className="text-yellow-600">
                              {" "}
                              +{zone.areas.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                          {zone.deliveryTime}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {zone.cost}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {zone.cashOnDelivery ? (
                          <FiCheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="text-red-500 text-sm">
                            Not Available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Policies */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Processing Time */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FiClock className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Processing Time
                </h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Regular Orders:</strong> 1-2 business days
                </p>
                <p>
                  <strong>Custom Orders:</strong> 3-5 business days
                </p>
                <p>
                  <strong>Pre-orders:</strong> As specified on product page
                </p>
                <p>
                  <strong>Sale Items:</strong> 2-3 business days (high volume)
                </p>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <FiInfo className="inline w-4 h-4 mr-1" />
                  Orders placed after 6 PM will be processed the next business
                  day
                </p>
              </div>
            </div>

            {/* Packaging */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FiPackage className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Packaging & Security
                </h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Eco-friendly:</strong> Recyclable packaging materials
                </p>
                <p>
                  <strong>Secure:</strong> Tamper-proof sealing
                </p>
                <p>
                  <strong>Protection:</strong> Bubble wrap for fragile items
                </p>
                <p>
                  <strong>Branding:</strong> Official ClothingCo packaging
                </p>
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <FiShield className="inline w-4 h-4 mr-1" />
                  All packages are insured against damage and loss
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Partners */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Delivery Partners
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiTruck className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Pathao Courier
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fast delivery in Dhaka and major cities
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiTruck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Steadfast Courier
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reliable nationwide delivery service
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiTruck className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  RedX Delivery
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Express delivery for urgent orders
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Important Shipping Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiAlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Address Accuracy
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please provide complete and accurate delivery address
                    including landmarks, phone number, and recipient name.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiAlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Delivery Attempts
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We make up to 3 delivery attempts. If unsuccessful, the
                    package will be returned to our warehouse.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiAlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Weather & Holidays
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Delivery may be delayed during severe weather conditions,
                    national holidays, or unexpected circumstances.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Package Tracking
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track your order using our tracking system or the delivery
                    partner's app for real-time updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Help with Your Shipment?
              </h2>
              <p className="mb-6 opacity-90">
                Our customer service team is here to help with any shipping
                questions or concerns
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop/contact"
                  className="bg-white text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a
                  href="/shop/trackorder"
                  className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                >
                  Track Your Order
                </a>
              </div>
              <div className="mt-6 text-sm opacity-90">
                <p>
                  Customer Service Hours: Saturday - Thursday, 9:00 AM - 9:00 PM
                </p>
                <p>Phone: +880-1234-567890 | Email: shipping@clothingco.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
