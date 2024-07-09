/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    DEPLOYED_API_URL: process.env.DEPLOYED_API_URL,
    NEXT_PUBLIC_DEPLOYED_API_URL: process.env.NEXT_PUBLIC_DEPLOYED_API_URL,
    LOCAL_API_URL: process.env.LOCAL_API_URL,
    NEXT_PUBLIC_LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL
  }
};

export default nextConfig;
