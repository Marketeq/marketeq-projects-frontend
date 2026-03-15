/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/__auth/:path*",
        destination: "http://localhost:3001/:path*",
      },
      {
        source: "/__user/:path*",
        destination: "http://localhost:3003/:path*",
      },
      {
        source: "/__api/:path*",
        destination: "http://localhost:3002/:path*",
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

module.exports = nextConfig
