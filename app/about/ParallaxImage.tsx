import ParallaxImageDesktop from "./ParallaxImageDesktop";
import ParallaxImageMobile from "./ParallaxImageMobile";

export default function ParallaxImage({
  src,
  alt,
  isDesktop,
}: {
  src: string;
  alt: string;
  isDesktop: boolean;
}) {
  if (isDesktop) {
    return <ParallaxImageDesktop src={src} alt={alt} />;
  } else {
    return <ParallaxImageMobile src={src} alt={alt} />;
  }
}
