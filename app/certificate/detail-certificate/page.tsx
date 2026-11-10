import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeShell from "@/app/components/theme-shell";
import { certificates } from "@/lib/portfolio-content";

type CertificateDetailPageProps = {
  searchParams: Promise<{ id?: string | string[] }>;
};

export default async function CertificateDetailPage({
  searchParams,
}: CertificateDetailPageProps) {
  const params = await searchParams;
  const certificateId = Array.isArray(params.id) ? params.id[0] : params.id;
  const certificate = certificates.find((item) => item.id === certificateId);

  if (!certificate) notFound();

  return (
    <ThemeShell backHref="/certificate" backLabel="Semua sertifikat">
      <article className="mx-auto max-w-5xl px-6 pb-20 pt-8 sm:px-10 sm:pb-28">
        <p className="text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
          Sertifikat & pencapaian
        </p>
        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            {certificate.title}
          </h1>
          <p className="shrink-0 text-sm theme-muted">{certificate.date}</p>
        </div>

        <div
          role="img"
          aria-label={`Foto sertifikat ${certificate.title}`}
          className="mt-10 flex aspect-[4/3] max-h-[620px] items-end overflow-hidden rounded-2xl theme-soft p-5 sm:aspect-[16/9]"
          style={{
            backgroundImage: `linear-gradient(180deg, transparent 62%, rgb(20 24 18 / 45%)), url("${certificate.image}")`,
            backgroundSize: "100% 100%, contain",
            backgroundPosition: "center, center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span className="rounded-full bg-black/25 px-3 py-1.5 text-xs text-white backdrop-blur">
            Foto sertifikat
          </span>
        </div>

        <div className="mt-10 grid gap-8 border-t theme-border pt-8 md:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[.16em] theme-subtle">
              Informasi
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="theme-subtle">Penyelenggara</dt>
                <dd className="mt-1 font-medium">{certificate.issuer}</dd>
              </div>
              <div>
                <dt className="theme-subtle">Tanggal</dt>
                <dd className="mt-1 font-medium">{certificate.date}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight">Deskripsi</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-8 theme-muted">
              {certificate.description}
            </p>
            <Link
              href="/certificate"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium theme-accent-text"
            >
              ← Kembali ke semua sertifikat
            </Link>
          </div>
        </div>
      </article>
    </ThemeShell>
  );
}
