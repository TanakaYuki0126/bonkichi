export default function FadeUpTextLine({
  i,
  children,
}: {
  i: number;
  children: React.ReactNode;
}) {
  return (
    <div className="fade-up-text" style={{ "--i": i } as React.CSSProperties}>
      {children}
    </div>
  );
}
