/** @type {import('next').NextConfig} */

// const path = require('path')

const nextConfig = {
  reactStrictMode: false, // 关于React严格模式
  webpack: (config) => {
    // 修改内置config配置
    // config.resolve = {
    //   alias: {
    //     '@@': path.resolve(__dirname, '.')
    //   }
    // }
    return config
  }
}

module.exports = nextConfig
