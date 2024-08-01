/** @type {import('next').NextConfig} */
const path = require('path')
const appConfig = require('./config')

const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'pbs.twimg.com/',
    //     port: '',
    //     pathname: '/profile_images/**',
    //   },
    // ],
    domains: ['pbs.twimg.com'],
  },
  env: {
    CANONICAL_URL: appConfig.CANONICAL_URL,
    INTERNAL_GRAPHQL_URL: appConfig.INTERNAL_GRAPHQL_URL,
    EXTERNAL_GRAPHQL_URL: appConfig.EXTERNAL_GRAPHQL_URL,
    SEGMENT_ANALYTICS_SKIP_MINIMIZE: appConfig.SEGMENT_ANALYTICS_SKIP_MINIMIZE,
    SEGMENT_ANALYTICS_WRITE_KEY: appConfig.SEGMENT_ANALYTICS_WRITE_KEY,
    STRIPE_PUBLIC_API_KEY: appConfig.STRIPE_PUBLIC_API_KEY,
  },
  async redirects() {
    return [
      {
        source: '/graphiql',
        destination: appConfig.EXTERNAL_GRAPHQL_URL,
        permanent: true,
      },
      {
        source: '/graphql-beta',
        destination: appConfig.EXTERNAL_GRAPHQL_URL,
        permanent: true,
      },
      {
        source: '/graphql-alpha',
        destination: appConfig.EXTERNAL_GRAPHQL_URL,
        permanent: true,
      },
      {
        source: '/graphql',
        destination: appConfig.EXTERNAL_GRAPHQL_URL,
        permanent: true,
      },
    ]
  },
  experimental: {
    appDir: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: 'graphql-tag/loader',
      exclude: ['/node_modules/', '/.next/'],
      enforce: 'pre',
    })

    return webpackConfig
  },
}

module.exports = nextConfig
