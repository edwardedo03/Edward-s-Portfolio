"use client";

import { useEffect, useState, type ReactNode } from "react";

type ProjectImageProps = {
  imageUrl: string;
  alt: string;
  className: string;
  children?: ReactNode;
};

export default function ProjectImage({
  imageUrl,
  alt,
  className,
  children,
}: ProjectImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={`Perbesar gambar: ${alt}`}
        onClick={() => setIsOpen(true)}
        className={`group relative block w-full overflow-hidden text-left hover:opacity-75 ${className}`}
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {children}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Tutup pratinjau gambar"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full cursor-zoom-out bg-black/85"
          />
          <div className="relative z-10 flex max-h-full max-w-full flex-col items-end gap-3">
            <button
              type="button"
              autoFocus
              aria-label="Tutup pratinjau gambar"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg"
            >
              ×
            </button>
            <div
              role="img"
              aria-label={alt}
              className="h-[min(78vh,900px)] w-[min(92vw,1400px)] rounded-xl bg-contain bg-center bg-no-repeat shadow-2xl"
              style={{ backgroundImage: `url("${imageUrl}")` }}
            />
            <p className="max-w-full text-right text-sm text-white/80">{alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
