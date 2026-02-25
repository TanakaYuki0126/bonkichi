import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ThreeCanvas from "@/components/three/ThreeCanvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bonkichi",
  description: "bonkichi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
