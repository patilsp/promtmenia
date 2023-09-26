/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com','utfs.io'],
    },
    // webpack(config) {
    //   config.experiments = {
    //     ...config.experiments,
    //     topLevelAwait: true,
    //   }
    //   return config
    // }
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuild: true,
    },
  }
  
  module.exports = nextConfig