import BonkichiModel from "./BonkichiModel";

export default function AboutPage() {
  return (
    <div className="relative max-w-2xl mx-auto px-6 py-10">
      <div className="mt-16">
        <h1 className="text-2xl mb-6 text-gray-700 text-center">
          about / 紹介
        </h1>
        <div className="w-full h-96">
          <BonkichiModel />
        </div>
      </div>
    </div>
  );
}
