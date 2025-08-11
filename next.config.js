/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "media.licdn.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/favorites",
        destination: "http://localhost:4003/favorites",
      },
      {
        source: "/api/favorites/:path*",
        destination: "http://localhost:4003/favorites/:path*",
      },
    ];
  },
};

module.exports = nextConfig;