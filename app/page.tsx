"use client";

import supabase from "@/lib/supabase-client";
import Link from "next/link";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useEffect, useState } from "react";
import Image from "next/image";

type PersonalData = {
  id?: number | null;
  updated_at?: Timestamp | null;
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

const projects = [
  {
    number: "01",
    title: "Nama Proyek Pertama",
    category: "Web Development",
    year: "2025",
    description:
      "Tulis ringkasan singkat tentang masalah yang diselesaikan dan kontribusimu di proyek ini.",
  },
  {
    number: "02",
    title: "Nama Proyek Kedua",
    category: "UI / UX Design",
    year: "2024",
    description:
      "Ceritakan tujuan proyek, proses yang kamu jalani, dan hasil yang paling kamu banggakan.",
  },
  {
    number: "03",
    title: "Nama Proyek Ketiga",
    category: "Data & Research",
    year: "2024",
    description:
      "Tambahkan satu atau dua kalimat yang menjelaskan proyek ini dengan jelas.",
  },
];

const certificates = [
  {
    title: "Nama Sertifikat / Pelatihan",
    issuer: "Penyelenggara",
    year: "2025",
  },
  {
    title: "Nama Sertifikat / Pelatihan",
    issuer: "Penyelenggara",
    year: "2024",
  },
  {
    title: "Nama Sertifikat / Pelatihan",
    issuer: "Penyelenggara",
    year: "2024",
  },
];

export default function Home() {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [isLoadingPersonalData, setIsLoadingPersonalData] = useState(true);
  const [personalDataError, setPersonalDataError] = useState(false);
  const [isNavbarFloating, setIsNavbarFloating] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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
    const getPersonalData = async () => {
      const { data, error } = await supabase
        .from("personal_data")
        .select("*")
        .order("id_edward", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error getting personal information:", error);
        setPersonalDataError(true);
      } else {
        console.log("Personal data fetched:", data);
        setPersonalData((data as PersonalData | null) ?? null);
      }

      setIsLoadingPersonalData(false);
    };

    void getPersonalData();
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
          <Link className="transition theme-hover" href="/portfolio">
            Projects
          </Link>
          <Link className="transition theme-hover" href="/certificate">
            Certificates
          </Link>
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] theme-soft">
            {personalData?.image_path ? (
              <Image
                fill
                src={personalData?.image_path}
                alt=""
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover object-center select-none"
                draggable="false"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center theme-subtle">
                Loading...
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
        className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
              Some of my projects
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 theme-muted">Since 2024</p>
        </div>
        <div className="mt-10 divide-y theme-dividers border-y theme-border">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group grid gap-4 py-7 transition sm:grid-cols-[52px_1fr_auto] sm:items-start sm:gap-6"
            >
              <span className="pt-1 text-xs theme-subtle">
                {project.number}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <span className="text-xs theme-subtle">· {project.year}</span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 theme-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex h-32 items-center justify-center rounded-xl theme-soft text-xs uppercase tracking-[.16em] theme-subtle sm:h-40">
                  Area gambar proyek
                </div>
              </div>
              <span className="text-xs theme-accent-text sm:pt-2">
                {project.category}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section id="sertifikat" className="border-y theme-border theme-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">
              Sertifikat.
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 theme-muted">
              Pelatihan dan pencapaian yang mendukung perjalanan saya.
            </p>
          </div>
          <div className="divide-y theme-dividers border-y theme-border">
            {certificates.map((certificate, index) => (
              <article
                key={`${certificate.title}-${index}`}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div>
                  <h3 className="text-sm font-medium">{certificate.title}</h3>
                  <p className="mt-1 text-xs theme-subtle">
                    {certificate.issuer}
                  </p>
                </div>
                <span className="shrink-0 text-xs theme-subtle">
                  {certificate.year}
                </span>
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
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-.05em] sm:text-5xl">
              Punya ide menarik?
              <br />
              Mari ngobrol.
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
