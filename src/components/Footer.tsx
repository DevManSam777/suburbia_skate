import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";
import { settings } from "@/data/settings";

export function Footer() {
  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        <Image
          src={settings.footer_image.url}
          alt={settings.footer_image.alt}
          fill
          className="object-cover"
        />
        <FooterPhysics
          boardTextureURLs={settings.footer_skateboards}
          className="absolute inset-0 overflow-hidden"
        />
        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28" />
      </div>
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {settings.navigation.map((item) => (
            <li key={item.link.text} className="hover:underline">
              <Link href={item.link.url}>{item.link.text}</Link>
            </li>
          ))}
        </ul>
      </Bounded>
      {/* List of links */}
    </footer>
  );
}
