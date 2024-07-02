/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log("Rewrites called");
    return [
      {
        source: "/",
        destination: `${process.env.API_URL}/`,
      },
    ];
  },
};

export default nextConfig;
