import ScrollScene from "./ScrollScene";
import ScrollSections from "./ScrollSections";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      {/* <section className="min-h-screen flex flex-col items-center text-center gap-6 bg-slate-300 pt-20">
        <p className="text-center w-full text-lg text-gray-600">
          ボンゴトラックと背中に乗せた秘密基地
        </p>
        <h1 className="text-center tracking-wider text-6xl">BONKICHI</h1>
      </section> */}
      <ScrollSections />
    </div>
  );
}
