"use client";

import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

import { useCustomizerControls } from "./context";
import { WheelOption, DeckOption, MetalOption } from "@/data/customizer";

type Props = {
  wheels: WheelOption[];
  decks: DeckOption[];
  metals: MetalOption[];
};

export default function Controls({ wheels, decks, metals }: Props) {
  const { selectedWheel, setWheel, selectedDeck, setDeck, selectedTruck, setTruck, selectedBolt, setBolt } = useCustomizerControls();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedWheel) params.set("wheel", selectedWheel.id);
    if (selectedDeck) params.set("deck", selectedDeck.id);
    if (selectedTruck) params.set("truck", selectedTruck.id);
    if (selectedBolt) params.set("bolt", selectedBolt.id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt, router, pathname, searchParams]);

  return (
    <>
      <Options
        title="Deck"
        selected={selectedDeck?.name}
        options={decks.map((deck) => (
          <Option
            key={deck.id}
            name={deck.name}
            image={deck.texture}
            selected={selectedDeck?.id === deck.id}
            onClick={() => setDeck(deck)}
          />
        ))}
      />
      <Options
        title="Wheels"
        selected={selectedWheel?.name}
        options={wheels.map((wheel) => (
          <Option
            key={wheel.id}
            name={wheel.name}
            image={wheel.texture}
            selected={selectedWheel?.id === wheel.id}
            onClick={() => setWheel(wheel)}
          />
        ))}
      />
      <Options
        title="Trucks"
        selected={selectedTruck?.name}
        options={metals.map((metal) => (
          <Option
            key={metal.id}
            name={metal.name}
            color={metal.color}
            selected={selectedTruck?.id === metal.id}
            onClick={() => setTruck(metal)}
          />
        ))}
      />
      <Options
        title="Bolts"
        selected={selectedBolt?.name}
        options={metals.map((metal) => (
          <Option
            key={metal.id}
            name={metal.name}
            color={metal.color}
            selected={selectedBolt?.id === metal.id}
            onClick={() => setBolt(metal)}
          />
        ))}
      />
    </>
  );
}

function Options({
  title,
  selected,
  options,
}: {
  title: string;
  selected?: string;
  options: JSX.Element[];
}) {
  const selectedFormatted = selected
    ?.split(" ")
    .map((word) => word.toLowerCase())
    .join(" ");

  return (
    <div>
      <div className="flex">
        <h2 className="font-sans uppercase ~text-lg/xl mb-2">{title}</h2>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {selectedFormatted}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{options}</ul>
    </div>
  );
}

type OptionImageProps = {
  name: string;
  image: { url: string; alt: string };
  selected: boolean;
  onClick: () => void;
  color?: never;
};

type OptionColorProps = {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
  image?: never;
};

type OptionProps = OptionImageProps | OptionColorProps;

function Option({ name, image, color, selected, onClick }: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline"
        )}
        onClick={onClick}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            width={150}
            height={150}
            className="pointer-events-none h-full w-full rounded-full"
          />
        )}
        {color && (
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="sr-only">{name}</span>
      </button>
    </li>
  );
}
