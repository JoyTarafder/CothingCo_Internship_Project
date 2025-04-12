"use client";

import { ReactNode } from "react";

type SparklineProps = {
  data: number[];
  color: string;
  height?: number;
  type?: "line" | "bar" | "area";
};

type StatsOverviewProps = {
  title: string;
  stats: Array<{
    title: string;
    value: string | number;
    change: number;
    sparklineData: number[];
    color: string;
    icon: ReactNode;
  }>;
  timeRange?: string;
};

// A simple sparkline component
const Sparkline = ({
  data,
  color,
  height = 30,
  type = "line",
}: SparklineProps) => {
  // Find min and max to normalize data
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Normalize data points between 0 and height
  const normalizedData = data.map(
    (value) => height - ((value - min) / range) * height
  );

  // Calculate width based on data points
  const width = data.length * 3;

  // Generate path for sparkline
  const generatePath = () => {
    if (type === "bar") {
      return normalizedData
        .map(
          (point, i) =>
            `<rect x="${i * 3}" y="${point}" width="2" height="${
              height - point
            }" fill="${color}" rx="1"></rect>`
        )
        .join("");
    }

    const points = normalizedData
      .map((point, i) => `${i * 3},${point}`)
      .join(" ");

    if (type === "area") {
      return `
        <path d="M0,${normalizedData[0]} ${normalizedData
        .map((point, i) => `L${i * 3},${point}`)
        .join(" ")} L${width},${
        normalizedData[normalizedData.length - 1]
      } L${width},${height} L0,${height} Z" 
          fill="${color}" fill-opacity="0.2" />
        <path d="M0,${normalizedData[0]} ${normalizedData
        .map((point, i) => `L${i * 3},${point}`)
        .join(" ")}" 
          stroke="${color}" stroke-width="1.5" fill="none" />
      `;
    }

    return `<path d="M0,${normalizedData[0]} ${normalizedData
      .map((point, i) => `L${i * 3},${point}`)
      .join(" ")}" 
      stroke="${color}" stroke-width="1.5" fill="none" />`;
  };

  return (
    <div className="h-[30px]">
      <svg width={width} height={height} className="overflow-visible">
        <g dangerouslySetInnerHTML={{ __html: generatePath() }} />
      </svg>
    </div>
  );
};

export default function StatsOverview({
  title,
  stats,
  timeRange = "Last 30 days",
}: StatsOverviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {timeRange}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all duration-300"
          >
            {/* Background decoration */}
            <div
              className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-5 ${stat.color} group-hover:scale-125 transition-transform duration-500`}
            ></div>

            <div className="flex items-center justify-between mb-3">
              <div className="z-10">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-full ${stat.color} bg-opacity-10 text-opacity-90`}
              >
                {stat.icon}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.change >= 0
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  <svg
                    className={`w-3 h-3 mr-1 ${
                      stat.change >= 0 ? "" : "transform rotate-180"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5">
                  vs last period
                </span>
              </div>
              <Sparkline
                data={stat.sparklineData}
                color={stat.color
                  .replace("text-", "var(--tw-")
                  .replace("-500", ")")
                  .replace("text-", "hsl(")}
                type="area"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
