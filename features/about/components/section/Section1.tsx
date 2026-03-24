import FadeUpTextLine from "../text/FadeUpTextLine";
import MobileTitle from "../text/MobileTitle";
import SectionContainer from "./SectionContainer";
import TopImage from "../image/TopImage";

export default function Section1({
  isDesktop,
  ref,
}: {
  isDesktop: boolean;
  ref: React.Ref<HTMLElement>;
}) {
  return (
    <SectionContainer isDesktop={isDesktop} ref={ref}>
      {!isDesktop && <MobileTitle index={0} />}
      <div className="flex flex-col gap-4 z-40">
        <FadeUpTextLine i={0}>
          <p
            className="underline-grow"
            style={{ "--delay": 3.5 } as React.CSSProperties}
          >
            ぼんきち = 「ボンゴトラックと背中に乗せた秘密基地」
          </p>
        </FadeUpTextLine>
        <FadeUpTextLine i={1}>ハンドメイドの旅する小屋です。</FadeUpTextLine>
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
    </SectionContainer>
  );
}
