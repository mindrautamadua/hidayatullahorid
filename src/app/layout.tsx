import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Fraunces } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { InlineScript } from "@/components/InlineScript";
import { SITE_URL } from "@/lib/site";

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hidayatullah — Membangun Peradaban Islam | Situs Resmi Organisasi",
    template: "%s · Hidayatullah",
  },
  description:
    "Situs resmi Hidayatullah: berita nasional, antarbangsa, dan daerah; hikmah, kajian, khutbah Jumat, serta program dakwah, pendidikan, dan kemanusiaan lintas Nusantara.",
  keywords: [
    "hidayatullah",
    "peradaban islam",
    "berita islam",
    "dakwah",
    "hikmah",
    "khutbah jumat",
    "antarbangsa",
    "BMH",
    "pesantren",
  ],
  openGraph: {
    title: "Hidayatullah — Membangun Peradaban Islam",
    description:
      "Situs resmi Hidayatullah: berita, hikmah, dakwah, dan program kemanusiaan lintas Nusantara dan dunia Islam.",
    type: "website",
    locale: "id_ID",
    siteName: "Hidayatullah",
  },
  applicationName: "Hidayatullah",
  appleWebApp: {
    capable: true,
    title: "Hidayatullah",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c4a35" },
    { media: "(prefers-color-scheme: dark)", color: "#101109" },
  ],
};

// Apply saved theme before paint to avoid a flash of the wrong mode.
const themeScript = `
(function(){try{var t=localStorage.getItem('hid-orid-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className={`${franklin.variable} ${fraunces.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
