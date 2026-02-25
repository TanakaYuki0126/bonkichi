import Link from "next/link";

export default function LandingLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      className="lp-links text-white pointer-events-none
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
