import AdminFab from "../../components/AdminFab";

export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white min-h-screen bg-blob-paper bg-noise-overlay">
      {children}
      <AdminFab href="/diary/new">+ 新規投稿</AdminFab>
    </div>
  );
}
