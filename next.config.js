/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'media.tenor.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '/640/480',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
