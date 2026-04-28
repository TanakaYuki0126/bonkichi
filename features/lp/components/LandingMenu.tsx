"use client";

import Link from "./LandingMenu.Link";
import NextLink from "next/link";

export default function LandingMenu() {
  return (
    <div id="landingMenu" className="inset-0  bg-amber-50">
      <div className="fixed top-10 w-screen title text-center">
        <NextLink
          href="/"
          className="justify-center
          text-xl tracking-[0.3em] text-white text-center text-shadow-md"
        >
          small cabin, slow journey
        </NextLink>
      </div>
      <div className="fixed top-30 md:top-1/4 left-5 md:left-20 flex flex-col gap-5  pointer-events-none">
        <Link href="/diary">about / 紹介</Link>
        <Link href="/diary">diary / 日記</Link>
        <Link href="/diary">gallery / 写真</Link>
        <Link href="/diary">items / アイテム</Link>
      </div>
    </div>
  );
}
