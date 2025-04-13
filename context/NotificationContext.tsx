"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";

export type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "login"
  | "logout";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userName?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (
    type: NotificationType,
    title: string,
    message: string,
    userName?: string
  ) => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  showNotification: () => {},
  dismissNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message: string,
      userName?: string
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      setNotifications((prev) => [
        ...prev,
        { id, type, title, message, userName },
      ]);

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        dismissNotification(id);
      }, 5000);
    },
    []
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, dismissNotification }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        dismissNotification={dismissNotification}
      />
    </NotificationContext.Provider>
  );
};

interface NotificationContainerProps {
  notifications: Notification[];
  dismissNotification: (id: string) => void;
}

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case "success":
      return <FiCheckCircle className="h-6 w-6" />;
    case "error":
      return <FiAlertCircle className="h-6 w-6" />;
    case "warning":
      return <FiAlertCircle className="h-6 w-6" />;
    case "login":
      return <FiLogIn className="h-6 w-6" />;
    case "logout":
      return <FiLogOut className="h-6 w-6" />;
    case "info":
    default:
      return <FiInfo className="h-6 w-6" />;
  }
};

const getColorsForType = (type: NotificationType) => {
  switch (type) {
    case "success":
      return {
        background: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
        border: "border-emerald-500/20",
        icon: "text-emerald-500",
        ring: "ring-emerald-500/30",
        glow: "after:bg-emerald-500/40",
      };
    case "error":
      return {
        background: "bg-gradient-to-r from-red-500/10 to-rose-500/10",
        border: "border-red-500/20",
        icon: "text-red-500",
        ring: "ring-red-500/30",
        glow: "after:bg-red-500/40",
      };
    case "warning":
      return {
        background: "bg-gradient-to-r from-amber-500/10 to-yellow-500/10",
        border: "border-amber-500/20",
        icon: "text-amber-500",
        ring: "ring-amber-500/30",
        glow: "after:bg-amber-500/40",
      };
    case "login":
      return {
        background: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10",
        border: "border-indigo-500/20",
        icon: "text-indigo-500",
        ring: "ring-indigo-500/30",
        glow: "after:bg-indigo-500/40",
      };
    case "logout":
      return {
        background: "bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10",
        border: "border-fuchsia-500/20",
        icon: "text-fuchsia-500",
        ring: "ring-fuchsia-500/30",
        glow: "after:bg-fuchsia-500/40",
      };
    case "info":
    default:
      return {
        background: "bg-gradient-to-r from-blue-500/10 to-indigo-500/10",
        border: "border-blue-500/20",
        icon: "text-blue-500",
        ring: "ring-blue-500/30",
        glow: "after:bg-blue-500/40",
      };
  }
};

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  dismissNotification,
}) => {
  return (
    <div className="fixed top-5 right-5 z-50 space-y-4 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = getColorsForType(notification.type);
          const isAuthNotification =
            notification.type === "login" || notification.type === "logout";

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 40 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                duration: 0.4,
              }}
              className="pointer-events-auto"
            >
              <div
                className={`relative overflow-hidden rounded-xl border ${colors.border} ${colors.background} backdrop-blur-lg shadow-2xl p-5 ring-1 ${colors.ring} after:absolute after:inset-0 after:blur-2xl after:opacity-20 ${colors.glow} after:-z-10`}
              >
                {isAuthNotification && (
                  <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-white/5 to-white/10 blur-xl" />
                )}

                <div className="flex items-start gap-4">
                  {isAuthNotification ? (
                    <div className={`flex-shrink-0 relative group`}>
                      <div
                        className={`rounded-full p-2.5 bg-gradient-to-br ${
                          notification.type === "login"
                            ? "from-indigo-600/20 to-purple-600/20"
                            : "from-fuchsia-600/20 to-pink-600/20"
                        } backdrop-blur-sm`}
                      >
                        <motion.div
                          className={`${colors.icon}`}
                          initial={{
                            rotate: notification.type === "login" ? -45 : 45,
                          }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.5, type: "spring" }}
                        >
                          {getIconForType(notification.type)}
                        </motion.div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-full"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  ) : (
                    <div className={`flex-shrink-0 ${colors.icon}`}>
                      {getIconForType(notification.type)}
                    </div>
                  )}

                  <div className="flex-1 pt-0.5">
                    {isAuthNotification && notification.userName ? (
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold text-white">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div
                            className={`h-6 w-6 rounded-full ${
                              notification.type === "login"
                                ? "bg-indigo-500/20"
                                : "bg-fuchsia-500/20"
                            } flex items-center justify-center`}
                          >
                            <FiUser className="h-3.5 w-3.5 text-white/80" />
                          </div>
                          <motion.span
                            className="text-sm text-white/90 font-medium"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {notification.userName}
                          </motion.span>
                        </div>
                        <p className="mt-1 text-sm text-gray-300">
                          {notification.message}
                        </p>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-sm font-medium text-white">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-300">
                          {notification.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      className="inline-flex rounded-full p-1 text-gray-400 hover:text-gray-200 hover:bg-white/10 focus:outline-none transition-colors duration-200"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  {isAuthNotification && (
                    <div className="flex items-center gap-1.5 opacity-80">
                      <FiShield className="h-3 w-3 text-white/60" />
                      <span className="text-xs text-white/60">
                        {notification.type === "login"
                          ? "Secure session started"
                          : "Session ended"}
                      </span>
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="h-0.5 bg-gray-700/50 rounded-full overflow-hidden ml-auto w-full max-w-[120px]">
                      <motion.div
                        className={`h-full ${
                          notification.type === "login"
                            ? "bg-indigo-600/50"
                            : notification.type === "logout"
                            ? "bg-fuchsia-600/50"
                            : "bg-white/30"
                        }`}
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                {isAuthNotification && (
                  <>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-white/5 blur-md" />
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full h-1 w-1 bg-white/40`}
                        style={{
                          top: `${20 + i * 20}%`,
                          right: `${10 + i * 5}px`,
                        }}
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
