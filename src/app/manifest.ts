import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hidayatullah — Media Network",
    short_name: "Hidayatullah",
    description:
      "Situs resmi Hidayatullah: berita nasional & antarbangsa, hikmah, khutbah Jumat, dan program dakwah, pendidikan, serta kemanusiaan lintas Nusantara.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "id",
    dir: "ltr",
    categories: ["news", "education", "lifestyle"],
    background_color: "#f7f6f1",
    theme_color: "#0c4a35",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
