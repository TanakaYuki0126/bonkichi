import type { Metadata } from "next";
import ThreeCanvas from "@/components/three/ThreeCanvas";

export const metadata: Metadata = {
  title: "bonkichi",
  description: "bonkichi",
};

export default function LpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div
        id="introOverlay"
        className="flex justify-center fixed inset-0 bg-black z-50 pointer-events-none"
      >
        <p className="text-white text-center fixed top-1/2 text-xl tracking-[0.3em]">
          small cabin, big journey
        </p>
      </div>
      <ThreeCanvas />
      {children}
    </div>
  );
}
