/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost', 'swcss.pusan.ac.kr'],
  },
};

if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
  nextConfig.compiler = {
    removeConsole: true,
  };
}

export default nextConfig;
