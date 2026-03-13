import Header from "@/components/Header";
import PageFadeIn from "@/components/PageFadeIn";
import AdminFab from "../diary/AdminFab";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="relative max-w-6xl mx-auto px-6 py-10 min-h-screen w-full">
        <div className="mt-16 w-full">
          <PageFadeIn />
          {children}
          <AdminFab href="/gallery/new">+ 画像を追加</AdminFab>
        </div>
      </div>
    </div>
  );
}
