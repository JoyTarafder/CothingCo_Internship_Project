"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "login"
  | "logout";

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    title: string,
    message: string,
    userName?: string
  ) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message: string,
      userName?: string
    ) => {
      const isAuthNotification = type === "login" || type === "logout";

      // Create the toast content
      const content = (
        <div className="flex flex-col">
          <div className="font-semibold">{title}</div>
          {isAuthNotification && userName && (
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`h-5 w-5 rounded-full ${
                  type === "login" ? "bg-indigo-500/20" : "bg-fuchsia-500/20"
                } flex items-center justify-center`}
              >
                <FiUser className="h-3 w-3 text-white/80" />
              </div>
              <span className="text-sm font-medium">{userName}</span>
            </div>
          )}
          <div className="mt-1 text-sm">{message}</div>
          {isAuthNotification && (
            <div className="flex items-center gap-1.5 mt-1 opacity-80">
              <FiShield className="h-3 w-3" />
              <span className="text-xs">
                {type === "login" ? "Secure session started" : "Session ended"}
              </span>
            </div>
          )}
        </div>
      );

      // Map notification types to toast types directly
      const toastType =
        type === "success"
          ? "success"
          : type === "error"
          ? "error"
          : type === "warning"
          ? "warning"
          : "info";

      // Get icon based on notification type
      const icon =
        type === "success" ? (
          <FiCheckCircle className="h-5 w-5" />
        ) : type === "error" ? (
          <FiAlertCircle className="h-5 w-5" />
        ) : type === "warning" ? (
          <FiAlertCircle className="h-5 w-5" />
        ) : type === "login" ? (
          <FiLogIn className="h-5 w-5" />
        ) : type === "logout" ? (
          <FiLogOut className="h-5 w-5" />
        ) : (
          <FiInfo className="h-5 w-5" />
        );

      // Show the toast
      toast(content, {
        type: toastType,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: icon,
        className: `${
          type === "login"
            ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
            : type === "logout"
            ? "bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/20"
            : ""
        }`,
      });
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </NotificationContext.Provider>
  );
};
