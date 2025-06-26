"use client";

import CustomerLayout from "@/components/CustomerLayout";
import Image from "next/image";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (would connect to API in real implementation)
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <CustomerLayout>
      {/* Header Banner */}
      <div className="relative bg-black text-white h-[500px]">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/collections/formal-collection.jpg"
            alt="Contact Us"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-yellow-400"></div>
              <p className="text-yellow-400 uppercase tracking-widest text-sm font-light mt-2">
                Get in Touch
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
              Have questions or feedback? We're here to help. Reach out to our
              team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center transform hover:scale-105 transition duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black dark:bg-black text-yellow-400 rounded-full mb-6 shadow-lg">
                <FiMapPin className="w-10 h-10" />
              </div>
              <h3 className="text-xl uppercase tracking-wider font-medium mb-4">
                Visit Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                123 Fashion Street
                <br />
                Gulshan, Dhaka 1000,
                <br />
                Bangladesh
              </p>
            </div>

            <div className="text-center transform hover:scale-105 transition duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black dark:bg-black text-yellow-400 rounded-full mb-6 shadow-lg">
                <FiPhone className="w-10 h-10" />
              </div>
              <h3 className="text-xl uppercase tracking-wider font-medium mb-4">
                Call Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customer Service:
                <br />
                +1 (555) 123-4567
                <br />
                Mon-Fri: 9am - 6pm EST
              </p>
            </div>

            <div className="text-center transform hover:scale-105 transition duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black dark:bg-black text-yellow-400 rounded-full mb-6 shadow-lg">
                <FiMail className="w-10 h-10" />
              </div>
              <h3 className="text-xl uppercase tracking-wider font-medium mb-4">
                Email Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                General Inquiries:
                <br />
                info@clothingco.com
                <br />
                Customer Support:
                <br />
                support@clothingco.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Image */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="mb-10">
                <div className="inline-block mb-4">
                  <div className="h-1 w-16 bg-yellow-400"></div>
                </div>
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We'd love to hear from you. Fill out the form below and we'll
                  get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm uppercase tracking-wider mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm uppercase tracking-wider mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm uppercase tracking-wider mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:border-yellow-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="product">Product Information</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm uppercase tracking-wider mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:border-yellow-400"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-yellow-400 text-black px-8 py-3 font-medium hover:bg-yellow-300 transition duration-300 uppercase tracking-wider text-sm"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-none relative z-10 shadow-xl h-full">
                <Image
                  src="/images/collections/women-casual-collection.jpg"
                  alt="Contact Us"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 border-2 border-yellow-400 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] bg-gray-200 dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-[url('/images/collections/casual-collection.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-black p-8 shadow-xl max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 text-black mb-6 rounded-full">
              <FiMapPin className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Visit Our Store</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              123 Fashion Street, New York, NY 10001
              <br />
              United States
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 uppercase tracking-wider text-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Store Hours */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-16 bg-yellow-400 mx-auto"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Store Hours</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Visit us in-store to experience our collections firsthand and
              receive personalized styling advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                New York Flagship Store
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Monday - Friday
                  </span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Saturday
                  </span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sunday
                  </span>
                  <span>11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                Los Angeles Store
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Monday - Friday
                  </span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Saturday
                  </span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sunday
                  </span>
                  <span>12:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                Chicago Store
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Monday - Friday
                  </span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Saturday
                  </span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sunday
                  </span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-16 bg-yellow-400 mx-auto"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find quick answers to common questions about contacting us.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3">
                How quickly will I receive a response to my inquiry?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We strive to respond to all inquiries within 24-48 hours during
                business days. For urgent matters, we recommend calling our
                customer service line.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3">
                How can I track my order status?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can track your order by logging into your account and
                visiting the "Order History" section. Alternatively, you can
                contact our customer service with your order number.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3">
                What is your return policy?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day return policy for unworn items in original
                condition with tags attached. Please visit our Returns page for
                more detailed information.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we ship to most countries worldwide. Shipping rates and
                delivery times vary by location. You can see the specific
                details during checkout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
