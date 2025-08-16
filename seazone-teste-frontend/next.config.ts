import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // adiciona o domínio externo
      },
      {
        protocol: "https",
        hostname: "mock-api-temporada.onrender.com", // se vier imagem da API
      },
    ],
  },
};

export default nextConfig;
