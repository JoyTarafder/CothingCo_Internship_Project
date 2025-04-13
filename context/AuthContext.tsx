"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, you would verify the session token with your backend
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Redirect based on authentication state
  useEffect(() => {
    if (!isLoading) {
      // If not logged in and not on login page, redirect to login
      if (!user && pathname !== "/login") {
        router.push("/login");
      }

      // If logged in and on login page, redirect to dashboard
      if (user && pathname === "/login") {
        router.push("/");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // In a real app, you would call an API to authenticate
      // This is a mock implementation for demonstration

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any valid-looking email/password
      if (email && password.length >= 6) {
        const userData = {
          email,
          name: "Admin User",
          role: "admin",
        };

        // Store user in local storage
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
