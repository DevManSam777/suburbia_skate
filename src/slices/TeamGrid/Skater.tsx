"use client";

import { SkaterScribble } from "./SkaterScribble";
import clsx from "clsx";
import { Skater as SkaterType } from "@/data/skaters";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Props = {
  skater: SkaterType;
  index: number;
};

export function Skater({ skater, index }: Props) {
  const [showBio, setShowBio] = useState(false);

  const colors = [
    "text-brand-blue",
    "text-brand-lime",
    "text-brand-orange",
    "text-brand-pink",
    "text-brand-purple",
  ];

  const scribbleColor = colors[index];

  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div
        className="stack-layout overflow-hidden relative cursor-pointer"
        onClick={() => setShowBio(!showBio)}
      >
        <Image
          src={skater.photo_background.url}
          alt={skater.photo_background.alt}
          width={500}
          height={500}
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <SkaterScribble className={clsx("relative", scribbleColor)} />
        <Image
          src={skater.photo_foreground.url}
          alt={skater.photo_foreground.alt}
          width={500}
          height={500}
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.first_name}</span>
          <span className="block">{skater.last_name}</span>
        </h3>
        
        {/* Bio - Slides up on hover (desktop) or click/touch (mobile) */}
        <div className={clsx(
          "absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 pb-20",
          showBio ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
        )}>
          <p className="text-sm text-white/90 italic">
            {skater.bio}
          </p>
        </div>
      </div>
      <Link
        href={skater.customizer_link.url}
        className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-3 py-1.5 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105"
      >
        {skater.customizer_link.text}
      </Link>
    </div>
  );
}
