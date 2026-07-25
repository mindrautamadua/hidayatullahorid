// Canonical site URL for metadata, sitemap, robots, JSON-LD, and OG image.
// Override per-deployment with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://hidayatullahorid.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Hidayatullah";
