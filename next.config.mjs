/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "nodejs",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com", // Ganti dengan domain yang benar
        port: "", // Kosongkan jika tidak ada port spesifik
        pathname: "/**", // Sesuaikan path sesuai kebutuhan
      },
    ],
  },
};

export default nextConfig;
