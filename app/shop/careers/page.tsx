"use client";

import CustomerLayout from "@/components/CustomerLayout";
import { useState } from "react";
import {
  FiAward,
  FiBook,
  FiChevronRight,
  FiClock,
  FiCoffee,
  FiDollarSign,
  FiGift,
  FiHeart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "retail", name: "Retail & Sales" },
    { id: "design", name: "Design & Creative" },
    { id: "marketing", name: "Marketing & Digital" },
    { id: "operations", name: "Operations & Logistics" },
    { id: "tech", name: "Technology & IT" },
    { id: "management", name: "Management" },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "dhaka", name: "Dhaka" },
    { id: "chittagong", name: "Chittagong" },
    { id: "sylhet", name: "Sylhet" },
    { id: "remote", name: "Remote" },
  ];

  const jobListings = [
    {
      id: 1,
      title: "Senior Fashion Designer",
      department: "design",
      location: "dhaka",
      type: "Full-time",
      experience: "3-5 years",
      salary: "৳50,000 - ৳80,000",
      description:
        "Lead our design team in creating trendy and innovative clothing collections.",
      requirements: [
        "Bachelor's degree in Fashion Design or related field",
        "3+ years of fashion design experience",
        "Proficiency in Adobe Creative Suite",
        "Strong understanding of current fashion trends",
        "Experience with technical design and pattern making",
      ],
      responsibilities: [
        "Create seasonal clothing collections",
        "Collaborate with production team",
        "Research fashion trends and market demands",
        "Mentor junior designers",
        "Present designs to stakeholders",
      ],
      posted: "2024-01-15",
    },
    {
      id: 2,
      title: "Digital Marketing Manager",
      department: "marketing",
      location: "dhaka",
      type: "Full-time",
      experience: "2-4 years",
      salary: "৳40,000 - ৳65,000",
      description:
        "Drive our digital marketing strategy and online brand presence.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "2+ years of digital marketing experience",
        "Experience with social media advertising",
        "Knowledge of SEO and content marketing",
        "Analytics and data-driven mindset",
      ],
      responsibilities: [
        "Develop digital marketing campaigns",
        "Manage social media channels",
        "Analyze campaign performance",
        "Collaborate with design team",
        "Optimize online customer journey",
      ],
      posted: "2024-01-12",
    },
    {
      id: 3,
      title: "Store Manager",
      department: "retail",
      location: "chittagong",
      type: "Full-time",
      experience: "2-3 years",
      salary: "৳35,000 - ৳55,000",
      description:
        "Manage daily operations of our flagship store in Chittagong.",
      requirements: [
        "Bachelor's degree preferred",
        "2+ years of retail management experience",
        "Strong leadership and communication skills",
        "Customer service excellence",
        "Sales target achievement experience",
      ],
      responsibilities: [
        "Oversee daily store operations",
        "Manage and train store staff",
        "Achieve sales targets",
        "Ensure excellent customer service",
        "Maintain store presentation standards",
      ],
      posted: "2024-01-10",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      department: "tech",
      location: "remote",
      type: "Full-time",
      experience: "3-5 years",
      salary: "৳60,000 - ৳90,000",
      description:
        "Build and maintain our e-commerce platform and internal systems.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of full-stack development experience",
        "Proficiency in React, Node.js, and databases",
        "Experience with e-commerce platforms",
        "Knowledge of cloud services (AWS/GCP)",
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Implement new features and improvements",
        "Optimize application performance",
        "Collaborate with design and product teams",
        "Ensure code quality and security",
      ],
      posted: "2024-01-08",
    },
    {
      id: 5,
      title: "Operations Coordinator",
      department: "operations",
      location: "dhaka",
      type: "Full-time",
      experience: "1-3 years",
      salary: "৳30,000 - ৳45,000",
      description:
        "Coordinate logistics and supply chain operations for efficient delivery.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "1+ years of operations experience",
        "Strong organizational skills",
        "Knowledge of logistics and supply chain",
        "Proficiency in MS Office and data analysis",
      ],
      responsibilities: [
        "Coordinate with suppliers and vendors",
        "Monitor inventory levels",
        "Optimize delivery processes",
        "Prepare operational reports",
        "Ensure quality control standards",
      ],
      posted: "2024-01-05",
    },
    {
      id: 6,
      title: "Brand Manager",
      department: "management",
      location: "dhaka",
      type: "Full-time",
      experience: "4-6 years",
      salary: "৳70,000 - ৳100,000",
      description: "Lead brand strategy and positioning for ClothingCo.",
      requirements: [
        "MBA or Master's degree preferred",
        "4+ years of brand management experience",
        "Experience in fashion or retail industry",
        "Strong strategic thinking abilities",
        "Excellent presentation and communication skills",
      ],
      responsibilities: [
        "Develop brand strategy and positioning",
        "Oversee marketing campaigns",
        "Analyze market trends and competition",
        "Collaborate with cross-functional teams",
        "Drive brand growth and awareness",
      ],
      posted: "2024-01-03",
    },
  ];

  const benefits = [
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Competitive Salary",
      description:
        "Market-competitive compensation with annual reviews and performance bonuses",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Health Insurance",
      description:
        "Comprehensive health coverage for you and your family including dental and vision",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Flexible Hours",
      description:
        "Work-life balance with flexible working hours and remote work options",
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Learning & Development",
      description:
        "Continuous learning opportunities, training programs, and skill development",
    },
    {
      icon: <FiGift className="w-6 h-6" />,
      title: "Employee Discounts",
      description:
        "Generous discounts on all ClothingCo products and exclusive early access",
    },
    {
      icon: <FiCoffee className="w-6 h-6" />,
      title: "Great Work Environment",
      description:
        "Modern office spaces, free snacks, team events, and collaborative culture",
    },
  ];

  const cultureValues = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Customer-Centric",
      description:
        "We put our customers at the heart of everything we do, creating experiences that delight and inspire.",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description:
        "We embrace creativity and innovation, constantly pushing boundaries in fashion and technology.",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Teamwork",
      description:
        "We believe in the power of collaboration and support each other to achieve shared goals.",
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from product quality to customer service.",
    },
  ];

  const filteredJobs = jobListings.filter((job) => {
    const matchesDepartment =
      selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesLocation =
      selectedLocation === "all" || job.location === selectedLocation;
    return matchesDepartment && matchesLocation;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto">
              Be part of Bangladesh's leading fashion brand. We're looking for
              passionate, creative, and driven individuals to help shape the
              future of fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#openings"
                className="bg-white text-yellow-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                View Open Positions
              </a>
              <a
                href="#culture"
                className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
              >
                Learn About Our Culture
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Why Join Us */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Work With Us?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're not just a clothing company - we're a community of
                innovators, creators, and fashion enthusiasts building something
                extraordinary.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Culture */}
          <div id="culture" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Culture & Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our values guide everything we do and shape the kind of
                workplace we want to be.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {cultureValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-yellow-500">{value.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div id="openings" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Current Openings
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Find your next opportunity with us
              </p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <FiZap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No positions match your selected filters. Try adjusting your
                    criteria.
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FiMapPin className="w-4 h-4" />
                            <span className="capitalize">{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FiClock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FiAward className="w-4 h-4" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FiDollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 mr-3">
                          {
                            departments.find((d) => d.id === job.department)
                              ?.name
                          }
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Posted {formatDate(job.posted)}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {job.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Requirements
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-yellow-600 dark:text-yellow-400 text-xs">
                              +{job.requirements.length - 3} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Responsibilities
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {job.responsibilities
                            .slice(0, 3)
                            .map((resp, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          {job.responsibilities.length > 3 && (
                            <li className="text-yellow-600 dark:text-yellow-400 text-xs">
                              +{job.responsibilities.length - 3} more
                              responsibilities
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                        Apply Now
                      </button>
                      <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
                        View Details
                        <FiChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Hiring Process
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Apply Online
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Submit your application and resume through our website
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Initial Review
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our HR team reviews your application and qualifications
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Interview Process
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Phone/video screening followed by in-person interviews
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mx-auto mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome Aboard
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Join our team and start your journey with us
                </p>
              </div>
            </div>
          </div>

          {/* Contact HR */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Have Questions About Working With Us?
              </h2>
              <p className="mb-6 opacity-90">
                Our HR team is here to answer any questions about careers,
                benefits, or our company culture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="mailto:careers@clothingco.com"
                  className="bg-white text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  Email HR Team
                </a>
                <a
                  href="tel:+8801234567892"
                  className="bg-yellow-400 text-yellow-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center"
                >
                  <FiPhone className="w-4 h-4 mr-2" />
                  Call HR: +880-1234-567892
                </a>
              </div>
              <div className="text-sm opacity-90">
                <p>HR Office Hours: Saturday - Thursday, 9:00 AM - 6:00 PM</p>
                <p>Location: ClothingCo Head Office, Gulshan, Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
