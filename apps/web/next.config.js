/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@joey/ui", "@joey/atoms"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

module.exports = nextConfig;
