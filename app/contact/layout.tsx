export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-white min-h-screen h-dvh bg-blob-paper bg-noise-overlay">
      {children}
    </div>
  );
}
