"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNotification } from "./NotificationContext";

type User = {
  email: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const defaultContext: AuthContextType = {
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { showNotification } = useNotification();

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // In a real app, you would verify the session token with your backend
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // Validate user object structure
            if (parsedUser && typeof parsedUser === "object" && parsedUser.email && parsedUser.name && parsedUser.role) {
              setUser(parsedUser);
              showNotification(
                "login",
                "Welcome back",
                `Session restored. You've been automatically logged in.`,
                parsedUser.name
              );
            } else {
              // Invalid user object, clear it
              localStorage.removeItem("user");
            }
          } catch (error) {
            console.error("Failed to parse stored user", error);
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Failed to check authentication", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [showNotification]);

  // Redirect based on authentication state
  useEffect(() => {
    if (!isLoading) {
      // Check if user is on a shop route (allow shop pages to handle their own auth)
      const isShopRoute = pathname?.startsWith("/shop");

      // If not logged in and not on login page or shop pages, redirect to login
      if (!user && pathname !== "/login" && !isShopRoute) {
        showNotification(
          "warning",
          "Authentication required",
          "Please log in to access this page."
        );
        router.push("/login");
      }

      // If logged in and on login page, redirect to dashboard
      if (user && pathname === "/login") {
        router.push("/");
      }
    }
  }, [user, isLoading, pathname, router, showNotification]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Sanitize and validate inputs
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPassword = password.trim();

      // Validate input lengths to prevent abuse
      if (sanitizedEmail.length === 0 || sanitizedEmail.length > 254) {
        showNotification(
          "error",
          "Invalid email",
          "Email length is invalid."
        );
        return false;
      }

      if (sanitizedPassword.length === 0 || sanitizedPassword.length > 128) {
        showNotification(
          "error",
          "Invalid password",
          "Password length is invalid."
        );
        return false;
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Accept both admin credentials and demo credentials
      if (
        (sanitizedEmail === "admin@gmail.com" && sanitizedPassword === "password") ||
        (sanitizedEmail === "user@example.com" && sanitizedPassword === "password")
      ) {
        // Determine user role based on email
        const isAdmin = sanitizedEmail === "admin@gmail.com";

        const userData = {
          email: sanitizedEmail,
          name: isAdmin ? "Admin User" : "Demo User",
          role: isAdmin ? "admin" : "user",
        };

        // Store user in local storage
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Show login notification
        showNotification(
          "login",
          "Login successful",
          `You are now logged in to the ${isAdmin ? "admin" : ""} panel.`,
          userData.name
        );

        return true;
      } else {
        // Show incorrect credentials notification
        if (sanitizedEmail === "admin@gmail.com" || sanitizedEmail === "user@example.com") {
          showNotification(
            "error",
            "Incorrect password",
            "The password you entered is incorrect."
          );
        } else {
          showNotification(
            "error",
            "Access denied",
            "The email or password you entered is incorrect."
          );
        }
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      showNotification(
        "error",
        "Login failed",
        "An unexpected error occurred. Please try again."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    // If user is on a shop route, redirect to shop page (which will show login)
    // Otherwise redirect to admin login
    try {
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      if (currentPath?.startsWith("/shop")) {
        router.push("/shop");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout redirect error:", error);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
