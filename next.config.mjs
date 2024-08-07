/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    DEPLOYED_API_URL: process.env.DEPLOYED_API_URL,
    NEXT_PUBLIC_DEPLOYED_API_URL: process.env.NEXT_PUBLIC_DEPLOYED_API_URL,
    LOCAL_API_URL: process.env.LOCAL_API_URL,
    NEXT_PUBLIC_LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96],
    deviceSizes: [640, 750, 828, 1080, 1200],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wageul-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
