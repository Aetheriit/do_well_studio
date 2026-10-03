/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isolate both modes so dev servers and Windows file scanners cannot lock
  // the production build output while it is being generated (or vice versa).
  distDir: process.env.NODE_ENV === "production" ? ".next-production" : ".next-dev",
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
