"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import BonkichiModel from "./BonkichiModel";
import ScrollText from "./ScrollText";

export default function ScrollScene() {
  const progress = useScrollProgress();
  return (
    <div className="w-screen h-screen sticky top-0 flex items-center">
      <div className="w-full mx-auto">
        <div className="h-[500px] w-full">
          <BonkichiModel progress={progress} />
          <div className="absolute top-1/4 right-1/4">
            <ScrollText
              progress={progress}
              fadeInStart={0.1}
              fadeInEnd={0.15}
              fadeOutStart={0.3}
              fadeOutEnd={0.35}
            >
              <h2 className="text-4xl font-bold">モバイルハウス</h2>
              <p>=木製キャンピングカー</p>
            </ScrollText>
          </div>
          <div className="absolute top-1/4 left-1/4">
            <ScrollText
              progress={progress}
              fadeInStart={0.6}
              fadeInEnd={0.65}
              fadeOutStart={0.8}
              fadeOutEnd={0.85}
            >
              <h2 className="text-4xl font-bold">モバイルハウス</h2>
              <p>木製キャンピングカー</p>
            </ScrollText>
          </div>
          {/* こだわりポイント */}
          {/* 電源システム(ソーラー、ポータブル電源、USB/コンセント) */}
          {/* 外見(ウッドロングエコ、押縁仕上げ、ドア、) */}
          <p>{progress}</p>
        </div>
      </div>
    </div>
  );
}
