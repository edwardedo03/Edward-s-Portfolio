import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeShell from "@/app/components/theme-shell";
import { projects } from "@/lib/portfolio-content";

type ProjectDetailPageProps = {
  searchParams: Promise<{ id?: string | string[] }>;
};

export default async function ProjectDetailPage({
  searchParams,
}: ProjectDetailPageProps) {
  const params = await searchParams;
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  const project = projects.find((item) => item.id === projectId);

  if (!project) notFound();

  return (
    <ThemeShell backHref="/portfolio" backLabel="Semua project">
      <article className="mx-auto max-w-5xl px-6 pb-20 pt-8 sm:px-10 sm:pb-28">
        <p className="text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
          {project.category}
        </p>
        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            {project.title}
          </h1>
          <p className="shrink-0 text-sm theme-muted">{project.date}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.images.map((image, index) => (
            <div
              key={`${project.id}-image-${index}`}
              role="img"
              aria-label={`Foto ${index + 1} untuk ${project.title}`}
              className={`relative flex min-h-56 items-end overflow-hidden rounded-2xl theme-soft p-5 ${index === 0 ? "aspect-[16/9] sm:col-span-2" : "aspect-[4/3]"}`}
              style={{
                backgroundImage: `linear-gradient(180deg, transparent 55%, rgb(20 24 18 / 45%)), url("${image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="rounded-full bg-black/25 px-3 py-1.5 text-xs text-white backdrop-blur">
                Foto {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 border-t theme-border pt-8 md:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[.16em] theme-subtle">
              Tentang project
            </p>
            <p className="mt-3 text-sm theme-muted">{project.date}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight">Deskripsi</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-8 theme-muted">
              {project.description}
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
    </ThemeShell>
  );
}
