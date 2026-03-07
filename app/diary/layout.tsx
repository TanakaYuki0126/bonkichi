import NewPostFab from "./NewPostFab";

export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white min-h-screen">
      {children}
      <NewPostFab />
    </div>
  );
}
