"use client";

import CustomerLayout from "@/components/CustomerLayout";
import {
  FiAward,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiDroplet,
  FiHeart,
  FiHome,
  FiLeaf,
  FiRecycle,
  FiShield,
  FiSun,
  FiTrendingUp,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export default function OurResponsibilityPage() {
  const responsibilityAreas = [
    {
      icon: <FiLeaf className="w-8 h-8" />,
      title: "Environmental Sustainability",
      description:
        "Protecting our planet through eco-friendly practices and sustainable fashion",
      color: "bg-green-500",
      initiatives: [
        "100% organic cotton sourcing by 2025",
        "Carbon-neutral shipping operations",
        "Zero-waste manufacturing processes",
        "Renewable energy in all facilities",
      ],
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Fair Labor Practices",
      description:
        "Ensuring fair wages and safe working conditions throughout our supply chain",
      color: "bg-blue-500",
      initiatives: [
        "Fair trade certified suppliers",
        "Regular factory audits and inspections",
        "Living wage guarantee for all workers",
        "Worker education and training programs",
      ],
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Community Impact",
      description: "Supporting local communities and giving back to society",
      color: "bg-red-500",
      initiatives: [
        "Local artisan partnership programs",
        "Education scholarships for underprivileged children",
        "Healthcare support for workers and families",
        "Community development projects",
      ],
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Ethical Business",
      description:
        "Maintaining the highest standards of business ethics and transparency",
      color: "bg-purple-500",
      initiatives: [
        "Transparent supply chain reporting",
        "Anti-corruption policies",
        "Ethical sourcing standards",
        "Regular third-party audits",
      ],
    },
  ];

  const sustainabilityStats = [
    {
      icon: <FiRecycle className="w-6 h-6" />,
      number: "85%",
      label: "Recycled Materials Used",
      description: "In packaging and manufacturing",
    },
    {
      icon: <FiDroplet className="w-6 h-6" />,
      number: "40%",
      label: "Water Usage Reduction",
      description: "Since 2020 baseline",
    },
    {
      icon: <FiSun className="w-6 h-6" />,
      number: "100%",
      label: "Renewable Energy",
      description: "In our Bangladesh facilities",
    },
    {
      icon: <FiTruck className="w-6 h-6" />,
      number: "60%",
      label: "Carbon Footprint Reduction",
      description: "In logistics and shipping",
    },
  ];

  const certifications = [
    {
      name: "Global Organic Textile Standard (GOTS)",
      description: "Certified organic fiber production and processing",
      year: "2022",
    },
    {
      name: "Fair Trade Certified",
      description: "Ethical trading and fair wages certification",
      year: "2021",
    },
    {
      name: "OEKO-TEX Standard 100",
      description: "Textile safety and harmful substance testing",
      year: "2020",
    },
    {
      name: "Carbon Trust Standard",
      description: "Carbon footprint measurement and reduction",
      year: "2023",
    },
  ];

  const sustainabilityGoals = [
    {
      target: "2025",
      title: "Carbon Neutral Operations",
      description: "Achieve net-zero carbon emissions across all operations",
      progress: 75,
      status: "on-track",
    },
    {
      target: "2024",
      title: "Sustainable Materials",
      description: "100% sustainable materials in all products",
      progress: 60,
      status: "on-track",
    },
    {
      target: "2026",
      title: "Circular Economy",
      description: "Implement full circular fashion model",
      progress: 40,
      status: "planned",
    },
    {
      target: "2025",
      title: "Zero Waste to Landfill",
      description: "Eliminate all waste sent to landfills",
      progress: 85,
      status: "ahead",
    },
  ];

  const communityPrograms = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Education Support Program",
      description:
        "Providing scholarships and educational resources to underprivileged children in Bangladesh",
      impact: "500+ students supported annually",
      established: "2020",
    },
    {
      icon: <FiHome className="w-6 h-6" />,
      title: "Artisan Empowerment Initiative",
      description:
        "Supporting local craftspeople and traditional textile artisans",
      impact: "200+ artisan families benefited",
      established: "2019",
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "Healthcare Access Program",
      description:
        "Providing healthcare services to workers and their families",
      impact: "1,000+ people covered",
      established: "2021",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Women's Empowerment Project",
      description: "Skills training and entrepreneurship support for women",
      impact: "300+ women trained",
      established: "2022",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead":
        return "text-green-600 bg-green-50 border-green-200";
      case "on-track":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "planned":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ahead":
        return "Ahead of Schedule";
      case "on-track":
        return "On Track";
      case "planned":
        return "In Planning";
      default:
        return "Unknown";
    }
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-700 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Our Responsibility
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              We believe fashion should be beautiful, sustainable, and ethical.
              Our commitment goes beyond creating great clothing - we're
              dedicated to making a positive impact on people and the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sustainability"
                className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                View Our Impact
              </a>
              <a
                href="#goals"
                className="bg-green-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-400 transition-colors duration-200"
              >
                Our Goals
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Responsibility Areas */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Commitment Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We take responsibility across four key areas to ensure our
                business has a positive impact on society and the environment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {responsibilityAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
                >
                  <div className={`${area.color} p-6 text-white`}>
                    <div className="flex items-center space-x-4 mb-4">
                      {area.icon}
                      <h3 className="text-xl font-bold">{area.title}</h3>
                    </div>
                    <p className="opacity-90">{area.description}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Key Initiatives:
                    </h4>
                    <ul className="space-y-2">
                      {area.initiatives.map((initiative, initIndex) => (
                        <li
                          key={initIndex}
                          className="flex items-center space-x-3 text-gray-600 dark:text-gray-400"
                        >
                          <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainability Stats */}
          <div
            id="sustainability"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Sustainability Impact
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Measurable progress toward a more sustainable future
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sustainabilityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainability Goals */}
          <div id="goals" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our 2030 Sustainability Goals
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ambitious targets with clear timelines and measurable outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sustainabilityGoals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {goal.target}
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        goal.status
                      )}`}
                    >
                      {getStatusLabel(goal.status)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {goal.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {goal.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Programs */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Community Programs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Investing in communities and empowering people across Bangladesh
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {communityPrograms.map((program, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {program.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Since {program.established}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {program.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <FiTrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {program.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Certifications & Recognition
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Third-party validation of our commitment to responsible
                practices
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:border-green-300 dark:hover:border-green-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <FiAward className="w-6 h-6 text-green-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {cert.name}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {cert.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Certified since {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Join Us in Making a Difference
              </h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Every purchase you make supports our mission to create positive
                change. Together, we can build a more sustainable and ethical
                fashion industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop"
                  className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Shop Responsibly
                </a>
                <a
                  href="/shop/about"
                  className="bg-green-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition-colors duration-200"
                >
                  Learn More About Us
                </a>
              </div>
              <div className="mt-6 text-sm opacity-90">
                <p>
                  Follow our progress and stay updated on our sustainability
                  initiatives
                </p>
                <p>Email: sustainability@clothingco.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
