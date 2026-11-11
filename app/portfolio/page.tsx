import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import ThemeShell from "@/app/components/theme-shell";
import { getProjects } from "@/lib/database";
import { getProjectPeriod } from "@/lib/portfolio-content";

export default function PortfolioPage() {
  return (
    <ThemeShell currentPage="Projects">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:px-10 sm:pb-28">
        <p className="text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
          Kumpulan karya
        </p>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h1 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            Project & portfolio
          </h1>
          <p className="max-w-md text-sm leading-6 theme-muted">
            Pilih project untuk melihat detail, proses, dan dokumentasi
            karyanya.
          </p>
        </div>
        <Suspense
          fallback={
            <ProjectListMessage>Loading projects...</ProjectListMessage>
          }
        >
          <ProjectCards />
        </Suspense>
      </section>
    </ThemeShell>
  );
}

function ProjectListMessage({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-10 rounded-2xl border theme-border p-6 text-sm theme-muted"
      role="status"
    >
      {children}
    </p>
  );
}

async function ProjectCards() {
  let projects: Awaited<ReturnType<typeof getProjects>>;

  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return <ProjectListMessage>Project belum dapat dimuat.</ProjectListMessage>;
  }

  if (projects.length === 0) {
    return (
      <ProjectListMessage>
        Belum ada project untuk ditampilkan.
      </ProjectListMessage>
    );
  }

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const images = getProjectImages(project.images);
        const title = project.project_name || "Project title";

        return (
          <Link
            key={project.id ?? `project-${index}`}
            href={`/portfolio/detail-portfolio?id=${encodeURIComponent(String(project.id))}`}
            className="group overflow-hidden rounded-2xl border theme-border theme-surface transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              role="img"
              aria-label={`Foto utama ${title}`}
              className="relative flex aspect-[4/3] items-end overflow-hidden theme-soft p-5"
              style={{
                backgroundImage: images[0]
                  ? `linear-gradient(180deg, transparent 42%, rgb(20 24 18 / 42%)), url("${images[0]}")`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="text-xs font-medium uppercase tracking-[.16em] text-white/90">
                Project {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium text-[#3f4935] backdrop-blur">
                {project.category || "Category"}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium tracking-tight">{title}</h2>
                <span className="theme-accent-text transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 theme-muted">
                {project.description || "Project description"}
              </p>
              <p className="mt-5 border-t theme-border pt-4 text-xs theme-subtle">
                {getProjectPeriod(project) || "Date not provided"}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
