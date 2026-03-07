import Header from "@/components/Header";
import PageFadeIn from "@/components/PageFadeIn";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageFadeIn />
      {children}
    </div>
  );
}
