import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";

import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Suburbia Skate - Custom Skateboards",
  description: "Not just a board, your board. Design a skateboard that's as real as the places you take it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
        suppressHydrationWarning
      >
        <CartProvider>
          <main>{children}</main>
          <SVGFilters />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
