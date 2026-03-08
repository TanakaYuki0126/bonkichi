import Header from "@/components/Header";
import PageFadeIn from "@/components/PageFadeIn";
import AdminFab from "../diary/AdminFab";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageFadeIn />
      {children}
      <AdminFab href="/gallery/new">+ 画像を追加</AdminFab>
    </div>
  );
}
