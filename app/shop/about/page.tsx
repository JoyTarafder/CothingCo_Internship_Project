"use client";

import CustomerLayout from "@/components/CustomerLayout";
import Image from "next/image";
import { FiAward, FiShield, FiTruck, FiUsers } from "react-icons/fi";

const stats = [
  {
    id: 1,
    name: "Happy Customers",
    value: "50,000+",
    icon: FiUsers,
  },
  {
    id: 2,
    name: "Orders Delivered",
    value: "100,000+",
    icon: FiTruck,
  },
  {
    id: 3,
    name: "Years of Experience",
    value: "10+",
    icon: FiAward,
  },
  {
    id: 4,
    name: "Quality Guarantee",
    value: "100%",
    icon: FiShield,
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Fashion industry veteran with 15+ years of experience in retail and e-commerce.",
    image: "/images/products/men_1.jpg",
  },
  {
    name: "Michael Chen",
    role: "Head of Design",
    bio: "Award-winning designer specializing in sustainable fashion and innovative textiles.",
    image: "/images/products/men_2.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    bio: "Logistics expert ensuring smooth operations and timely delivery worldwide.",
    image: "/images/products/men_4.jpg",
  },
  {
    name: "David Kim",
    role: "Sustainability Officer",
    bio: "Environmental advocate leading our commitment to sustainable and ethical fashion.",
    image: "/images/products/men_3.jpg",
  },
];

const values = [
  {
    title: "Quality First",
    description:
      "We source only the finest materials and work with skilled artisans to create clothing that lasts.",
    icon: "🏆",
  },
  {
    title: "Sustainable Fashion",
    description:
      "Our commitment to environmental responsibility drives every decision we make.",
    icon: "🌱",
  },
  {
    title: "Customer Satisfaction",
    description:
      "Your happiness is our priority. We go above and beyond to exceed expectations.",
    icon: "😊",
  },
  {
    title: "Innovation",
    description:
      "We constantly evolve our designs and processes to stay ahead of fashion trends.",
    icon: "💡",
  },
];

export default function AboutPage() {
  return (
    <CustomerLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/collections/formal-collection.jpg')] bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-yellow-400 mx-auto"></div>
              <p className="text-yellow-400 uppercase tracking-widest text-sm font-light mt-2">
                Our Story
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-yellow-400">ClothingCo</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're passionate about creating beautiful, sustainable clothing
              that makes you look and feel your best. Our journey began with a
              simple mission: to revolutionize fashion through quality,
              sustainability, and style.
            </p>
            <div className="mt-10">
              <button className="px-8 py-3 bg-yellow-400 text-black font-medium rounded-none hover:bg-yellow-300 transition duration-300 uppercase tracking-wider text-sm">
                Our Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center transform hover:scale-105 transition duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-black dark:bg-black text-yellow-400 rounded-full mb-6 shadow-lg">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-sm">
                  {stat.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-700 rounded-none relative z-10 shadow-xl">
                <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/collections/casual-collection.jpg"
                    alt="Our Story"
                    fill
                    className="object-cover object-center opacity-90"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 border-2 border-yellow-400 z-0"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block mb-6">
                <div className="h-1 w-16 bg-yellow-400"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg">
                  Founded in 2014, ClothingCo started as a small boutique with a
                  big vision: to create fashion that doesn't compromise on
                  style, quality, or sustainability. What began in a small
                  studio has grown into a global brand trusted by customers
                  worldwide.
                </p>
                <p>
                  Our founders, driven by a passion for ethical fashion, set out
                  to prove that beautiful clothing could be made responsibly.
                  Today, we continue that mission by partnering with sustainable
                  suppliers, using eco-friendly materials, and maintaining fair
                  labor practices throughout our supply chain.
                </p>
                <p>
                  Every piece in our collection is carefully designed and
                  crafted to stand the test of time, both in style and
                  durability. We believe that great fashion should make you feel
                  confident while contributing positively to the world.
                </p>
                <div className="pt-4">
                  <button className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 uppercase tracking-wider text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-16 bg-yellow-400 mx-auto"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core values guide everything we do, from design to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 hover:shadow-xl transition duration-300 border-b-4 border-yellow-400 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition duration-300 transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-16 bg-yellow-400 mx-auto"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate people behind ClothingCo who make everything
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden mb-6 aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-yellow-500 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-16 bg-yellow-400 mx-auto"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Collections
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our latest collections, designed with style and
              sustainability in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative aspect-[3/4] group overflow-hidden">
              <Image
                src="/images/collections/casual-collection.jpg"
                alt="Casual Collection"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Casual Collection
                </h3>
                <p className="text-gray-200 mb-4">
                  Everyday comfort with style
                </p>
                <button className="px-6 py-2 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition duration-300 uppercase tracking-wider text-sm">
                  View Collection
                </button>
              </div>
            </div>

            <div className="relative aspect-[3/4] group overflow-hidden">
              <Image
                src="/images/collections/formal-collection.jpg"
                alt="Formal Collection"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Formal Collection
                </h3>
                <p className="text-gray-200 mb-4">
                  Elegance for special occasions
                </p>
                <button className="px-6 py-2 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition duration-300 uppercase tracking-wider text-sm">
                  View Collection
                </button>
              </div>
            </div>

            <div className="relative aspect-[3/4] group overflow-hidden">
              <Image
                src="/images/collections/kids-school-collection.jpg"
                alt="Kids Collection"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Kids Collection
                </h3>
                <p className="text-gray-200 mb-4">
                  Comfortable and durable styles
                </p>
                <button className="px-6 py-2 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition duration-300 uppercase tracking-wider text-sm">
                  View Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/collections/women-formal-collection.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Subscribe to our newsletter for exclusive offers, style tips, and
              updates on our latest collections.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-white text-black focus:outline-none"
              />
              <button className="px-8 py-3 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition duration-300 uppercase tracking-wider text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
