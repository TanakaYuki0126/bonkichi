"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/public/bonkichi.svg";
import Image from "next/image";

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
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        open ? "bg-white opacity-90" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-gray-700">
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
          <UnderlineLink href="/gallery">contact / 連絡</UnderlineLink>
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
        </nav>
        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
          <div className="relative w-8 h-8">
            <span
              className={`absolute bg-gray-700 left-0 top-1/2 h-0.5 w-8 transition-all duration-300 ${
                open ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute bg-gray-700 left-0 top-1/2 h-0.5 w-8 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`absolute bg-gray-700 left-0 top-1/2 h-0.5 w-8 transition-all duration-300 ${
                open ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </div>
        </button>
      </div>
      <nav
        className={`px-6 flex flex-col items-center gap-3 md:hidden  bg-white h-screen  transition-opacity duration-300 ${
          open ? "opacity-90" : "opacity-0 pointer-events-none"
        }`}
      >
        <UnderlineLink href="/about">about / 紹介</UnderlineLink>
        <UnderlineLink href="/gallery">gallery / ギャラリー</UnderlineLink>
        <UnderlineLink href="/diary">diary / 日記</UnderlineLink>
        <UnderlineLink href="/gallery">contact / 連絡</UnderlineLink>
        {session?.user ? (
          <UnderlineLink href="/api/auth/signin">
            logout from {session?.user?.name}
          </UnderlineLink>
        ) : (
          <UnderlineLink href="/api/auth/signin">
            login / ログイン
          </UnderlineLink>
        )}
      </nav>
    </header>
  );
}
