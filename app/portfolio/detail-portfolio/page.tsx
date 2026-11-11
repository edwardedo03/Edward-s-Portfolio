import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeShell from "@/app/components/theme-shell";
import ProjectImage from "@/app/components/project-image";
import { getProjects } from "@/lib/database";
import { getProjectImages, getProjectPeriod } from "@/lib/portfolio-content";

type ProjectDetailPageProps = {
  searchParams: Promise<{ id?: string | string[] }>;
};

export default function ProjectDetailPage({
  searchParams,
}: ProjectDetailPageProps) {
  return (
    <ThemeShell currentPage="Projects">
      <Suspense
        fallback={
          <p className="mx-auto max-w-5xl px-6 py-20 text-sm theme-muted">
            Loading project...
          </p>
        }
      >
        <ProjectDetail searchParams={searchParams} />
      </Suspense>
    </ThemeShell>
  );
}

async function ProjectDetail({ searchParams }: ProjectDetailPageProps) {
  const params = await searchParams;
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!projectId) notFound();

  const projects = await getProjects();
  const project = projects.find((item) => String(item.id) === projectId);
  if (!project) notFound();

  const images = getProjectImages(project);
  const title = project.project_name || "Project title";
  const period = getProjectPeriod(project);

  return (
    <article className="mx-auto max-w-5xl px-6 pb-20 pt-8 sm:px-10 sm:pb-28">
      <p className="text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
        {project.category || "Project"}
      </p>
      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
          {title}
        </h1>
        <p className="shrink-0 text-sm theme-muted">
          {period || "Date not provided"}
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {images.slice(0, 4).map((image, index) =>
              image.image_url ? (
                <ProjectImage
                  key={`${project.id}-image-${index}`}
                  imageUrl={image.image_url}
                  alt={image.image_name || `${title} - foto ${index + 1}`}
                  className={`relative flex min-h-56 items-end rounded-2xl theme-soft p-5 ${index === 0 ? "aspect-[16/9] sm:col-span-2" : "aspect-[4/3]"}`}
                >
                  <span className="rounded-full bg-black/25 px-3 py-1.5 text-xs text-white backdrop-blur">
                    Foto {String(index + 1).padStart(2, "0")}
                  </span>
                </ProjectImage>
              ) : null,
            )}
        </div>
      )}

      <div className="mt-10 grid gap-8 border-t theme-border pt-8 md:grid-cols-[.65fr_1.35fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[.16em] theme-subtle">
            Tentang project
          </p>
          <p className="mt-3 text-sm theme-muted">
            {period || "Date not provided"}
          </p>
          {project.github_repository_url && (
            <a
              href={project.github_repository_url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full theme-action px-4 py-2.5 text-sm font-medium"
            >
              Buka repository GitHub ↗
            </a>
          )}
        </div>
        <div>
          <h2 className="text-xl font-medium tracking-tight">Deskripsi</h2>
          <p className="mt-4 whitespace-pre-line text-base leading-8 theme-muted">
            {project.description || "Project description"}
          </p>
          <Link
            href="/portfolio"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium theme-accent-text"
          >
            ← Kembali ke semua project
          </Link>
        </div>
      </div>
    </article>
  );
}
