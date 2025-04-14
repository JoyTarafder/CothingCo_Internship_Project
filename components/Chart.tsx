"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { motion } from "framer-motion";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

type ChartProps = {
  title?: string;
  type: "line" | "bar" | "pie" | "doughnut";
  data: any;
  options?: any;
};

export default function Chart({ title, type, data, options = {} }: ChartProps) {
  // Enhanced default options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "rgba(229, 231, 235, 0.5)",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: "bold",
        },
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        callbacks: {
          label: function (context: {
            dataset: { label?: string };
            parsed: { y: number | null };
          }) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              if (
                context.dataset.label === "Total Revenue" ||
                context.dataset.label?.includes("Revenue")
              ) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "BDT",
                  notation: "compact",
                }).format(context.parsed.y);
              } else {
                label += context.parsed.y;
              }
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(229, 231, 235, 0.4)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          callback: function (value: number) {
            // Format large numbers for readability
            if (value >= 1000) {
              return value >= 1000000
                ? (value / 1000000).toFixed(1) + "M"
                : (value / 1000).toFixed(0) + "K";
            }
            return value;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
        borderWidth: 2,
      },
      bar: {
        borderRadius: 6,
      },
    },
  };

  // Merge default options with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...(options.plugins || {}),
    },
  };

  // Custom dark mode detection - better to use a context or hook in a real app
  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Adjust chart options based on dark mode
  if (isDarkMode) {
    mergedOptions.plugins.tooltip = {
      ...mergedOptions.plugins.tooltip,
      backgroundColor: "rgba(31, 41, 55, 0.9)",
      titleColor: "#f9fafb",
      bodyColor: "#e5e7eb",
      borderColor: "rgba(55, 65, 81, 0.5)",
    };

    if (mergedOptions.scales?.x) {
      mergedOptions.scales.x = {
        ...mergedOptions.scales.x,
        ticks: {
          ...mergedOptions.scales.x.ticks,
          color: "#9ca3af",
        },
        grid: {
          ...mergedOptions.scales.x.grid,
          color: "rgba(75, 85, 99, 0.2)",
        },
      };
    }

    if (mergedOptions.scales?.y) {
      mergedOptions.scales.y = {
        ...mergedOptions.scales.y,
        ticks: {
          ...mergedOptions.scales.y.ticks,
          color: "#9ca3af",
        },
        grid: {
          ...mergedOptions.scales.y.grid,
          color: "rgba(75, 85, 99, 0.2)",
        },
      };
    }

    mergedOptions.plugins.legend = {
      ...mergedOptions.plugins.legend,
      labels: {
        ...mergedOptions.plugins.legend.labels,
        color: "#e5e7eb",
      },
    };
  }

  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={mergedOptions} />;
      case "bar":
        return <Bar data={data} options={mergedOptions} />;
      case "pie":
        return <Pie data={data} options={mergedOptions} />;
      case "doughnut":
        return <Doughnut data={data} options={mergedOptions} />;
      default:
        return <Line data={data} options={mergedOptions} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col"
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
      )}
      <div className="flex-1 flex items-center justify-center">
        {renderChart()}
      </div>
    </motion.div>
  );
}
