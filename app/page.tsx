"use client";

import Chart from "@/components/Chart";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStatsGrid from "@/components/DashboardStatsGrid";
import StatsOverview from "@/components/StatsOverview";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

// Custom Taka Icon component
const TakaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 6h-7.5c-1.93 0-3.5 1.57-3.5 3.5 0 1.93 1.57 3.5 3.5 3.5h3.5" />
    <path d="M7 14v4" />
    <path d="M11 10l-4 4" />
  </svg>
);

export default function Dashboard() {
  // Time filter for sales overview
  const [timeFilter, setTimeFilter] = useState("monthly"); // 'weekly', 'monthly', or 'yearly'
  const router = useRouter();

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Format selection modal
  const [showFormatModal, setShowFormatModal] = useState(false);

  // Report data
  const reportData = [
    ["Report Date", new Date().toLocaleDateString()],
    [""],
    ["Revenue Metrics"],
    ["Total Revenue", "৳48,258.42"],
    ["Orders", "862"],
    ["New Customers", "124"],
    ["Conversion Rate", "3.6%"],
    [""],
    ["Order Status"],
    ["Delivered", "65%"],
    ["Processing", "20%"],
    ["Pending", "10%"],
    ["Canceled", "5%"],
    [""],
    ["Low Stock Items"],
    ["Men T- Shirts", "5 items"],
    ["Men Jogger", "8 items"],
    ["Women Tank Tops", "14 items"],
    ["Kids", "23 items"],
  ];

  // Download CSV function
  const downloadCSV = () => {
    // Convert to CSV format
    const csvContent = reportData.map((row) => row.join(",")).join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `dashboard-report-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success notification
    setNotification({
      show: true,
      message: "CSV Report downloaded successfully!",
      type: "success",
    });

    // Close modal
    setShowFormatModal(false);
  };

  // Download PDF function
  const downloadPDF = () => {
    import("jspdf").then(({ default: jsPDF }) => {
      import("jspdf-autotable").then(({ default: autoTable }) => {
        // Create PDF document
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Define colors
        const primaryColor = "#3b82f6"; // blue-500
        const secondaryColor = "#6366f1"; // indigo-500
        const textColor = "#1f2937"; // gray-800
        const borderColor = "#e5e7eb"; // gray-200

        // Add page border
        doc.setDrawColor(borderColor);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);

        // Add gradient header
        doc.setFillColor(primaryColor);
        doc.rect(10, 10, 190, 40, "F");
        doc.setFillColor(secondaryColor);
        doc.rect(10, 10, 190, 2, "F");

        // Add title and logo
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text("Dashboard Report", 20, 30);

        // Add date and time
        doc.setFontSize(10);
        doc.setTextColor(230, 230, 230);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 38);

        // Add company logo/name
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "italic");
        doc.text("Admin Panel", 170, 30);

        // Draw small circles for design
        doc.setFillColor(secondaryColor);
        doc.circle(180, 30, 2, "F");
        doc.setFillColor("#a5b4fc"); // indigo-300
        doc.circle(185, 30, 1.5, "F");
        doc.circle(175, 30, 1, "F");

        // Reset text color for content
        doc.setTextColor(textColor);

        // Start content from after the header
        let yPos = 60;

        // Add summary section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Executive Summary", 20, yPos);
        yPos += 8;

        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 60, yPos);
        yPos += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const summaryText =
          "This report provides an overview of the current business performance metrics, including revenue, orders, customers, and inventory status. The data presented covers the most recent operational period.";

        // Multi-line text
        const splitSummary = doc.splitTextToSize(summaryText, 170);
        doc.text(splitSummary, 20, yPos);
        yPos += splitSummary.length * 5 + 10;

        // Add Revenue metrics section with styled table
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Revenue Metrics", 20, yPos);
        yPos += 8;

        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 55, yPos);
        yPos += 8;

        autoTable(doc, {
          startY: yPos,
          head: [["Metric", "Value", "Change"]],
          body: [
            ["Total Revenue", "৳48,258.42", "+12.5%"],
            ["Orders", "862", "+8.2%"],
            ["New Customers", "124", "+5.8%"],
            ["Conversion Rate", "3.6%", "-2.4%"],
          ],
          theme: "grid",
          headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
          columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 60, halign: "center" },
            2: { cellWidth: 60, halign: "center" },
          },
          alternateRowStyles: {
            fillColor: [249, 250, 251], // gray-50
          },
          tableLineColor: borderColor,
          tableLineWidth: 0.2,
          margin: { left: 20, right: 20 },
        });

        yPos = doc.lastAutoTable.finalY + 15;

        // Add Order Status section with styled table
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Order Status", 20, yPos);
        yPos += 8;

        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 45, yPos);
        yPos += 8;

        autoTable(doc, {
          startY: yPos,
          head: [["Status", "Count", "Percentage"]],
          body: [
            ["Delivered", "560", "65%"],
            ["Processing", "172", "20%"],
            ["Pending", "86", "10%"],
            ["Canceled", "44", "5%"],
          ],
          theme: "grid",
          headStyles: {
            fillColor: secondaryColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
          columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 60, halign: "center" },
            2: { cellWidth: 60, halign: "center" },
          },
          alternateRowStyles: {
            fillColor: [249, 250, 251], // gray-50
          },
          tableLineColor: borderColor,
          tableLineWidth: 0.2,
          margin: { left: 20, right: 20 },
        });

        yPos = doc.lastAutoTable.finalY + 15;

        // Add Low Stock Items section with styled table
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Low Stock Items", 20, yPos);
        yPos += 8;

        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 53, yPos);
        yPos += 8;

        autoTable(doc, {
          startY: yPos,
          head: [["Product", "Stock Level", "Status"]],
          body: [
            ["Tablets", "5 items", "Critical"],
            ["Smartphones", "8 items", "Low"],
            ["Laptops", "14 items", "Moderate"],
            ["Accessories", "23 items", "Adequate"],
          ],
          theme: "grid",
          headStyles: {
            fillColor: "#ef4444", // red-500
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
          columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 60, halign: "center" },
            2: { cellWidth: 60, halign: "center" },
          },
          bodyStyles: {
            fontSize: 10,
          },
          alternateRowStyles: {
            fillColor: [249, 250, 251], // gray-50
          },
          tableLineColor: borderColor,
          tableLineWidth: 0.2,
          margin: { left: 20, right: 20 },
          // Custom styling for status column
          didDrawCell: (data) => {
            if (data.section === "body" && data.column.index === 2) {
              const status = data.cell.raw;
              let color;

              if (status === "Critical") color = "#ef4444"; // red-500
              else if (status === "Low") color = "#f59e0b"; // amber-500
              else if (status === "Moderate") color = "#3b82f6"; // blue-500
              else color = "#10b981"; // emerald-500

              doc.setTextColor(color);
              doc.setFont("helvetica", "bold");
              doc.text(
                status,
                data.cell.x + data.cell.width / 2,
                data.cell.y + data.cell.height / 2,
                { align: "center", baseline: "middle" }
              );

              // Reset text color
              doc.setTextColor(textColor);
              doc.setFont("helvetica", "normal");

              return true; // Prevent auto-styling
            }
            return false; // Continue with auto-styling
          },
        });

        // Add footer
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);

          // Footer line
          doc.setDrawColor(borderColor);
          doc.setLineWidth(0.5);
          doc.line(10, 277, 200, 277);

          // Footer text
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Generated by Admin Panel Dashboard • Page ${i} of ${totalPages}`,
            105,
            285,
            { align: "center" }
          );

          // Current date in footer
          doc.text(new Date().toLocaleDateString(), 190, 285, {
            align: "right",
          });
        }

        // Save PDF
        doc.save(
          `dashboard-report-${new Date().toISOString().split("T")[0]}.pdf`
        );

        // Show success notification
        setNotification({
          show: true,
          message: "Enhanced report downloaded successfully!",
          type: "success",
        });

        // Close modal
        setShowFormatModal(false);
      });
    });
  };

  // Generate report function - shows format selection modal
  const generateReport = () => {
    // Show format selection modal
    setShowFormatModal(true);
  };

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Sample data for the dashboard
  const [orderChartData, setOrderChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  });

  const [lowStockData, setLowStockData] = useState({
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Stock Level",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(251, 191, 36, 0.5)",
          "rgba(239, 68, 68, 0.5)",
        ],
        borderWidth: 0,
      },
    ],
  });

  const [salesChartData, setSalesChartData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "2025",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "2024",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(148, 163, 184)",
        backgroundColor: "rgba(148, 163, 184, 0.2)",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  });

  const [ordersStatusData, setOrdersStatusData] = useState({
    labels: ["Delivered", "Processing", "Pending", "Canceled"],
    datasets: [
      {
        label: "Order Status",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(251, 191, 36, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  });

  // Stats data for the StatsOverview component
  const statsData = [
    {
      title: "Total Revenue",
      value: "৳48,258.42",
      change: 12.5,
      sparklineData: [5, 10, 8, 15, 12, 18, 16, 20, 18, 24, 20, 25],
      color: "text-blue-500",
      icon: <TakaIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Total Orders",
      value: "862",
      change: 8.2,
      sparklineData: [10, 12, 15, 14, 18, 16, 19, 18, 22, 20, 24, 22],
      color: "text-green-500",
      icon: <FiShoppingBag className="h-6 w-6 text-green-500" />,
    },
    {
      title: "New Customers",
      value: "124",
      change: 5.8,
      sparklineData: [5, 8, 6, 10, 8, 12, 10, 14, 12, 16, 14, 18],
      color: "text-purple-500",
      icon: <FiUsers className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: -2.4,
      sparklineData: [8, 7, 10, 9, 11, 9, 12, 10, 9, 8, 10, 9],
      color: "text-amber-500",
      icon: <FiActivity className="h-6 w-6 text-amber-500" />,
    },
  ];

  // Simulate data loading
  useEffect(() => {
    // Simulate API call to get data
    setTimeout(() => {
      setOrderChartData({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Orders",
            data: [42, 59, 80, 81, 56, 85],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
          },
        ],
      });

      setLowStockData({
        labels: ["Smartphones", "Laptops", "Accessories", "Tablets"],
        datasets: [
          {
            label: "Stock Level",
            data: [14, 8, 23, 5],
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(251, 191, 36, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
            borderWidth: 0,
          },
        ],
      });

      setSalesChartData({
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "2025",
            data: [
              18500, 22500, 28000, 32000, 38000, 42000, 48000, 52000, 58000,
              62000, 68000, 72000,
            ],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "2024",
            data: [
              10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
              55000, 60000, 65000,
            ],
            borderColor: "rgb(148, 163, 184)",
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            tension: 0.4,
            borderDash: [5, 5],
            fill: true,
          },
        ],
      });

      setOrdersStatusData({
        labels: ["Delivered", "Processing", "Pending", "Canceled"],
        datasets: [
          {
            label: "Order Status",
            data: [65, 20, 10, 5],
            backgroundColor: [
              "rgba(16, 185, 129, 0.7)",
              "rgba(59, 130, 246, 0.7)",
              "rgba(251, 191, 36, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
            borderWidth: 0,
            hoverOffset: 5,
          },
        ],
      });
    }, 1000);
  }, []);

  // View All Activity handler
  const handleViewAllActivity = () => {
    router.push("/profile?tab=activity");
  };

  return (
    <DashboardLayout title="Dashboard">
      {/* Header with improved gradient background */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl transform hover:shadow-3xl transition-all duration-300 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl transform rotate-45 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl transform rotate-45 group-hover:scale-110 transition-transform duration-500"></div>

        <div className="flex flex-col md:flex-row md:justify-between text-white relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Dashboard Overview
            </h1>
            <p className="mt-3 text-blue-100 max-w-2xl text-base">
              Welcome to your business dashboard, showing key metrics for sales,
              inventory, and customers.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => generateReport()}
              className="group relative flex items-center px-6 py-3 bg-white/10 text-white rounded-xl font-medium shadow-lg backdrop-blur-sm border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/20"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -inset-x-3 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></span>
              <span className="absolute -inset-y-3 right-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30"></span>

              <span className="relative flex items-center justify-center">
                <span className="absolute -left-7 -top-7 h-12 w-12 rounded-full bg-white/10 blur-lg"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="relative font-semibold tracking-wide">
                  Generate Report
                </span>

                <motion.span
                  className="absolute right-0 h-full w-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
      {/* Main Dashboard Content */}
      <div className="space-y-8">
        {/* Stats Grid Cards */}
        <DashboardStatsGrid />

        {/* Sales Overview with enhanced charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/40 p-6 backdrop-blur-md overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                </svg>
              </span>
              Sales Overview
            </h2>
            <div className="absolute top-6 right-6 flex space-x-2">
              <button
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  timeFilter === "weekly"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                }`}
                onClick={() => setTimeFilter("weekly")}
              >
                Weekly
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  timeFilter === "monthly"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                }`}
                onClick={() => setTimeFilter("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  timeFilter === "yearly"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                }`}
                onClick={() => setTimeFilter("yearly")}
              >
                Yearly
              </button>
            </div>
            <div className="mt-6 h-80">
              <Chart title="" type="line" data={salesChartData} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/40 p-6 backdrop-blur-md overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </span>
              Order Status
            </h2>
            <div className="mt-6 h-80">
              <Chart
                title=""
                type="doughnut"
                data={ordersStatusData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = context.raw || 0;
                          return `${label}: ${value}%`;
                        },
                      },
                    },
                  },
                  cutout: "70%",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Performance Matrix with improved styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/40 p-6 backdrop-blur-md overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <StatsOverview
            title="Performance Metrics"
            stats={statsData}
            timeRange="Last 30 days"
          />
        </motion.div>

        {/* Recent Activity and Low Stock with improved visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/40 p-6 backdrop-blur-md overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Recent Activity
            </h2>
            <div className="space-y-4 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.6 }}
                  className="flex items-start p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl hover:shadow-md transition-all duration-300 border border-white/50 dark:border-gray-700/50"
                >
                  <div
                    className={`p-3 rounded-xl mr-4 ${
                      i % 4 === 0
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : i % 4 === 1
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : i % 4 === 2
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {i % 4 === 0 ? (
                      <FiShoppingBag className="h-5 w-5" />
                    ) : i % 4 === 1 ? (
                      <FiCheckCircle className="h-5 w-5" />
                    ) : i % 4 === 2 ? (
                      <FiPackage className="h-5 w-5" />
                    ) : (
                      <FiUsers className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {i % 4 === 0
                        ? "New order #1234"
                        : i % 4 === 1
                        ? "Order #1233 completed"
                        : i % 4 === 2
                        ? "New product added"
                        : "New user registered"}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {i % 4 === 0
                          ? "John Doe purchased iPhone 13 Pro"
                          : i % 4 === 1
                          ? "Order delivered successfully"
                          : i % 4 === 2
                          ? "MacBook Pro 16 added to inventory"
                          : "Alex Johnson created an account"}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-full">
                        <FiClock className="mr-1 h-3 w-3" />
                        {i % 4 === 0
                          ? "5 mins ago"
                          : i % 4 === 1
                          ? "1 hour ago"
                          : i % 4 === 2
                          ? "3 hours ago"
                          : "5 hours ago"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewAllActivity}
              className="mt-6 w-full py-3 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium rounded-xl transition-colors border border-indigo-100 dark:border-indigo-800/30"
            >
              View All Activity
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/40 p-6 backdrop-blur-md overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Low Stock Alert
            </h2>
            <div className="space-y-4 mt-6">
              {["Men T- Shirts", "Men Jogger", "Women Tank Tops", "Kids"].map(
                (product, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.7 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl hover:shadow-md transition-all duration-300 border border-white/50 dark:border-gray-700/50"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-xl mr-3 flex items-center justify-center ${
                          i === 0
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                            : i === 1
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                            : i === 2
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm-1 3a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {product}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {i === 0
                            ? "Critical level"
                            : i === 1
                            ? "Low level"
                            : i === 2
                            ? "Moderate"
                            : "Adequate"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-bold py-1 px-3 rounded-full ${
                          i === 0
                            ? "text-white bg-red-500 dark:bg-red-600"
                            : i === 1
                            ? "text-white bg-amber-500 dark:bg-amber-600"
                            : i === 2
                            ? "text-white bg-blue-500 dark:bg-blue-600"
                            : "text-white bg-green-500 dark:bg-green-600"
                        }`}
                      >
                        {i === 0 ? "5" : i === 1 ? "8" : i === 2 ? "14" : "23"}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium rounded-xl transition-colors shadow-lg"
            >
              Restock Inventory
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-5 right-5 px-4 py-3 rounded-xl shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Format Selection Modal */}
      <AnimatePresence>
        {showFormatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowFormatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-80 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Select Report Format
              </h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 font-medium rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    PDF Format
                  </div>
                  <span className="text-xs bg-red-200 dark:bg-red-800 px-2 py-1 rounded-full">
                    Recommended
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadCSV}
                  className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  CSV Format
                </motion.button>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFormatModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
