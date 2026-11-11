import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeShell from "@/app/components/theme-shell";
import ProjectImage from "@/app/components/project-image";
import { getCertificates } from "@/lib/database";
import { formatCertificateDate } from "@/lib/portfolio-content";

type CertificateDetailPageProps = {
  searchParams: Promise<{ id?: string | string[] }>;
};

export default function CertificateDetailPage({
  searchParams,
}: CertificateDetailPageProps) {
  return (
    <ThemeShell currentPage="Certificates">
      <Suspense
        fallback={
          <p className="mx-auto max-w-5xl px-6 py-20 text-sm theme-muted">
            Loading certificate...
          </p>
        }
      >
        <CertificateDetails searchParams={searchParams} />
      </Suspense>
    </ThemeShell>
  );
}

async function CertificateDetails({
  searchParams,
}: CertificateDetailPageProps) {
  const params = await searchParams;
  const certificateId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!certificateId) notFound();

  let certificates: Awaited<ReturnType<typeof getCertificates>>;

  try {
    certificates = await getCertificates();
  } catch (error) {
    console.error("Failed to fetch certificate details:", error);
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-sm theme-muted">
        <p>Sertifikat belum dapat dimuat.</p>
        <Link
          href="/certificate"
          className="mt-5 inline-flex theme-accent-text"
        >
          Kembali ke semua sertifikat
        </Link>
      </div>
    );
  }

  const certificate = certificates.find(
    (item) => String(item.id) === certificateId,
  );
  if (!certificate) notFound();

  const title = certificate.certificate_name || "Certificate title";
  const obtainedDate = formatCertificateDate(certificate.date_obtained);

  return (
    <article className="mx-auto max-w-5xl px-6 pb-20 pt-8 sm:px-10 sm:pb-28">
      <p className="text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
        Sertifikat & pencapaian
      </p>
      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
          {title}
        </h1>
        <p className="shrink-0 text-sm theme-muted">{obtainedDate}</p>
      </div>

      {certificate.image_url ? (
        <ProjectImage
          imageUrl={certificate.image_url}
          alt={`Foto sertifikat ${title}`}
          className="mt-10 aspect-[16/9] rounded-2xl theme-soft p-5"
        >
          <span className="rounded-full bg-black/25 px-3 py-1.5 text-xs text-white backdrop-blur">
            Klik untuk memperbesar
          </span>
        </ProjectImage>
      ) : (
        <div className="mt-10 flex aspect-[16/9] items-center justify-center rounded-2xl theme-soft text-sm theme-subtle">
          Certificate image unavailable
        </div>
      )}

      <div className="mt-10 grid gap-8 border-t theme-border pt-8 md:grid-cols-[.65fr_1.35fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[.16em] theme-subtle">
            Informasi sertifikat
          </p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="theme-subtle">Penyelenggara</dt>
              <dd className="mt-1 font-medium">
                {certificate.certificate_authority || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="theme-subtle">Kategori</dt>
              <dd className="mt-1 font-medium">
                {certificate.category || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="theme-subtle">Tanggal diperoleh</dt>
              <dd className="mt-1 font-medium">{obtainedDate}</dd>
            </div>
          </dl>

          {certificate.credential_url && (
            <a
              href={certificate.credential_url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full theme-action px-4 py-2.5 text-sm font-medium"
            >
              Lihat credential <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div>
          <h2 className="text-xl font-medium tracking-tight">Sertifikat</h2>
          <p className="mt-4 text-base leading-8 theme-muted">
            Sertifikat ini diberikan oleh{" "}
            {certificate.certificate_authority || "penyelenggara"}
            {certificate.category
              ? ` untuk bidang ${certificate.category}.`
              : "."}
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
  );
}
