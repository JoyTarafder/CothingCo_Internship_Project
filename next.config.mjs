/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.unsplash.com", "localhost", "via.placeholder.com"],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: "default",
    path: "/_next/image",
    // Disable image optimization for problematic external URLs in development
    ...(process.env.NODE_ENV === "development" && {
      unoptimized: false,
    }),
    // Add timeout configurations for external images
    loaderFile: undefined,
    disableStaticImages: false,
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["react-icons", "chart.js", "recharts"],
  },
  // Add timeout configurations
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
  // Add custom webpack configuration to handle potential module issues
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Add fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Optimize performance
    config.optimization = {
      ...config.optimization,
      moduleIds: "deterministic",
    };

    return config;
  },
  // Add headers for better caching and security
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Add timeout headers for external image requests
        source: "/_next/image",
        headers: [
          {
            key: "X-Image-Timeout",
            value: "30000",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  // Add redirects for problematic external images to fallbacks
  async redirects() {
    return [
      // Redirect problematic external image requests to local fallbacks in development
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              source: "/_next/image",
              has: [
                {
                  type: "query",
                  key: "url",
                  value:
                    "(?:.*images\\.unsplash\\.com.*photo-1441984904996.*|.*images\\.unsplash\\.com.*photo-1490481651871.*|.*images\\.unsplash\\.com.*photo-1483985988355.*)",
                },
              ],
              destination: "/images/profile-avatar.jpg",
              permanent: false,
            },
          ]
        : []),
    ];
  },
  async rewrites() {
    return [
      // Add any specific rewrites if needed
    ];
  },
};

export default nextConfig;
