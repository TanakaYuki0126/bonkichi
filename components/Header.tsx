"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

function UnderlineLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  if (pathname === "/") return;
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 min-h-16 transition ${
        open ? "bg-white dark:bg-gray-800 opacity-90" : "pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between pointer-events-auto">
        <Link
          href="/"
          className="flex items-center text-lg hover:opacity-70 transition gap-1"
        >
          <Image
            alt="logo"
            width={50}
            height={50}
            src="/bonkichi.svg"
            className="logo"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <UnderlineLink href="/about">about / 紹介</UnderlineLink>
          <UnderlineLink href="/gallery">gallery / ギャラリー</UnderlineLink>
          <UnderlineLink href="/diary">diary / 日記</UnderlineLink>
          <UnderlineLink href="/contact">contact / 連絡</UnderlineLink>
          {session?.user ? (
            <button
              className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/diary" });
              }}
            >
              logout from {session?.user?.name}
            </button>
          ) : (
            <UnderlineLink href="/api/auth/signin">
              login / ログイン
            </UnderlineLink>
          )}
          <ThemeToggle />
        </nav>
        <button
          className="md:hidden pointer-events-auto"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="relative w-8 h-8">
            <span
              className={`absolute bg-gray-700 dark:bg-gray-200 left-0 top-1/2 h-0.5 w-8 transition-all duration-300 ${
                open ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute bg-gray-700 dark:bg-gray-200 left-0 top-1/2 h-0.5 w-8 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`absolute bg-gray-700 dark:bg-gray-200 left-0 top-1/2 h-0.5 w-8 transition-all duration-300 ${
                open ? "-rotate-45 translate-y-0 opacity-90" : "translate-y-2"
              }`}
            ></span>
          </div>
        </button>
      </div>
      {/* モバイル版 */}
      <nav
        className={`px-6 flex flex-col items-center gap-3 md:hidden h-dvh transition-opacity duration-300 ${
          open ? "touch-none" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: -50 }}
      >
        <UnderlineLink href="/about" onClick={() => setOpen(false)}>
          about / 紹介
        </UnderlineLink>
        <UnderlineLink href="/gallery" onClick={() => setOpen(false)}>
          gallery / ギャラリー
        </UnderlineLink>
        <UnderlineLink href="/diary" onClick={() => setOpen(false)}>
          diary / 日記
        </UnderlineLink>
        <UnderlineLink href="/gallery" onClick={() => setOpen(false)}>
          contact / 連絡
        </UnderlineLink>
        {session?.user ? (
          <UnderlineLink href="/api/auth/signin">
            logout from {session?.user?.name}
          </UnderlineLink>
        ) : (
          <UnderlineLink href="/api/auth/signin">
            login / ログイン
          </UnderlineLink>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
}
