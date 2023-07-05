/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  // Tell Next.js to look for pages
  // in the `src` directory
  pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
  webpack: (config, { isServer }) => {
    // Move the styles to the `src` directory
    if (!isServer) {
      config.resolve.alias["@styles"] = path.resolve(__dirname, "src/styles");
    }
    return config;
  },
};

module.exports = nextConfig;
