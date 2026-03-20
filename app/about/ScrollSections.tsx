"use client";

import { useEffect, useRef, useState } from "react";
import BonkichiModel from "./BonkichiModel";
import ProgressBar from "./ProgressBar";
import { useScroll } from "@/contexts/ScrollContext";
import StickyTitle from "./StickyTitle";
import DescriptionContent from "./DescriptionContent";
import TopImage from "./TopImage";
import FloatingImage from "./FloatingImage";
import FadeUpTextLine from "./FadeUpTextLine";
import SectionDivider from "./SectionDivider";
import TopImageMobile from "./TopImageMobile";
import MobileTitle from "./MobileTitle";
import ParallaxImage from "./ParallaxImage";

//スクロール位置から現在のセクションのインデックスを判別
//x: 今横にどれだけ進んでいるか
function findActiveIndex(offsets: number[], x: number) {
  //画面中央が全体座標のどこを指しているか
  const target = x + window.innerWidth * 0.3;

  let lo = 0;
  let hi = offsets.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid] <= target) lo = mid + 1;
    else hi = mid - 1;
  }
  //hiはoffsets[hi] <= targetを満たす最大のhi
  return Math.max(0, Math.min(offsets.length - 1, hi));
}

export default function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const offsetsRef = useRef<number[]>([]);
  const { subscribe } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const calcHeight = () => {
      const scrollWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const horizontalScrollDistance = scrollWidth - viewportWidth;
      const totalHeight = horizontalScrollDistance + window.innerHeight;
      setScrollHeight(totalHeight);
    };
    const observer = new ResizeObserver(calcHeight);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    return subscribe(({ smoothedScrollY }) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.transform = `translate3d(-${smoothedScrollY}px, 0, 0)`;
    });
  }, [isDesktop, subscribe]);

  useEffect(() => {
    if (!isDesktop) return;
    //各セクションの左端の位置(offsetLeft)を計測
    const measure = () => {
      offsetsRef.current = itemRefs.current
        .filter(Boolean)
        .map((el) => (el as HTMLElement).offsetLeft)
        .sort((a, b) => a - b);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    //前フレームと同じならstate更新しないためのガード
    let last = -1;
    return subscribe(({ smoothedScrollY }) => {
      const offsets = offsetsRef.current;
      if (offsets.length === 0) return;
      const idx = findActiveIndex(offsets, smoothedScrollY);
      if (idx !== last) {
        last = idx;
        setActiveIndex(idx);
      }
    });
  }, [isDesktop, subscribe]);

  return (
    <div style={{ height: isDesktop ? scrollHeight : "" }}>
      <div
        className={
          isDesktop
            ? "sticky top-0 h-screen overflow-hidden bg-blob-paper bg-noise-overlay"
            : "bg-blob-paper bg-noise-overlay"
        }
      >
        <ProgressBar />
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* <BonkichiModel /> */}
        </div>
        {isDesktop && <StickyTitle activeIndex={activeIndex} />}
        <div
          ref={containerRef}
          className={`flex h-full ${isDesktop ? "flex-row" : "flex-col"}`}
        >
          {/* Concept */}
          <section
            ref={(el) => {
              itemRefs.current[0] = el;
            }}
            className="relative w-screen h-screen shrink-0 flex pt-40 px-10 xl:px-20"
          >
            {!isDesktop && <MobileTitle index={0} />}
            <div className="flex flex-col gap-4">
              <FadeUpTextLine i={0}>
                <p
                  className="underline-grow"
                  style={{ "--delay": 3.5 } as React.CSSProperties}
                >
                  ぼんきち = 「ボンゴトラックと背中に乗せた秘密基地」
                </p>
              </FadeUpTextLine>
              <FadeUpTextLine i={1}>
                ハンドメイドの旅する小屋です。
              </FadeUpTextLine>
              <br />
              <FadeUpTextLine i={2}>
                キャンピングカーで日本全国を旅したいと思っていました。
              </FadeUpTextLine>
              <FadeUpTextLine i={3}>
                既製品のキャンピングカーを買えば、間違いなく快適だと思いますが、
              </FadeUpTextLine>
              <FadeUpTextLine i={4}>
                もう少しオリジナルな、手作り感のある旅をしたいなと思っていました。
              </FadeUpTextLine>
              <br />
              <FadeUpTextLine i={5}>
                そこで知ったのが「モバイルハウス」。
              </FadeUpTextLine>
              <FadeUpTextLine i={6}>
                これぞ、思い描いていたものだ！ということで
              </FadeUpTextLine>
              <FadeUpTextLine i={7}>
                たくさんの人たちに協力してもらい、形にすることができました。
              </FadeUpTextLine>
            </div>
            {isDesktop && <TopImage />}
          </section>
          {!isDesktop && <TopImageMobile />}
          {/* Design */}
          {isDesktop && <SectionDivider>DESIGN</SectionDivider>}
          <section
            ref={(el) => {
              itemRefs.current[4] = el;
            }}
            className="relative w-screen h-screen shrink-0 flex pt-40 px-20 gap-10 text-sm"
          >
            {!isDesktop && <MobileTitle index={1} />}
            <DescriptionContent title="外壁">
              <p>杉板の縦張り、押縁仕上げを選びました。</p>
              <p>
                光の当たりぐあいによって変わる、立体的な表情を見せてくれます。
              </p>
              <p>
                自然な木の風合いを残し、経年変化を楽しむため天然素材を使った木材防護材「ウッドロングエコ」で塗装しました。
              </p>
            </DescriptionContent>
            <DescriptionContent title="屋根">
              <p>雨が溜まらないように、アーチの屋根にしました。</p>
              <p>ガルバリウム鋼板をオリジナルのカラーに塗装しました。</p>
            </DescriptionContent>
            <DescriptionContent title="玄関ポーチ">
              <p>アーチの屋根に合わせてドアもアーチにしてみました。</p>
              <p>小さなポーチを設けています。</p>
              <p>夜にはダウンライトの温かい光が灯ります。</p>
            </DescriptionContent>
          </section>
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/photo_sample_1.jpg"
            alt="photo_1"
          />
          {/* Living */}
          {isDesktop && <SectionDivider>LIVING</SectionDivider>}
          <section
            ref={(el) => {
              itemRefs.current[1] = el;
            }}
            className="relative w-screen h-screen shrink-0 flex pt-40 px-20 gap-10 text-sm"
          >
            {!isDesktop && <MobileTitle index={2} />}
            <DescriptionContent title="キッチン">
              <p>最大20Lの水を使えるシンクを作りました。</p>
              <p>
                引き出しは走行時に開いてしまわないよう、プッシュオープン型を採用。
              </p>
              <p>
                収納スペースが限られている中、キッチンの引き出しが大事な収納場所になっています。
              </p>
            </DescriptionContent>
            <DescriptionContent title="ソファ・ベッド">
              <p>
                普段はソファとして、就寝時は引き出してベッドとして使用できます。
              </p>
              <p>3分割で引き出すことができ、座るときに</p>
              <p>座面下には収納スペースがあります。</p>
            </DescriptionContent>
            <DescriptionContent title="テーブル">
              <p>食事や仕事の時は、拡張テーブルを取り付け可能。</p>
              <p>ソファに座って使うのにちょうど良い位置に設置できます。</p>
              <p>取り付けは少し手間ですが、、</p>
            </DescriptionContent>
          </section>
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/photo_sample_2.jpg"
            alt="photo_2"
          />
          {/* Off-grid */}
          {isDesktop && <SectionDivider>OFF GRID</SectionDivider>}
          <section
            ref={(el) => {
              itemRefs.current[2] = el;
            }}
            className="relative w-screen h-screen shrink-0 flex pt-40 px-20 gap-10 text-sm"
          >
            {!isDesktop && <MobileTitle index={3} />}
            <DescriptionContent title="ポータブル電源">
              <p>
                安全性が高いとされる半個体電池を使用したポータブル電源を採用。
              </p>
              <p>
                メインバッテリーと拡張バッテリーで合計5330Whと十分な容量があります。
              </p>
              <p>
                キッチンの一番下に収納しており、普段はUSBポート、コンセントを延長して使えるようにしています。
              </p>
            </DescriptionContent>
            <DescriptionContent title="ソーラーパネル">
              <p>
                ポータブル電源の充電には屋根に取り付けた400Wのソーラーパネルを使用します。
              </p>
              <p>
                フレキシブルタイプのソーラーパネルなので、アーチ屋根にフィットして取り付けられました。
              </p>
            </DescriptionContent>
          </section>
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/photo_sample_3.jpg"
            alt="photo_3"
          />
          {/* Confort */}
          {isDesktop && <SectionDivider>CONFORT</SectionDivider>}
          <section
            ref={(el) => {
              itemRefs.current[3] = el;
            }}
            className="relative w-screen h-screen shrink-0 flex pt-40 px-20 gap-10 text-sm"
          >
            {!isDesktop && <MobileTitle index={4} />}
            <DescriptionContent title="壁断熱">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p>
                    壁には30mmのスタイロフォームを詰め、できるだけ断熱されるようにしました。
                  </p>
                  <p>これで少しは快適になっているでしょうか？</p>
                </div>
                <div>
                  <FloatingImage />
                </div>
              </div>
            </DescriptionContent>
            <DescriptionContent title="薪ストーブ">
              <p>寒い日には薪ストーブを焚くこともできます。</p>
              <p>
                屋外で焚き火も良いですが、室内で炎を眺めるのもまた良いものです。
              </p>
            </DescriptionContent>
            <DescriptionContent title="クーラー">
              <p>
                12Vクーラーを設置しており、暑くて我慢できないときには使用可能。
              </p>
              <p>
                ポータブル電源の出力をDCに変換して電源とするシステムを作成してもらいました。
              </p>
              <p>目立たないように収納と一体化させています。</p>
            </DescriptionContent>
          </section>
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/photo_sample_4.jpg"
            alt="photo_4"
          />
          {/* Base & Mobility */}
          {isDesktop && <SectionDivider>BASE & MOBILITY</SectionDivider>}
          <section
            ref={(el) => {
              itemRefs.current[5] = el;
            }}
            className="relative w-screen h-screen shrink-0 flex pt-40 px-20 gap-10 text-sm"
          >
            {!isDesktop && <MobileTitle index={5} />}
            <DescriptionContent title="ベース車両">
              <p>マツダ ボンゴトラックをベース車両として採用。</p>
              <p>最大積載量1,000kg / ダブルタイヤ / ロングボディ。</p>
            </DescriptionContent>
            <DescriptionContent title="バックカメラ">
              <p>
                バックカメラを玄関上部に取付け、リアミラー型ドライブレコーダーで表示。
              </p>
              <p>
                バックカメラの予備と、左折時の死角をなくすことを目的に、さらに3つのカメラでモニターしています。
              </p>
            </DescriptionContent>
          </section>
        </div>
      </div>
    </div>
  );
}
