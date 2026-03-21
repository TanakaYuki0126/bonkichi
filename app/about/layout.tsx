import PageFadeIn from "@/components/PageFadeIn";
import { ScrollProvider } from "@/contexts/ScrollContext";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageFadeIn />
      <ScrollProvider>{children}</ScrollProvider>
    </div>
  );
}
