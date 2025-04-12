"use client";

import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type LineChartProps = {
  title: string;
  type: "line";
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
};

type BarChartProps = {
  title: string;
  type: "bar";
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

type ChartProps = LineChartProps | BarChartProps;

export default function Chart({ title, type, data, options }: ChartProps) {
  const defaultOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#1E293B",
        bodyColor: "#334155",
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
          weight: "bold",
        },
        padding: 12,
        borderColor: "rgba(203, 213, 225, 0.5)",
        borderWidth: 1,
        usePointStyle: true,
        boxWidth: 10,
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
          },
        },
      },
      y: {
        grid: {
          color: "rgba(203, 213, 225, 0.2)",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        borderWidth: 2,
        hoverRadius: 6,
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 h-96 transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Week
          </button>
          <button className="text-xs px-3 py-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
            Month
          </button>
          <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Year
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-40px)]">
        {type === "line" ? (
          <Line
            data={data as ChartData<"line">}
            options={mergedOptions as ChartOptions<"line">}
          />
        ) : (
          <Bar
            data={data as ChartData<"bar">}
            options={mergedOptions as ChartOptions<"bar">}
          />
        )}
      </div>
    </div>
  );
}
