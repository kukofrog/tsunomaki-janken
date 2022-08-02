/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
      fileName: true,
    },
  },
};

module.exports = nextConfig;
