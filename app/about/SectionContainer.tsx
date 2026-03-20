export default function SectionContainer({
  ref,
  children,
}: {
  ref: React.Ref<HTMLElement>;
  children: React.ReactNode;
}) {
  return (
    <section
      ref={ref}
      className="relative w-screen h-screen h-dvh shrink-0 flex flex-col pt-40 px-5 lg:px-20 gap-8"
    >
      {children}
    </section>
  );
}
