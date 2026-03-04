import LandingMenu from "@/components/three/LandingMenu";
export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-lime-900 h-screen">
      <LandingMenu />
      {children}
    </div>
  );
}
