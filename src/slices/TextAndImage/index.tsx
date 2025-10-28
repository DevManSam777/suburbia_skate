import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { ParallaxImage } from "./ParallaxImage";
import { TextAndImageSlice } from "@/data/homepage";
import Link from "next/link";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = {
  slice: TextAndImageSlice;
  index: number;
};

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage = ({ slice, index }: TextAndImageProps): JSX.Element => {
  const theme = slice.theme;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)] min-h-screen flex items-center relative z-10",
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white",
        theme === "Lime" && "bg-texture bg-brand-lime"
      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <SlideIn delay={0}>
            <Heading size="lg" as="h2" className="break-words hyphens-auto ~text-3xl/7xl">
              {slice.heading}
            </Heading>
          </SlideIn>
          <SlideIn delay={0.2}>
            <div className="max-w-md text-lg leading-relaxed">
              {slice.body.map((paragraph, index) => (
                <p key={index}>{paragraph.text}</p>
              ))}
            </div>
          </SlideIn>
          <SlideIn delay={0.4}>
            <Link
              href={slice.button.url}
              className={clsx(
                "button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-lg ~py-2.5/3",
                theme === "Lime"
                  ? "from-brand-purple to-brand-orange text-white"
                  : theme === "Orange"
                  ? "from-brand-blue to-brand-lime text-white"
                  : theme === "Navy"
                  ? "from-brand-lime to-brand-purple text-white"
                  : "from-brand-orange to-brand-lime text-black"
              )}
            >
              {slice.button.text}
            </Link>
          </SlideIn>
        </div>

        <ParallaxImage
          foregroundImage={slice.foreground_image}
          backgroundImage={slice.background_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
