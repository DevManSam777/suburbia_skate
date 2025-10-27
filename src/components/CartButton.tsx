"use client";

import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="button-cutout group mx-4 inline-flex items-center gap-3 px-1 text-lg ~py-2.5/3 bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold text-white hover:text-black transition-[filter,background-position] duration-300 hover:bg-bottom"
      aria-label={`Cart (${totalItems})`}
    >
      <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg]">
        <FaCartShopping />
      </div>
      <div className="w-px self-stretch bg-black/25" />
      <span className="md:hidden">{totalItems}</span>
      <span className="hidden md:inline">Cart ({totalItems})</span>
    </Link>
  );
}
