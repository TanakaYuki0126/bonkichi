"use client";

import Link from "next/link";

export default function LandingMenu() {
  return (
    <div className="inset-0 pointer-events-none bg-amber-50">
      <div className="fixed top-10 w-screen pointer-events-none">
        <p
          className="justify-center
          text-xl tracking-[0.3em] text-white text-center text-shadow-md"
        >
          Small Cabin, Big Journey
        </p>
      </div>
      <div className="fixed top-1/4 left-20 flex flex-col gap-5  pointer-events-none">
        <Link
          href="/blog"
          className="text-white pointer-events-auto
          text-md 
          text-shadow-2xs
font-light 
tracking-[0.3em] 
hover:tracking-[0.4em] 
transition-all 
duration-500
          "
        >
          Blog / 日誌
        </Link>
        <Link
          href="/blog"
          className="text-white pointer-events-auto
          text-md
          text-shadow-2xs
font-light 
tracking-[0.3em] 
hover:tracking-[0.4em] 
transition-all 
duration-500
          "
        >
          Photograph / 写真
        </Link>
        <Link
          href="/blog"
          className="text-white pointer-events-auto
          text-md
          text-shadow-2xs
font-light 
tracking-[0.3em] 
hover:tracking-[0.4em] 
transition-all 
duration-500
          "
        >
          About / 紹介
        </Link>
      </div>
    </div>
  );
}
