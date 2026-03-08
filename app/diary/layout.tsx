import AdminFab from "./AdminFab";

export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white min-h-screen">
      {children}
      <AdminFab>+ 新規投稿</AdminFab>
    </div>
  );
}
