/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  swcMinify: true,
  // This works with the @netlify/plugin-nextjs plugin to optimize caching
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
