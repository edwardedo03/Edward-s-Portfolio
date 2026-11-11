"use client";

import Link from "next/link";
import {
  certificates as portfolioCertificates,
  getProjectPeriod,
  type PersonalData,
  type Project,
} from "@/lib/portfolio-content";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getPersonalData, getProjects } from "@/lib/database";

type TechStackGroup = {
  title: string;
  description: string;
  icon: string;
  technologies: { name: string; mark: string; color: string }[];
};

const leftTechStacks: TechStackGroup[] = [
  {
    title: "Languages",
    description: "Programming languages I use regularly.",
    icon: "</>",
    technologies: [
      { name: "JavaScript", mark: "JS", color: "#eab308" },
      { name: "TypeScript", mark: "TS", color: "#3b82f6" },
      { name: "Python", mark: "Py", color: "#38bdf8" },
      { name: "Java", mark: "Ja", color: "#f97316" },
    ],
  },
  {
    title: "Frontend",
    description: "Technologies for building modern user interfaces.",
    icon: "▣",
    technologies: [
      { name: "React", mark: "⚛", color: "#22d3ee" },
      { name: "Next.js", mark: "N", color: "var(--foreground)" },
      { name: "Tailwind CSS", mark: "≈", color: "#38bdf8" },
      { name: "Figma", mark: "F", color: "#e879f9" },
    ],
  },
];

const rightTechStacks: TechStackGroup[] = [
  {
    title: "Backend",
    description:
      "Technologies for building and managing server-side applications.",
    icon: "▤",
    technologies: [
      { name: "Node.js", mark: "⬡", color: "#84cc16" },
      { name: "Flask", mark: "ƒ", color: "var(--foreground)" },
      { name: "PHP", mark: "php", color: "#a78bfa" },
      { name: "MySQL", mark: "SQL", color: "#38bdf8" },
    ],
  },
  {
    title: "Tools",
    description: "Development and productivity tools I frequently use.",
    icon: "⚒",
    technologies: [
      { name: "GitHub", mark: "GH", color: "var(--foreground)" },
      { name: "Docker", mark: "◈", color: "#38bdf8" },
      { name: "Supabase", mark: "↯", color: "#34d399" },
      { name: "VS Code", mark: "⌘", color: "#38bdf8" },
    ],
  },
];

