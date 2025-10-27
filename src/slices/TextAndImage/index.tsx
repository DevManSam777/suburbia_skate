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
        "sticky top-[calc(var(--index)*2rem)]",
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
          <SlideIn>
            <Heading size="lg" as="h2">
              {slice.heading}
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              {slice.body.map((paragraph, index) => (
                <p key={index}>{paragraph.text}</p>
              ))}
            </div>
          </SlideIn>
          <SlideIn>
            <Link
              href={slice.button.url}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-105",
                theme === "Lime" ? "bg-brand-orange text-white" : "bg-brand-lime text-zinc-900"
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
