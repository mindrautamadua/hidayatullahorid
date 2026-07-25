import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Penafian atas informasi yang disajikan di Hidayatullah Media Network (hidayatullah.or.id).",
};

export default function Page() {
  return (
    <LegalPage
      title="Disclaimer"
      updated="1 Juli 2026"
      intro="Penafian mengenai keakuratan dan penggunaan informasi di situs ini."
      sections={[
        {
          heading: "Keakuratan Informasi",
          body: [
            "Kami berupaya menyajikan informasi seakurat mungkin. Namun, kami tidak menjamin bahwa seluruh konten selalu lengkap, mutakhir, atau bebas dari kekeliruan.",
          ],
        },
        {
          heading: "Pandangan Penulis",
          body: [
            "Opini dalam kolom dan artikel merupakan pandangan pribadi penulis dan tidak selalu mencerminkan sikap resmi redaksi.",
          ],
        },
        {
          heading: "Fatwa & Masalah Keagamaan",
          body: [
            "Konten fiqih dan konsultasi bersifat edukatif. Untuk keputusan hukum yang mengikat, disarankan merujuk kepada ulama atau lembaga fatwa yang berwenang.",
          ],
        },
        {
          heading: "Tautan Eksternal",
          body: [
            "Situs ini dapat memuat tautan ke pihak ketiga. Kami tidak bertanggung jawab atas isi maupun kebijakan privasi situs eksternal tersebut.",
          ],
        },
      ]}
    />
  );
}
