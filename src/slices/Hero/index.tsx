import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import { InteractiveSkateboard } from "./InteractiveSkateboard";
import { HeroSlice } from "@/data/homepage";
import Link from "next/link";
import { SkateboardIcon } from "@/components/SkateboardIcon";

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
            className="button-cutout group z-20 mt-2 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-4 px-2 ~text-lg/xl ~py-3/4 from-brand-orange to-brand-lime text-black"
          >
            <div className="flex ~size-6/8 items-center justify-center transition-transform group-hover:-rotate-[25deg]">
              <SkateboardIcon className="h-full w-full" />
            </div>
            <div className="w-px self-stretch bg-black/25" />
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
