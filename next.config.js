const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com", "picsum.photos"],
  },
};

module.exports = withNextIntl(nextConfig);
