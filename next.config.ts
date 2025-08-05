import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */
  experimental: {
    viewTransition: true,
  },

  images: {
    domains: ["phantom-marca-mx.unidadeditorial.es", "visionyoptica.com", "media.oakley.com", "gv-brxm.imgix.net", "about.fb.com", "cdnx.jumpseller.com"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.144',
        port: '5000',
      },
      // Podés agregar más dominios aquí en el futuro
    ]
  },
};

export default nextConfig;
