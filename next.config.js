/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'https://hacker-news.firebaseio.com/v0',
  }
}

module.exports = nextConfig
