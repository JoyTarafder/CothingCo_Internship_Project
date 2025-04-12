"use client";

import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

export default function DashboardCard({
  title,
  value,
  icon,
  iconColor = "bg-blue-500",
  trend,
}: DashboardCardProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="z-10">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </h3>
            {trend && (
              <span
                className={`ml-2 text-sm font-semibold flex items-center ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                <span
                  className={`inline-block mr-1 ${
                    trend.isPositive ? "rotate-0" : "rotate-180"
                  }`}
                >
                  ↑
                </span>
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
        <div className={`${iconColor} rounded-xl p-3 shadow-md z-10`}>
          {icon}
        </div>
      </div>

      {/* Decorative element */}
      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 ${iconColor}`}
      ></div>
      <div
        className={`absolute -right-3 -top-3 w-12 h-12 rounded-full opacity-10 ${iconColor}`}
      ></div>
    </div>
  );
}
