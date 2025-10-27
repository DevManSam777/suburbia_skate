import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import { InteractiveSkateboard } from "./InteractiveSkateboard";
import { HeroSlice } from "@/data/homepage";
import Link from "next/link";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";

/**
 * Props for `Hero`.
 */
export type HeroProps = {
  slice: HeroSlice;
};

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const deckTextureURL =
    slice.skateboard_deck_texture?.url || DEFAULT_DECK_TEXTURE;
  const wheelTextureURL =
    slice.skateboard_wheel_texture?.url || DEFAULT_WHEEL_TEXTURE;
  const truckColor =
    slice.skateboard_truck_color || DEFAULT_TRUCK_COLOR;
  const boltColor = slice.skateboard_bolt_color || DEFAULT_BOLT_COLOR;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-3/4 mx-auto text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div>

      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading className="relative max-w-2xl place-self-start">
          {slice.heading}
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            {slice.body.map((paragraph, index) => {
              if (paragraph.emphasis) {
                const parts = paragraph.text.split(paragraph.emphasis);
                return (
                  <p key={index}>
                    {parts[0]}
                    <span className="font-black text-brand-orange">{paragraph.emphasis}</span>
                    {parts[1]}
                  </p>
                );
              }
              return <p key={index}>{paragraph.text}</p>;
            })}
          </div>
          <Link
            href={slice.button.url}
            className="z-20 mt-2 block inline-flex items-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-semibold text-zinc-900 transition-transform hover:scale-105"
          >
            {slice.button.text}
          </Link>
        </div>
      </div>

      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
      />
    </Bounded>
  );
};

export default Hero;
