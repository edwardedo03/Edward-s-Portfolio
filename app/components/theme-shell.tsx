"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

type ThemeShellProps = {
  currentPage: string;
  children: ReactNode;
};

export default function ThemeShell({ currentPage, children }: ThemeShellProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navList = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/portfolio" },
    { name: "Certificates", href: "/certificate" },
  ];

  useEffect(() => {
    setIsDarkTheme(window.localStorage.getItem("portfolio-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkTheme;
    setIsDarkTheme(nextTheme);
    window.localStorage.setItem(
      "portfolio-theme",
      nextTheme ? "dark" : "light",
    );
  };

  return (
    <main
      data-theme={isDarkTheme ? "dark" : "light"}
      className="theme-page min-h-screen"
    >
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight"
        >
          Edward<span className="theme-accent-text">.</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-md theme-muted transition-colors duration-300 sm:flex px-2 sm:px-3">
            {navList
              .filter((nav) => nav.name !== currentPage)
              .map((nav) => (
                <Link
                  key={nav.name}
                  href={nav.href}
                  className={`transition theme-hover ${
                    currentPage === nav.name ? "font-semibold" : ""
                  }`}
                >
                  {nav.name}
                </Link>
              ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkTheme ? "Aktifkan tema terang" : "Aktifkan tema gelap"
            }
            aria-pressed={isDarkTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border theme-border theme-toggle transition hover:scale-105"
            title={isDarkTheme ? "Light Mode" : "Dark Mode"}
          >
            <span aria-hidden="true">{isDarkTheme ? "☀" : "☾"}</span>
          </button>
        </div>
      </header>
      {children}
    </main>
  );
}
