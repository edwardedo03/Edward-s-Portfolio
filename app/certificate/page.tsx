import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import ThemeShell from "@/app/components/theme-shell";
import { getCertificates } from "@/lib/database";
import { formatCertificateDate } from "@/lib/portfolio-content";

export default function CertificatesPage() {
  return (
    <ThemeShell currentPage="Certificates">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:px-10 sm:pb-28">
        <p className="text-xs font-medium uppercase tracking-[.2em] theme-accent-text">
          Pembelajaran & pencapaian
        </p>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h1 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            Sertifikat
          </h1>
          <p className="max-w-md text-sm leading-6 theme-muted">
            Daftar sertifikat dan pelatihan yang telah saya selesaikan.
          </p>
        </div>
        <Suspense
          fallback={
            <CertificateListMessage>
              Loading certificates...
            </CertificateListMessage>
          }
        >
          <CertificateCards />
        </Suspense>
      </section>
    </ThemeShell>
  );
}

function CertificateListMessage({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-10 rounded-2xl border theme-border p-6 text-sm theme-muted"
      role="status"
    >
      {children}
    </p>
  );
}

async function CertificateCards() {
  let certificates: Awaited<ReturnType<typeof getCertificates>>;

  try {
    certificates = await getCertificates();
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return (
      <CertificateListMessage>
        Sertifikat belum dapat dimuat.
      </CertificateListMessage>
    );
  }

  if (certificates.length === 0) {
    return (
      <CertificateListMessage>
        Belum ada sertifikat untuk ditampilkan.
      </CertificateListMessage>
    );
  }

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((certificate, index) => {
        const title = certificate.certificate_name || "Certificate title";

        return (
          <Link
            key={certificate.id ?? `certificate-${index}`}
            href={`/certificate/detail-certificate?id=${encodeURIComponent(String(certificate.id))}`}
            className="group overflow-hidden rounded-2xl border theme-border theme-surface transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              role="img"
              aria-label={`Foto ${title}`}
              className="relative flex aspect-[4/3] items-end overflow-hidden theme-soft p-5"
              style={{
                backgroundImage: certificate.image_url
                  ? `linear-gradient(180deg, transparent 48%, rgb(20 24 18 / 42%)), url("${certificate.image_url}")`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="text-xs font-medium uppercase tracking-[.16em] text-white/90">
                Certificate
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium tracking-tight">{title}</h2>
                <span className="theme-accent-text transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>
              <p className="mt-2 text-sm theme-muted">
                {certificate.certificate_authority || "Certificate authority"}
              </p>
              <p className="mt-5 border-t theme-border pt-4 text-xs theme-subtle">
                {formatCertificateDate(certificate.date_obtained)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
