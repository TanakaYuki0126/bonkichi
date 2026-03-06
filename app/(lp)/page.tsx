"use client";

import PageFade from "@/components/PageFade";
import { startExit } from "@/components/three/animate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LandingLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}) {
  return (
    <Link
      href={"/"}
      onClick={onClick}
      className="lp-links text-white pointer-events-auto
          text-md
          text-shadow-2xs
          font-light 
          tracking-[0.3em] 
          hover:tracking-[0.4em] 
          transition-all 
          duration-500
          "
    >
      {children}
    </Link>
  );
}

export default function Page() {
  const router = useRouter();
  const [fade, setFade] = useState(false);
  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    startExit();
    setTimeout(() => {
      setFade(true);
    }, 2000);
    setTimeout(() => {
      router.push(href);
    }, 2500);
  };
  return (
    <main>
      <PageFade active={fade} />
      <div id="landingMenu" className="inset-0  bg-amber-50">
        <div className="fixed top-10 w-screen title text-center">
          <Link
            href="/"
            className="justify-center
          text-xl tracking-[0.3em] text-white text-center text-shadow-md"
          >
            small cabin, big journey
          </Link>
        </div>
        <div className="fixed top-30 md:top-1/4 left-5 md:left-20 flex flex-col gap-5  pointer-events-none">
          <LandingLink onClick={handleClick("/about")}>
            about / 紹介
          </LandingLink>
          <LandingLink onClick={handleClick("diary")}>diary / 日誌</LandingLink>
          <LandingLink onClick={handleClick("/gallery")}>
            gallery / 写真
          </LandingLink>
          <LandingLink onClick={handleClick("/contact")}>
            contact / 連絡
          </LandingLink>
        </div>
      </div>
    </main>
  );
}
