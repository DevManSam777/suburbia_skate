import { FaStar } from "react-icons/fa6";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import clsx from "clsx";
import { Scribble } from "./Scribble";
import { skateboards } from "@/data/skateboards";
import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
};

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const SCRIBBLE_COLORS: Record<string, string> = {
  "oni-mask": "#f97316", // orange
  "pink-drop": "#ec4899", // pink
  "thank-you": "#ef4444", // red
  "yellow-black": "#eab308", // yellow
};

export function SkateboardProduct({ id }: Props) {
  const product = skateboards.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  const price = `$${(product.price / 100).toFixed(2)}`;
  const scribbleColor = SCRIBBLE_COLORS[id] || "#d6d3d1";

  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4 ">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <div className="flex items-center justify-between ~text-sm/2xl">
        <span>{price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400" /> {product.reviews}
        </span>
      </div>
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          className="absolute inset-0 h-full w-full"
          color={scribbleColor}
        />
        <Image
          src={product.image.url}
          alt={product.image.alt}
          width={150}
          height={150}
          className=" mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
        {product.name}
      </h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Link
          href={product.customizer_link.url}
          className="button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-base ~py-2/2.5 from-brand-orange to-brand-lime text-black"
        >
          {product.customizer_link.text}
        </Link>
      </div>
    </div>
  );
}
