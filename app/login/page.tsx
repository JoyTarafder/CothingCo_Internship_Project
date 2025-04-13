"use client";

import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (!success) {
        setLoginError("Invalid email or password");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-black">
      <style jsx global>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-10px);
          }
          40% {
            transform: translateX(10px);
          }
          60% {
            transform: translateX(-10px);
          }
          80% {
            transform: translateX(10px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-30 bg-white rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:p-8 z-10">
        {/* Left side - Branding/Info */}
        <motion.div
          className="hidden md:block md:w-1/2 p-8 lg:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="group mb-8">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-80 transition duration-1000"></div>
                  <div className="h-20 w-20 relative bg-black rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-500 opacity-80"></div>
                    <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-bold text-4xl">A</span>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl font-bold mb-3 text-white">
                Admin Panel
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
              <p className="text-xl mb-10 text-gray-300 leading-relaxed">
                Your comprehensive solution for managing business operations
                with elegance and efficiency.
              </p>

              <div className="space-y-6">
                {[
                  { icon: FiUser, text: "Complete user management" },
                  { icon: FiShield, text: "Secure data protection" },
                  { icon: FiMail, text: "Automated notifications" },
                  { icon: FiLock, text: "Role-based access control" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    className="flex items-center group"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600/20 backdrop-blur-sm mr-4 group-hover:bg-indigo-600/30 transition-all duration-300">
                      <feature.icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          className="w-full max-w-md md:w-1/2 md:max-w-lg px-4 py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-800/50">
              <div className="text-center mb-8">
                <motion.h2
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Welcome back
                </motion.h2>
                <motion.p
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  Sign in to your account to continue
                </motion.p>
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-400 text-sm border border-red-900/30 backdrop-blur-sm"
                  >
                    {loginError}
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`space-y-6 ${isShaking ? "animate-shake" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail
                        className={`h-5 w-5 ${
                          errors.email ? "text-red-400" : "text-indigo-400"
                        }`}
                      />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 block w-full rounded-lg border ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-gray-700 focus:border-indigo-500"
                      } bg-gray-900/50 backdrop-blur-sm py-3 px-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "focus:ring-red-500/30"
                          : "focus:ring-indigo-500/30"
                      } transition-all duration-200`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock
                        className={`h-5 w-5 ${
                          errors.password ? "text-red-400" : "text-indigo-400"
                        }`}
                      />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 block w-full rounded-lg border ${
                        errors.password
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-gray-700 focus:border-indigo-500"
                      } bg-gray-900/50 backdrop-blur-sm py-3 px-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "focus:ring-red-500/30"
                          : "focus:ring-indigo-500/30"
                      } transition-all duration-200`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-500 group-hover:text-indigo-400 transition-colors duration-200" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-500 group-hover:text-indigo-400 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-400"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full overflow-hidden group flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:scale-[1.01]"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:opacity-0 transition-opacity duration-300"></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                    <div className="relative flex items-center">
                      {isLoading ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      ) : null}
                      {isLoading ? "Signing in..." : "Sign in"}
                    </div>
                  </button>
                </motion.div>
              </form>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    Contact admin
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
