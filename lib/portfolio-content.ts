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
  sort: number | null;
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
  certificate_name: string | null;
  category: string | null;
  certificate_authority: string | null;
  date_obtained: string | null;
  image_url: string | null;
  credential_url: string | null;
};

export function getProjectImages(project: Project): ProjectImages[] {
  return (project.project_images ?? [])
    .filter((image) => Boolean(image.image_url))
    .sort((first, second) => (first.sort ?? 0) - (second.sort ?? 0));
}

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

export function formatCertificateDate(value: string | null): string {
  if (!value) return "Date not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}
