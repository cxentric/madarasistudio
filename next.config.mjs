/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add real product-photo hosts here once you upload real photography
    // (e.g. 'res.cloudinary.com', 'images.unsplash.com', your CMS domain).
    remotePatterns: [],
  },
};

export default nextConfig;
