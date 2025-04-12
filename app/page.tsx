"use client";

import Chart from "@/components/Chart";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatsOverview from "@/components/StatsOverview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useRef, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiDownload,
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

export default function Dashboard() {
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
      value: "$48,258.42",
      change: 12.5,
      sparklineData: [5, 10, 8, 15, 12, 18, 16, 20, 18, 24, 20, 25],
      color: "text-blue-500",
      icon: <FiDollarSign className="h-6 w-6 text-blue-500" />,
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

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const salesChartRef = useRef(null);
  const orderStatusChartRef = useRef(null);

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
        labels: [
          "Premium Headphones",
          "Fitness Smartwatch",
          "Wireless Earbuds",
          "Bluetooth Speaker",
        ],
        datasets: [
          {
            label: "Stock Level",
            data: [12, 8, 5, 3],
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(251, 191, 36, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
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
              18500, 22000, 19500, 24000, 20500, 25000, 23000, 26500, 24000,
              28000, 26500, 30000,
            ],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.4,
          },
          {
            label: "2024",
            data: [
              15000, 18000, 16500, 21000, 18000, 22000, 20000, 23500, 21000,
              25000, 23000, 27000,
            ],
            borderColor: "rgb(148, 163, 184)",
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            tension: 0.4,
            borderDash: [5, 5],
          },
        ],
      });

      setOrdersStatusData({
        labels: ["Delivered", "Processing", "Pending", "Canceled"],
        datasets: [
          {
            data: [68, 25, 15, 8],
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

  // Function to generate and download PDF report
  const generatePdfReport = async () => {
    try {
      setIsGeneratingPdf(true);

      // Create a new PDF document
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add cover page with gradient background
      const addGradientBackground = () => {
        // Create gradient from blue to light blue
        const gradient = doc.setFillColor(59, 130, 246);
        doc.rect(0, 0, pageWidth, pageHeight, "F");

        // Add white overlay at the bottom to create a fade effect
        doc.setFillColor(255, 255, 255, 0.9);
        doc.rect(0, pageHeight / 2, pageWidth, pageHeight / 2, "F");
      };

      // Add cover page
      addGradientBackground();

      // Add logo (circular shape with letter A)
      doc.setFillColor(255, 255, 255);
      doc.circle(pageWidth / 2, 60, 15, "F");
      doc.setTextColor(59, 130, 246);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("A", pageWidth / 2, 65, { align: "center" });

      // Add report title
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text("Dashboard Report", pageWidth / 2, 100, { align: "center" });

      // Add date range
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text("Apr 1 - Apr 30, 2025", pageWidth / 2, 115, { align: "center" });

      // Add generation date
      const today = new Date();
      doc.setFontSize(12);
      doc.text(
        `Generated on: ${today.toLocaleDateString()}`,
        pageWidth / 2,
        125,
        { align: "center" }
      );

      // Add company name at the bottom
      doc.setFontSize(14);
      doc.text("Admin Panel", pageWidth / 2, pageHeight - 30, {
        align: "center",
      });
      doc.setFontSize(10);
      doc.text("© 2025 All Rights Reserved", pageWidth / 2, pageHeight - 20, {
        align: "center",
      });

      // Add new page for content
      doc.addPage();

      // Add header to each page
      const addHeader = (pageNumber) => {
        doc.setFillColor(59, 130, 246);
        doc.rect(0, 0, pageWidth, 15, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(`Admin Dashboard Report - April 2025`, 10, 10);
        doc.setTextColor(255, 255, 255);
        doc.text(`Page ${pageNumber}`, pageWidth - 10, 10, { align: "right" });
      };

      // Add header to the content page
      addHeader(2);

      // Add table of contents
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Contents", 14, 25);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("1. Performance Overview", 14, 35);
      doc.text("2. Sales Overview", 14, 42);
      doc.text("3. Order Status", 14, 49);
      doc.text("4. Low Stock Items", 14, 56);

      // Add new page for actual content
      doc.addPage();
      addHeader(3);

      // Add performance metrics section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("1. Performance Overview", 14, 25);

      // Add section separator
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(14, 27, 195, 27);

      // Create a table for the performance stats
      const statsTableData = statsData.map((stat) => [
        stat.title,
        stat.value,
        `${stat.change > 0 ? "+" : ""}${stat.change}%`,
        stat.change > 0 ? "↑" : "↓",
      ]);

      autoTable(doc, {
        head: [["Metric", "Value", "Change", ""]],
        body: statsTableData,
        startY: 35,
        theme: "grid",
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 40, halign: "center" },
          2: { cellWidth: 30, halign: "center" },
          3: { cellWidth: 10, halign: "center" },
        },
        bodyStyles: {
          lineColor: [220, 220, 220],
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });

      // Add sales section
      doc.addPage();
      addHeader(4);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("2. Sales Overview", 14, 25);

      // Add section separator
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(14, 27, 195, 27);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Sales have increased by 15% compared to the previous year.",
        14,
        35
      );

      // Capture sales chart if available
      if (salesChartRef.current) {
        const salesChartCanvas = await html2canvas(salesChartRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
        });

        const salesChartImgData = salesChartCanvas.toDataURL("image/png");
        const salesChartImgWidth = 180;
        const salesChartImgHeight =
          (salesChartCanvas.height * salesChartImgWidth) /
          salesChartCanvas.width;

        doc.addImage(
          salesChartImgData,
          "PNG",
          15,
          40,
          salesChartImgWidth,
          salesChartImgHeight
        );

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(
          "Figure 1: Sales trends comparing 2024 and 2025",
          105,
          40 + salesChartImgHeight + 5,
          { align: "center" }
        );
      }

      // Add monthly sales data as a table
      const monthsData = salesChartData.labels;
      const currentYearData = salesChartData.datasets[0].data;
      const previousYearData = salesChartData.datasets[1].data;

      const salesTableData = monthsData.map((month, index) => [
        month,
        `$${currentYearData[index].toLocaleString()}`,
        `$${previousYearData[index].toLocaleString()}`,
        `${(
          ((currentYearData[index] - previousYearData[index]) /
            previousYearData[index]) *
          100
        ).toFixed(1)}%`,
      ]);

      const salesTableY = salesChartRef.current
        ? 40 +
          (salesChartRef.current.offsetHeight * 180) /
            salesChartRef.current.offsetWidth +
          15
        : 40;

      autoTable(doc, {
        head: [["Month", "2025 Sales", "2024 Sales", "YoY Growth"]],
        body: salesTableData,
        startY: salesTableY,
        theme: "grid",
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 40, halign: "right" },
          2: { cellWidth: 40, halign: "right" },
          3: { cellWidth: 30, halign: "center" },
        },
        bodyStyles: {
          lineColor: [220, 220, 220],
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });

      // Add order status section
      doc.addPage();
      addHeader(5);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("3. Order Status", 14, 25);

      // Add section separator
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(14, 27, 195, 27);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Current distribution of orders by status:", 14, 35);

      // Create a layout with chart and table side by side
      // Capture order status chart if available
      if (orderStatusChartRef.current) {
        const orderChartCanvas = await html2canvas(
          orderStatusChartRef.current,
          {
            scale: 2,
            backgroundColor: null,
            logging: false,
          }
        );

        const orderChartImgData = orderChartCanvas.toDataURL("image/png");
        const orderChartImgWidth = 90;
        const orderChartImgHeight =
          (orderChartCanvas.height * orderChartImgWidth) /
          orderChartCanvas.width;

        doc.addImage(
          orderChartImgData,
          "PNG",
          15,
          45,
          orderChartImgWidth,
          orderChartImgHeight
        );

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(
          "Figure 2: Order status distribution",
          60,
          45 + orderChartImgHeight + 5,
          { align: "center" }
        );
      }

      // Create order status table
      const orderStatusTableData = ordersStatusData.labels.map(
        (status, index) => [
          status,
          ordersStatusData.datasets[0].data[index],
          `${(
            (ordersStatusData.datasets[0].data[index] /
              ordersStatusData.datasets[0].data.reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(1)}%`,
        ]
      );

      autoTable(doc, {
        head: [["Status", "Count", "Percentage"]],
        body: orderStatusTableData,
        startY: 45,
        margin: { left: 115 },
        theme: "grid",
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 20, halign: "center" },
          2: { cellWidth: 30, halign: "center" },
        },
        bodyStyles: {
          lineColor: [220, 220, 220],
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });

      // Add analysis text
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Order Analysis:", 14, 120);

      const analysisText =
        "The majority of orders (68%) are successfully delivered to customers, while 25% are still in the processing stage. " +
        "Only 8% of orders have been canceled, which is within our target range. " +
        "The current pending order rate of 15% is slightly higher than our target of 10%, suggesting a need for process optimization.";

      const splitAnalysis = doc.splitTextToSize(analysisText, 180);
      doc.text(splitAnalysis, 14, 130);

      // Add low stock items section
      doc.addPage();
      addHeader(6);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("4. Low Stock Items", 14, 25);

      // Add section separator
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(14, 27, 195, 27);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("The following products need to be restocked soon:", 14, 35);

      // Create low stock items table
      const lowStockTableData = lowStockData.labels.map((product, index) => [
        product,
        lowStockData.datasets[0].data[index],
        lowStockData.datasets[0].data[index] <= 5 ? "Critical" : "Low",
      ]);

      autoTable(doc, {
        head: [["Product", "Items Left", "Status"]],
        body: lowStockTableData,
        startY: 45,
        theme: "grid",
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 40, halign: "center" },
          2: { cellWidth: 40, halign: "center" },
        },
        bodyStyles: {
          lineColor: [220, 220, 220],
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        didDrawCell: (data) => {
          // Color the status cell based on stock level
          if (data.column.index === 2 && data.section === "body") {
            const status = data.cell.raw;
            if (status === "Critical") {
              doc.setFillColor(239, 68, 68, 0.2);
              doc.rect(
                data.cell.x,
                data.cell.y,
                data.cell.width,
                data.cell.height,
                "F"
              );
              doc.setTextColor(239, 68, 68);
              doc.text(
                status,
                data.cell.x + data.cell.width / 2,
                data.cell.y + data.cell.height / 2 + 1,
                { align: "center", baseline: "middle" }
              );
              return false; // Prevent default text rendering
            }
          }
          return true;
        },
      });

      // Add recommendations
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Recommendations:", 14, 100);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const recommendations = [
        "1. Place immediate orders for Wireless Earbuds and Bluetooth Speaker (critical stock levels).",
        "2. Schedule reorders for Premium Headphones and Fitness Smartwatch within 7 days.",
        "3. Review sales forecasts to optimize inventory levels and prevent stockouts.",
      ];

      let yPos = 110;
      recommendations.forEach((rec) => {
        doc.text(rec, 14, yPos);
        yPos += 8;
      });

      // Add footer with generation details to every page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        if (i > 1) {
          // Skip cover page
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.text(
            `Generated by Admin Panel | ${today.toLocaleDateString()} ${today.toLocaleTimeString()}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
          );
        }
      }

      // Save the PDF
      doc.save("admin-dashboard-report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF report. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      className="flex h-screen bg-gray-50 dark:bg-gray-900"
      suppressHydrationWarning
    >
      <Sidebar />
      <div className="flex-1 ml-64" suppressHydrationWarning>
        <Header title="Dashboard" />
        <main className="p-6 overflow-y-auto">
          <div className="mb-8" suppressHydrationWarning>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  Welcome back, Admin!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Here's what's happening with your store today.
                </p>
              </div>
              <div className="flex mt-4 md:mt-0 gap-2">
                <button className="inline-flex items-center text-sm font-medium px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <FiCalendar className="mr-2 h-4 w-4" />
                  Apr 1 - Apr 30, 2025
                </button>
                <button
                  className="inline-flex items-center text-sm font-medium px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={generatePdfReport}
                  disabled={isGeneratingPdf}
                >
                  {isGeneratingPdf ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiDownload className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>

            <StatsOverview title="Performance Overview" stats={statsData} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Sales Overview
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Comparison between current and previous year
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Weekly
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
                      Monthly
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Yearly
                    </button>
                  </div>
                </div>
                <div className="h-[calc(100%-56px)]" ref={salesChartRef}>
                  <Chart
                    title="Sales Trends"
                    type="line"
                    data={salesChartData}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Order Status
                  </h2>
                  <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="h-[calc(100%-56px)] flex flex-col">
                  <div
                    className="flex-1 flex items-center justify-center"
                    ref={orderStatusChartRef}
                  >
                    <Chart
                      title="Order Status"
                      type="bar"
                      data={ordersStatusData}
                      options={{ indexAxis: "y" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FiCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Delivered
                        </span>
                      </div>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        68
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FiClock className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Processing
                        </span>
                      </div>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        25
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Recent Orders
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Last 5 orders placed
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        #ORD-0103
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        John Doe
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Apr 12, 2025
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        $125.00
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        #ORD-0102
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Jane Smith
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Apr 11, 2025
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        $85.50
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        #ORD-0101
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Mike Johnson
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        Apr 10, 2025
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        $220.75
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Low Stock Items
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Products that need reordering
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Premium Headphones",
                  "Fitness Smartwatch",
                  "Wireless Earbuds",
                  "Bluetooth Speaker",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                        <FiPackage className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {item}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {["12", "8", "5", "3"][index]} items left
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="mt-8 py-4 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
            <p className="mb-1">Developed by Joy Tarafder</p>
            <p className="text-xs">© 2025 Admin Panel. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
