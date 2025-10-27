"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { settings } from "@/data/settings";
import { CartButton } from "./CartButton";
import { FaBars, FaXmark } from "react-icons/fa6";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const firstName = user?.firstName || user?.username || "there";
  
  // Don't show header on build page - it has its own logo
  if (pathname === '/build') {
    return null;
  }
  
  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto w-full max-w-6xl">
        {/* Top Row: Logo (Mobile) or Logo + Nav + Auth/Cart (Desktop) */}
        <div className="flex items-center justify-between md:grid md:grid-cols-[1fr,auto,1fr] md:gap-6">
          <Link href="/" className="flex-shrink-0">
            <Logo className="text-brand-purple ~h-12/20" />
          </Link>

          {/* Desktop Navigation - Center Column */}
          <nav
            aria-label="Main"
            className="hidden md:flex"
          >
            <ul className="flex flex-wrap items-center justify-center gap-8">
              {settings.navigation.map((item) => (
                <li key={item.link.text}>
                  <Link
                    href={item.link.url}
                    className="text-base md:text-lg hover:text-brand-purple transition-colors"
                    scroll={true}
                  >
                    {item.link.text}
                  </Link>
                </li>
              ))}
              <SignedIn>
                <li>
                  <Link
                    href="/account"
                    className="text-base md:text-lg hover:text-brand-purple transition-colors"
                    title="View Account"
                  >
                    Hi,&nbsp;{firstName}
                  </Link>
                </li>
              </SignedIn>
            </ul>
          </nav>

          {/* Right Side: Auth + Cart (Desktop) or Cart + Burger (Mobile) */}
          <div className="flex items-center gap-2 justify-self-end">
            {/* Desktop Auth Buttons */}
            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden md:inline-flex button-cutout group items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-2 md:gap-3 px-1 text-sm md:text-lg ~py-2.5/3 from-brand-orange to-brand-lime text-black mr-4"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <button className="hidden md:inline-flex button-cutout group items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-2 md:gap-3 px-1 text-sm md:text-lg ~py-2.5/3 from-brand-orange to-brand-lime text-black mr-4">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>

            <CartButton />

            {/* Burger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl hover:text-brand-purple transition-colors ml-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav
            className="md:hidden bg-brand-gray rounded-lg shadow-lg p-6 mt-4"
            aria-label="Mobile menu"
          >
            <ul className="flex flex-col gap-4">
              {settings.navigation.map((item) => (
                <li key={item.link.text}>
                  <Link
                    href={item.link.url}
                    className="text-lg hover:text-brand-purple transition-colors block py-2"
                    scroll={true}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.link.text}
                  </Link>
                </li>
              ))}
              <SignedIn>
                <li>
                  <Link
                    href="/account"
                    className="text-lg hover:text-brand-purple transition-colors block py-2"
                    title="View Account"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hi,&nbsp;{firstName}
                  </Link>
                </li>
              </SignedIn>
              <SignedOut>
                <li>
                  <Link
                    href="/sign-in"
                    className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg py-3 from-brand-orange to-brand-lime text-black w-full justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              </SignedOut>
              <SignedIn>
                <li>
                  <SignOutButton>
                    <button className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg py-3 from-brand-orange to-brand-lime text-black w-full justify-center">
                      Sign Out
                    </button>
                  </SignOutButton>
                </li>
              </SignedIn>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
