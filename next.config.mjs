/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev output separate while using the standard directory for production
  // builds so Vercel can locate the generated manifests and assets.
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
