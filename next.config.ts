import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */
  experimental: {
    viewTransition: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.144',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.144',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '174.138.187.210'
      },
      {
        protocol: 'http',
        hostname: 'optivenhost.net'
      },
      // Podés agregar más dominios aquí en el futuro
    ]
  },
};

export default nextConfig;
