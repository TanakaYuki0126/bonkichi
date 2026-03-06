import Header from "@/components/Header";
import LandingMenu from "@/components/three/LandingMenu";
export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white min-h-screen">
      <Header />
      {children}
    </div>
  );
}
