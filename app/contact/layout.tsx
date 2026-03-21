export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-blob-paper bg-noise-overlay">
      {children}
    </div>
  );
}
