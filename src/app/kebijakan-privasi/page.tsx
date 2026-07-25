import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Hidayatullah Media Network (hidayatullah.or.id) mengenai pengumpulan dan penggunaan data pengguna.",
};

export default function Page() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      updated="1 Juli 2026"
      intro="Kami menghormati privasi Anda. Halaman ini menjelaskan bagaimana data dikumpulkan, digunakan, dan dilindungi."
      sections={[
        {
          heading: "Data yang Kami Kumpulkan",
          body: [
            "Kami dapat mengumpulkan data yang Anda berikan secara sukarela, seperti nama dan email saat berlangganan buletin atau menghubungi redaksi.",
            "Secara otomatis, kami mengumpulkan data teknis seperti alamat IP, jenis peramban, dan halaman yang dikunjungi untuk keperluan analitik.",
          ],
        },
        {
          heading: "Penggunaan Data",
          body: [
            "Data digunakan untuk menyajikan konten yang relevan, meningkatkan layanan, serta mengirim pembaruan yang Anda setujui.",
            "Kami tidak menjual data pribadi Anda kepada pihak ketiga.",
          ],
        },
        {
          heading: "Cookie",
          body: [
            "Situs ini menggunakan cookie untuk menyimpan preferensi (seperti mode terang/gelap) dan mengukur trafik. Anda dapat menonaktifkan cookie melalui pengaturan peramban.",
          ],
        },
        {
          heading: "Hak Anda",
          body: [
            "Anda berhak meminta akses, koreksi, atau penghapusan data pribadi Anda dengan menghubungi redaksi melalui halaman Kontak.",
          ],
        },
      ]}
    />
  );
}