function TechStackCard({ group }: { group: TechStackGroup }) {
  return (
    <article className="rounded-3xl theme-border theme-surface p-5 shadow-lg sm:p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl theme-soft text-lg font-semibold theme-accent-text">
          {group.icon}
        </span>
        <div>
          <h3 className="text-base font-semibold">{group.title}</h3>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5">
        {group.technologies.map((technology) => (
          <li key={technology.name} className="flex items-center gap-3 text-sm">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg theme-soft text-xs font-bold"
              style={{ color: technology.color }}
            >
              {technology.mark}
            </span>
            <span>{technology.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Home() {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [isLoadingPersonalData, setIsLoadingPersonalData] = useState(true);
  const [personalDataError, setPersonalDataError] = useState(false);
  const [isNavbarFloating, setIsNavbarFloating] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(false);

  useEffect(() => {
    setIsDarkTheme(window.localStorage.getItem("portfolio-theme") === "dark");
  }, []);

  useEffect(() => {
    const updateNavbar = () => setIsNavbarFloating(window.scrollY > 24);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadPersonalData = async () => {
      try {
        const data = await getPersonalData();
        if (isMounted) setPersonalData((data as PersonalData | null) ?? null);
      } catch (error) {
        console.error("Failed to fetch personal information:", error);
        if (isMounted) setPersonalDataError(true);
      } finally {
        if (isMounted) setIsLoadingPersonalData(false);
      }
    };

    void loadPersonalData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (isMounted) setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        if (isMounted) setProjectsError(true);
      } finally {
        if (isMounted) setIsLoadingProjects(false);
      }
    };

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayValue = (
    value: string | number | null | undefined,
    fallback: string,
  ) =>
    value === null || value === undefined || value === "" ? fallback : value;

  return (
    <main
      data-theme={isDarkTheme ? "dark" : "light"}
      className="theme-page min-h-screen"
    >
      <header
        style={{
          width: isNavbarFloating ? "min(calc(100vw - 2rem), 42rem)" : "100vw",
        }}
        className={`fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-between transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isNavbarFloating
            ? "top-4 h-16 rounded-full theme-floating px-5 shadow-lg backdrop-blur-lg sm:px-8"
            : "h-20 theme-header px-6 sm:px-32"
        }`}
      >
        <a
          href="#home"
          className="shrink-0 text-lg font-semibold tracking-tight"
        >
          Edward<span className="theme-accent-text">.</span>
        </a>
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-6 text-md theme-muted transition-colors duration-300 sm:flex"
        >
          <a className="transition theme-hover" href="#tentang">
            About
          </a>
          <a className="transition theme-hover" href="#proyek">
            Projects
          </a>
          <a className="transition theme-hover" href="/#sertifikat">
            Certificates
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={
              isDarkTheme ? "Aktifkan tema terang" : "Aktifkan tema gelap"
            }
            aria-pressed={isDarkTheme}
            onClick={() => {
              const nextTheme = !isDarkTheme;
              setIsDarkTheme(nextTheme);
              window.localStorage.setItem(
                "portfolio-theme",
                nextTheme ? "dark" : "light",
              );
            }}
            className="ml-auto mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border theme-border theme-toggle transition hover:scale-105 sm:ml-0 cursor-pointer"
            title={isDarkTheme ? "Light Mode" : "Dark Mode"}
          >
            {isDarkTheme ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.6 8.6 0 1 0 20.2 15.1Z"
                />
              </svg>
            )}
          </button>
          <a
            href="#kontak"
            className={`shrink-0 rounded-full border theme-border px-4 py-2 text-sm font-medium transition-all duration-300 theme-hover ${isNavbarFloating ? "theme-floating-cta" : ""}`}
          >
            Contact me
          </a>
        </div>
      </header>
      <div aria-hidden="true" className="h-20" />

      <section
        id="home"
        className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-14 sm:px-10 sm:pb-32 sm:pt-24 md:grid-cols-[1.15fr_.85fr] md:items-center"
      >
        <div>
          <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
            <span className="h-2 w-2 rounded-full theme-accent" />{" "}
            <span>
              {isLoadingPersonalData
                ? "Loading..."
                : displayValue(personalData?.current_status, "...")}
            </span>
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-.055em] sm:text-7xl">
            Hello, I'm
            <br />
            <span className="theme-accent-text">
              {isLoadingPersonalData
                ? "Loading..."
                : displayValue(personalData?.family_name, "...")}
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 theme-muted sm:text-lg text-justify">
            {isLoadingPersonalData
              ? "Loading..."
              : displayValue(personalData?.job_description, "...")}
          </p>
          {personalDataError && (
            <p className="mt-3 text-xs theme-subtle" role="status">
              Could not load profile information. Please try again later.
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#proyek"
              className="rounded-full theme-action px-5 py-3 text-sm font-medium transition theme-action-hover"
            >
              <b>See my projects</b>
            </a>
            <a
              href="#kontak"
              className="rounded-full border theme-border px-5 py-3 text-sm font-medium transition theme-hover-border"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm md:ml-auto">
          <div className="relative aspect-4/5 overflow-hidden rounded-4xl theme-soft">
            {isLoadingPersonalData ? (
              <div className="flex h-full items-center justify-center theme-subtle">
                Loading...
              </div>
            ) : personalData?.image_path ? (
              <Image
                fill
                src={personalData.image_path}
                alt=""
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover object-center select-none"
                draggable="false"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center theme-subtle">
                {personalDataError
                  ? "Photo unavailable"
                  : "Add a profile photo"}
              </div>
            )}
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border theme-border theme-surface px-5 py-4 shadow-sm sm:-left-9">
            <p className="text-[10px] uppercase tracking-[.16em] theme-subtle">
              Domiciled in{" "}
            </p>
            <p className="mt-1 text-sm font-medium">
              {isLoadingPersonalData
                ? "Loading..."
                : displayValue(personalData?.city_of_domicile, "...")}
            </p>
          </div>
        </div>
      </section>

      <section id="tentang" className="border-y theme-border theme-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">
              Sedikit tentang saya.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 theme-muted">
              Tulis perkenalan singkat tentang dirimu di sini. Ceritakan hal
              yang sedang kamu pelajari, minat profesionalmu, atau cara kamu
              senang berkontribusi.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5 border-t theme-border pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs theme-subtle">Universitas</p>
                <p className="mt-2 text-sm font-medium"> Nama Universitas</p>
              </div>
              <div>
                <p className="text-xs theme-subtle">Program studi</p>
                <p className="mt-2 text-sm font-medium">Nama Jurusan</p>
              </div>
              <div>
                <p className="text-xs theme-subtle">Angkatan</p>
                <p className="mt-2 text-sm font-medium">20xx</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="proyek"
        className="mx-auto max-w-[1800px] px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="grid gap-12 xl:grid-cols-[240px_minmax(0,1fr)_240px] xl:gap-10">
          <aside
            aria-label="Technology stack: languages and frontend"
            className="grid content-start gap-10 sm:grid-cols-2 xl:grid-cols-1 xl:pt-31.5"
          >
            {leftTechStacks.map((group) => (
              <TechStackCard key={group.title} group={group} />
            ))}
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase theme-accent-text">Projects</p>
                <h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
                  Selected Projects
                </h2>
                <p className="max-w-md text-sm leading-6 theme-muted">
                  A few projects i've worked on.
                </p>
              </div>
              <a
                href="/portfolio"
                className="mb-3 px-6 py-2.5 text-sm shrink-0 items-center justify-center rounded-full theme-border transition hover:scale-105 sm:ml-0 cursor-pointer hover:-translate-y-1 shadow-lg bg-(--tertier-soft) text-(--tertier) theme-action-hover hover:text-(--border) font-medium"
                title="View all projects"
              >
                <b>View all projects</b>
              </a>
            </div>
            <div className="mt-5 flex flex-col gap-8">
              {isLoadingProjects ? (
                <p className="rounded-3xl border theme-border p-6 text-sm theme-muted">
                  Loading projects...
                </p>
              ) : projectsError ? (
                <p
                  className="rounded-3xl border theme-border p-6 text-sm theme-muted"
                  role="status"
                >
                  Projects could not be loaded.
                </p>
              ) : projects.length === 0 ? (
                <p className="rounded-3xl border theme-border p-6 text-sm theme-muted">
                  No projects to display yet.
                </p>
              ) : (
                projects.slice(0, 3).map((project, projectIndex) => {
                  const projectImages = (project.project_images ?? []).slice(
                    0,
                    2,
                  );
                  const imageSlots =
                    projectImages.length > 0 ? projectImages : [null];
                  const projectPeriod = getProjectPeriod(project);

                  return (
                    <article
                      key={project.id ?? `project-${projectIndex}`}
                      className="grid gap-6 py-8 px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-10 rounded-3xl theme-border shadow-lg"
                    >
                      <div className="grid grid-cols-1 gap-4.5 sm:gap-5">
                        {imageSlots.map((image, imageIndex) => (
                          <div
                            key={`${project.id ?? projectIndex}-photo-${imageIndex}`}
                            role="img"
                            aria-label={`Foto ${imageIndex + 1} untuk ${project.project_name}`}
                            className="relative aspect-video overflow-hidden rounded-lg border theme-border theme-soft shadow-2xl"
                            style={{
                              backgroundImage: image
                                ? `url("${image.image_url}")`
                                : undefined,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        ))}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            {project.project_name}
                          </h3>
                          <span className="rounded-full border theme-border px-3 py-1 text-xs theme-accent-text">
                            {project.category || "Category"}
                          </span>
                        </div>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[.12em] theme-subtle">
                          {projectPeriod || "Add project dates"}
                        </p>
                        <p className="mt-4 max-w-2xl text-sm leading-7 theme-muted text-justify">
                          {project.description || "Add a project description."}
                        </p>
                        <div className="flex gap-4">
                          <a
                            href={project.github_repository_url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open GitHub repository ${project.project_name}`}
                            className={`mt-6 inline-flex items-center gap-3 rounded-xl px-3 py-2 transition ${isDarkTheme ? "bg-[#1f2135] theme-action-hover" : "theme-soft hover:bg-[#1f2135]!"} hover:-translate-y-1 text-(--action) hover:text-(--soft) shadow-lg`}
                          >
                            <Image
                              src="/icons/github-light.png"
                              width={20}
                              height={20}
                              alt=""
                            />
                            <p className="text-sm font-semibold">
                              View on GitHub
                            </p>
                          </a>
                          <a
                            href={`/portfolio/detail-portfolio?id=${project.id}`}
                            aria-label={`Open project detail ${project.project_name}`}
                            className={`mt-6 inline-flex items-end gap-2 rounded-xl px-4 py-2 transition theme-border theme-action-hover hover:-translate-y-1 text-(--action) hover:text-(--soft) shadow-lg`}
                          >
                            <p className="text-xs font-semibold">See details</p>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          <aside
            aria-label="Technology stack: backend and tools"
            className="grid content-start gap-10 sm:grid-cols-2 xl:grid-cols-1 xl:pt-31.5"
          >
            {rightTechStacks.map((group) => (
              <TechStackCard key={group.title} group={group} />
            ))}
          </aside>
        </div>
      </section>

      <section id="sertifikat" className="border-y theme-border theme-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-xs font-bold tracking-[.12em] theme-accent-text">
                  CERTIFICATES
                </p>
                <span className="h-px w-20 theme-accent" />
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
                Recent Certifications
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 theme-muted sm:text-base">
                Some of the certifications and training programs I’ve completed.
              </p>
            </div>
            <Link
              href="/certificate"
              className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full theme-soft px-6 py-3 text-sm font-semibold theme-foreground transition hover:-translate-y-0.5"
            >
              View All Certificates <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {portfolioCertificates.slice(0, 3).map((certificate) => (
              <article
                key={certificate.id}
                className="grid gap-5 rounded-3xl border theme-border p-4 sm:p-5 lg:grid-cols-[220px_minmax(0,1fr)_auto] lg:items-center lg:gap-7"
              >
                <div
                  role="img"
                  aria-label={`Certificate image: ${certificate.title}`}
                  className="aspect-video overflow-hidden rounded-xl theme-soft"
                  style={{
                    backgroundImage: `url("${certificate.image}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />

                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-snug tracking-tight sm:text-xl">
                    {certificate.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <p className="flex items-center gap-2.5 text-sm theme-muted">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 shrink-0"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-8h6v8M8 9h.01M16 9h.01"
                        />
                      </svg>
                      {certificate.issuer}
                    </p>
                    <span className="inline-flex items-center gap-2.5 text-sm theme-muted">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 shrink-0"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                      Obtained in {certificate.date}
                    </span>
                    <span className="rounded-full theme-soft px-4 py-2 text-xs font-semibold theme-accent-text">
                      {certificate.category}
                    </span>
                  </div>
                </div>

                <div className="flex border-t theme-border pt-4 lg:h-20 lg:items-center lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold theme-foreground transition hover:-translate-y-0.5 lg:w-auto"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    View Credential
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 4h6v6m-11 5L20 4M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="kontak"
        className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20"
      >
        <div className="flex flex-col justify-between gap-8 border-b theme-border pb-12 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl">
              Think we’d make a great team?
              <br />
              Let’s connect!
            </h2>
          </div>
          <a
            href="mailto:edwardahhutauruk@gmail.com"
            className="w-fit rounded-full theme-action px-5 py-3 text-sm font-medium transition theme-action-hover"
          >
            <b>Send an email</b>
          </a>
        </div>
        <div className="flex flex-col justify-between gap-5 pt-6 text-xs theme-subtle sm:flex-row">
          <p>© 2026 - Edward Antonio Herlambang Hutauruk</p>
          <div className="flex gap-5">
            <a
              className="transition theme-hover flex items-center gap-2"
              href={
                personalData?.linkedin_url
                  ? personalData.linkedin_url
                  : "https://linkedin.com"
              }
              target="_blank"
            >
              <Image
                src="/icons/linkedin.png"
                alt=""
                width={18}
                height={18}
                className="object-cover object-center select-none"
                draggable="false"
              />
              LinkedIn
            </a>
            <a
              className="transition theme-hover flex items-center gap-2"
              href={
                personalData?.github_url
                  ? personalData.github_url
                  : "httpshttps://github.com"
              }
              target="_blank"
            >
              {isDarkTheme ? (
                <Image
                  src="/icons/github-light.png"
                  alt=""
                  width={20}
                  height={20}
                  className="object-cover object-center select-none"
                  draggable="false"
                />
              ) : (
                <Image
                  src="/icons/github.png"
                  alt=""
                  width={20}
                  height={20}
                  className="object-cover object-center select-none"
                  draggable="false"
                />
              )}
              GitHub
            </a>
            <a
              className="transition theme-hover flex items-center gap-2"
              href={
                personalData?.instagram_url
                  ? personalData.instagram_url
                  : "https://instagram.com"
              }
              target="_blank"
            >
              <Image
                src="/icons/instagram.png"
                alt=""
                width={20}
                height={20}
                className="object-cover object-center select-none"
                draggable="false"
              />
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
