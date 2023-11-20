/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  async rewrites() {
    return [
      {
        source: '/api-web/:path*',
        destination: `${process.env.BASE_URL}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
