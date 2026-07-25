import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat Penggunaan",
  description: "Ketentuan penggunaan layanan dan konten Hidayatullah (hidayatullah.or.id).",
};

export default function Page() {
  return (
    <LegalPage
      title="Syarat Penggunaan"
      updated="1 Juli 2026"
      intro="Dengan mengakses Hidayatullah (hidayatullah.or.id), Anda menyetujui ketentuan penggunaan berikut."
      sections={[
        {
          heading: "Penggunaan Konten",
          body: [
            "Seluruh konten disediakan untuk keperluan informasi dan edukasi. Anda dapat membagikan tautan, namun dilarang menyalin, memodifikasi, atau mendistribusikan ulang konten secara komersial tanpa izin tertulis.",
          ],
        },
        {
          heading: "Hak Kekayaan Intelektual",
          body: [
            "Seluruh materi — teks, gambar, logo, dan desain — merupakan milik Hidayatullah (hidayatullah.or.id) atau pihak yang memberikan lisensi, dan dilindungi undang-undang hak cipta.",
          ],
        },
        {
          heading: "Konten Pengguna",
          body: [
            "Komentar dan kiriman pengguna menjadi tanggung jawab masing-masing. Kami berhak menyunting atau menghapus konten yang melanggar hukum, norma, atau adab.",
          ],
        },
        {
          heading: "Perubahan Ketentuan",
          body: [
            "Kami dapat memperbarui ketentuan ini sewaktu-waktu. Penggunaan yang berlanjut setelah perubahan dianggap sebagai persetujuan atas ketentuan yang berlaku.",
          ],
        },
      ]}
    />
  );
}
