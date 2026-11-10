export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  images: string[];
};

export type PortfolioCertificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
};

// Ganti data contoh dan path gambar ini dengan data milikmu.
export const projects: PortfolioProject[] = [
  {
    id: "project-pertama",
    title: "Nama Proyek Pertama",
    category: "Web Development",
    date: "Januari 2025 – Maret 2025",
    description:
      "Jelaskan tujuan proyek, tantangan yang diselesaikan, teknologi yang digunakan, serta kontribusi dan hasil yang kamu capai.",
    images: [
      "/images/projects/project-pertama-1.jpg",
      "/images/projects/project-pertama-2.jpg",
      "/images/projects/project-pertama-3.jpg",
    ],
  },
  {
    id: "project-kedua",
    title: "Nama Proyek Kedua",
    category: "UI / UX Design",
    date: "September 2024 – Desember 2024",
    description:
      "Tulis ringkasan proyek di sini. Ceritakan proses, peranmu, dan hal yang kamu pelajari.",
    images: [
      "/images/projects/project-kedua-1.jpg",
      "/images/projects/project-kedua-2.jpg",
    ],
  },
  {
    id: "project-ketiga",
    title: "Nama Proyek Ketiga",
    category: "Data & Research",
    date: "Juni 2024 – Agustus 2024",
    description:
      "Tambahkan deskripsi yang menjelaskan masalah, solusi, dan dampak dari proyek ini.",
    images: ["/images/projects/project-ketiga-1.jpg"],
  },
];

export const certificates: PortfolioCertificate[] = [
  {
    id: "sertifikat-pertama",
    title: "Nama Sertifikat Pertama",
    issuer: "Nama Penyelenggara",
    date: "15 Mei 2025",
    description:
      "Jelaskan materi, keterampilan, atau pencapaian yang kamu peroleh dari sertifikat ini.",
    image: "/images/certificates/sertifikat-pertama.jpg",
  },
  {
    id: "sertifikat-kedua",
    title: "Nama Sertifikat Kedua",
    issuer: "Nama Penyelenggara",
    date: "20 November 2024",
    description:
      "Tambahkan penjelasan singkat tentang pelatihan atau pencapaian ini.",
    image: "/images/certificates/sertifikat-kedua.jpg",
  },
  {
    id: "sertifikat-ketiga",
    title: "Nama Sertifikat Ketiga",
    issuer: "Nama Penyelenggara",
    date: "8 Agustus 2024",
    description:
      "Tuliskan keterampilan atau hal penting yang kamu pelajari.",
    image: "/images/certificates/sertifikat-ketiga.jpg",
  },
];
