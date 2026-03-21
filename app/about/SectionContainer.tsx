export default function SectionContainer({
  ref,
  children,
  isDesktop,
}: {
  ref: React.Ref<HTMLElement>;
  children: React.ReactNode;
  isDesktop: boolean;
}) {
  return (
    <section
      ref={ref}
      className={`relative w-screen ${isDesktop ? "h-screen px-10 xl:px-20" : "h-[800px] px-5"}  shrink-0 flex flex-col pt-40 gap-8`}
    >
      {children}
    </section>
  );
}
