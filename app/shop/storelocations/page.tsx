"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiHeart,
  FiInfo,
  FiMail,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiUsers,
} from "react-icons/fi";

export default function StoreLocationsPage() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const storeLocations = [
    {
      id: "uttara",
      name: "ClothingCo Uttara",
      address: "House 45, Road 7, Sector 4, Uttara, Dhaka-1230",
      area: "Uttara",
      phone: "+880-1234-567801",
      email: "uttara@clothingco.com",
      hours: {
        weekdays: "10:00 AM - 10:00 PM",
        friday: "2:00 PM - 10:00 PM",
        saturday: "10:00 AM - 10:00 PM",
      },
      features: [
        "Parking Available",
        "Free WiFi",
        "Air Conditioned",
        "Personal Shopping",
        "Alterations",
      ],
      specialties: ["Men's Fashion", "Women's Collection", "Kids Wear"],
      size: "2,500 sq ft",
      established: "2020",
      manager: "Md. Rahman Ahmed",
      description:
        "Our flagship store in Uttara offers the complete ClothingCo experience with three floors of fashion for the entire family.",
      coordinates: { lat: 23.8759, lng: 90.3795 },
      images: [
        "/images/stores/uttara-front.jpg",
        "/images/stores/uttara-interior.jpg",
      ],
      rating: 4.8,
      reviews: 156,
    },
    {
      id: "jamuna",
      name: "ClothingCo Jamuna Future Park",
      address:
        "Level 3, Jamuna Future Park, Ka-244, Progoti Shoroni, Kuril, Dhaka-1229",
      area: "Jamuna Future Park",
      phone: "+880-1234-567802",
      email: "jamuna@clothingco.com",
      hours: {
        weekdays: "10:00 AM - 10:00 PM",
        friday: "10:00 AM - 10:00 PM",
        saturday: "10:00 AM - 10:00 PM",
      },
      features: [
        "Mall Location",
        "Food Court Nearby",
        "Free WiFi",
        "Gift Wrapping",
        "Returns Counter",
      ],
      specialties: ["Trendy Collection", "Premium Brands", "Accessories"],
      size: "3,200 sq ft",
      established: "2021",
      manager: "Ms. Fatima Khatun",
      description:
        "Located in the heart of Jamuna Future Park, this store features our latest collections and premium fashion lines.",
      coordinates: { lat: 23.8103, lng: 90.4125 },
      images: [
        "/images/stores/jamuna-exterior.jpg",
        "/images/stores/jamuna-display.jpg",
      ],
      rating: 4.7,
      reviews: 203,
    },
    {
      id: "badda",
      name: "ClothingCo Badda",
      address: "Plot 123, Badda Link Road, Badda, Dhaka-1212",
      area: "Badda",
      phone: "+880-1234-567803",
      email: "badda@clothingco.com",
      hours: {
        weekdays: "9:30 AM - 9:30 PM",
        friday: "2:00 PM - 9:30 PM",
        saturday: "9:30 AM - 9:30 PM",
      },
      features: [
        "Street Parking",
        "Quick Service",
        "Local Delivery",
        "Cash & Card",
        "Student Discounts",
      ],
      specialties: ["Casual Wear", "Office Attire", "Budget-Friendly"],
      size: "1,800 sq ft",
      established: "2022",
      manager: "Mr. Karim Uddin",
      description:
        "Our community-focused store in Badda serves local residents with affordable fashion and personalized service.",
      coordinates: { lat: 23.7809, lng: 90.4254 },
      images: [
        "/images/stores/badda-storefront.jpg",
        "/images/stores/badda-interior.jpg",
      ],
      rating: 4.5,
      reviews: 89,
    },
    {
      id: "nikhunjo",
      name: "ClothingCo Nikhunjo",
      address: "Block C, House 56, Road 2, Nikhunjo, Khilkhet, Dhaka-1229",
      area: "Nikhunjo",
      phone: "+880-1234-567804",
      email: "nikhunjo@clothingco.com",
      hours: {
        weekdays: "10:00 AM - 9:00 PM",
        friday: "2:30 PM - 9:00 PM",
        saturday: "10:00 AM - 9:00 PM",
      },
      features: [
        "Residential Area",
        "Family Friendly",
        "Kids Play Area",
        "Comfortable Seating",
        "Easy Access",
      ],
      specialties: ["Family Fashion", "Children's Clothing", "Maternity Wear"],
      size: "2,000 sq ft",
      established: "2023",
      manager: "Mrs. Nasreen Begum",
      description:
        "Our newest location in Nikhunjo residential area, designed for families with children's play area and comfortable shopping experience.",
      coordinates: { lat: 23.8298, lng: 90.4184 },
      images: [
        "/images/stores/nikhunjo-entrance.jpg",
        "/images/stores/nikhunjo-kids-area.jpg",
      ],
      rating: 4.6,
      reviews: 67,
    },
  ];

  const services = [
    {
      icon: <FiShoppingBag className="w-6 h-6" />,
      title: "Personal Shopping",
      description: "Get personalized style advice from our fashion experts",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Easy Returns",
      description: "Hassle-free returns and exchanges at any store location",
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "Alterations",
      description: "Professional tailoring services for the perfect fit",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Group Shopping",
      description: "Special arrangements for family and group shopping",
    },
  ];

  const filteredStores = storeLocations.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Store Locations
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Visit our physical stores across Dhaka for a personalized shopping
              experience. Try on, feel the fabric, and get expert styling advice
              from our team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by store name, area, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Store Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                {filteredStores.length}
              </span>{" "}
              store{filteredStores.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Store Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                {/* Store Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{store.name}</h3>
                    <div className="flex items-center space-x-1">
                      <FiStar className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">
                        {store.rating}
                      </span>
                      <span className="text-sm opacity-75">
                        ({store.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-100">
                    <FiMapPin className="w-4 h-4" />
                    <span className="text-sm">{store.area}</span>
                  </div>
                </div>

                {/* Store Content */}
                <div className="p-6">
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {store.description}
                  </p>

                  {/* Address & Contact */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {store.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiPhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <a
                        href={`tel:${store.phone}`}
                        className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                      >
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <a
                        href={`mailto:${store.email}`}
                        className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                      >
                        {store.email}
                      </a>
                    </div>
                  </div>

                  {/* Store Hours */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FiClock className="w-4 h-4 mr-2" />
                      Store Hours
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Saturday - Thursday:</span>
                        <span>{store.hours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday:</span>
                        <span>{store.hours.friday}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Store Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {store.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {store.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Store Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Size:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white font-medium">
                        {store.size}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Established:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white font-medium">
                        {store.established}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Manager:
                      </span>
                      <span className="ml-2 text-gray-900 dark:text-white font-medium">
                        {store.manager}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <FiNavigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </button>
                    <button
                      onClick={() =>
                        setSelectedStore(
                          selectedStore === store.id ? null : store.id
                        )
                      }
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <FiInfo className="w-4 h-4 mr-2" />
                      {selectedStore === store.id
                        ? "Hide Details"
                        : "More Details"}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedStore === store.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                            Parking Information
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {store.features.includes("Parking Available")
                              ? "Free parking available for customers. Limited spaces, first-come first-served."
                              : "Street parking available. Please check local parking regulations."}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                            Accessibility
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Wheelchair accessible entrance and fitting rooms
                            available. Please contact the store for specific
                            accessibility needs.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                            Payment Methods
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We accept cash, all major credit/debit cards, bKash,
                            Nagad, and mobile banking.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Store Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400 mx-auto mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visit Information */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Plan Your Visit</h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Experience ClothingCo in person! Visit any of our store
                locations for personalized service, expert styling advice, and
                the complete fashion experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop/contact"
                  className="bg-white text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                >
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </a>
                <a
                  href="/shop/helpcenter"
                  className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center"
                >
                  <FiInfo className="w-4 h-4 mr-2" />
                  Store FAQs
                </a>
              </div>
              <div className="mt-6 text-sm opacity-90">
                <p>All stores follow COVID-19 safety protocols</p>
                <p>Call ahead to check current availability and services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
