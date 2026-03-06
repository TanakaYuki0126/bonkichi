"use client";

import Link from "next/link";

function UnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className={`fixed top-0 left-0 w-full z-50`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-gray-900">
        <Link href="/" className="text-lg hover:opacity-70 transition">
          ぼんきち - small cabin, big journey -
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <UnderlineLink href="/about">about / 紹介</UnderlineLink>
          <UnderlineLink href="/diary">diary / 日誌</UnderlineLink>
          <UnderlineLink href="/gallery">gallery / ギャラリー</UnderlineLink>
          <UnderlineLink href="/gallery">contact / 連絡</UnderlineLink>
        </nav>
      </div>
    </header>
  );
}
