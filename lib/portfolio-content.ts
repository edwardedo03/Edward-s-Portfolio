export type PersonalData = {
  id_edward?: number | null;
  updated_at?: string | null;
  full_name?: string | null;
  short_name?: string | null;
  family_name?: string | null;
  age?: number | null;
  current_job?: string | null;
  job_description?: string | null;
  city_of_domicile?: string | null;
  current_institution?: string | null;
  university_major?: string | null;
  current_status?: string | null;
  image_path?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  instagram_url?: string | null;
};

export type ProjectImages = {
  id: number | null;
  id_project: number | null;
  image_name: string | null;
  image_url: string | null;
};

export type Project = {
  id: number | null;
  project_name: string | null;
  category: string | null;
  description: string | null;
  github_repository_url: string | null;
  start_date: string | null;
  finished_date: string | null;
  project_images: ProjectImages[] | null;
};

export type Certificate = {
  id: number | null;
  certificated_name: string | null;
  category: string | null;
  certificate_authority: string | null;
  date_obtained: string | null;
  image_url: string | null;
  credential_url: string | null;
};

function formatProjectDate(value: string | null): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.toUpperCase();

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

export function getProjectPeriod(project: Project): string {
  return [
    formatProjectDate(project.start_date),
    formatProjectDate(project.finished_date),
  ]
    .filter((date): date is string => date !== null)
    .join(" - ");
}

export type PortfolioCertificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  image: string;
  credentialUrl: string;
};

export const certificates: PortfolioCertificate[] = [
  {
    id: "sertifikat-pertama",
    title: "Nama Sertifikat Pertama",
    issuer: "Nama Penyelenggara",
    date: "15 Mei 2025",
    category: "Data Analytics",
    description:
      "Jelaskan materi, keterampilan, atau pencapaian yang kamu peroleh dari sertifikat ini.",
    image: "/images/certificates/sertifikat-pertama.jpg",
    credentialUrl: "https://example.com/credential/sertifikat-pertama",
  },
  {
    id: "sertifikat-kedua",
    title: "Nama Sertifikat Kedua",
    issuer: "Nama Penyelenggara",
    date: "20 November 2024",
    category: "Machine Learning",
    description:
      "Tambahkan penjelasan singkat tentang pelatihan atau pencapaian ini.",
    image: "/images/certificates/sertifikat-kedua.jpg",
    credentialUrl: "https://example.com/credential/sertifikat-kedua",
  },
  {
    id: "sertifikat-ketiga",
    title: "Nama Sertifikat Ketiga",
    issuer: "Nama Penyelenggara",
    date: "8 Agustus 2024",
    category: "Web Development",
    description: "Tuliskan keterampilan atau hal penting yang kamu pelajari.",
    image: "/images/certificates/sertifikat-ketiga.jpg",
    credentialUrl: "https://example.com/credential/sertifikat-ketiga",
  },
];
