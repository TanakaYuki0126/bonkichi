import Header from "@/components/Header";
import Link from "next/link";
import NewPostFab from "./NewPostFab";
export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white min-h-screen">
      <Header />
      {children}
      <NewPostFab />
    </div>
  );
}
