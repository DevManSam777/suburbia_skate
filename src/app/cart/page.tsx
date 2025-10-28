"use client";

import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaCartShopping, FaTrash, FaCreditCard } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
        <Bounded className="text-center">
          <div className="flex justify-center mb-6">
            <FaCartShopping className="text-brand-purple text-6xl" />
          </div>
          <Heading className="mb-6" as="h1">
            Your Cart
          </Heading>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your cart is empty! Browse our collection of custom skateboards and add your favorites.
          </p>
          <div className="space-y-4">
            <Link
              href="/#products"
              className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white"
            >
              <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
                <FaCartShopping />
              </div>
              <div className="w-px self-stretch bg-white/25" />
              Shop Boards
            </Link>
          </div>
        </Bounded>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12">
      <Bounded>
        <Heading className="mb-8" as="h1">
          Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </Heading>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 flex gap-6"
              >
                {/* Deck Preview */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.deck.texture}
                    alt={item.deck.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-2">
                    Custom Skateboard
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-semibold">Deck:</span> {item.deck.name}
                    </p>
                    <p>
                      <span className="font-semibold">Wheels:</span> {item.wheel.name}
                    </p>
                    <p>
                      <span className="font-semibold">Trucks:</span> {item.truck.name}
                    </p>
                    <p>
                      <span className="font-semibold">Bolts:</span> {item.bolt.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="ml-auto text-right">
                      <p className="font-bold text-lg">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          ${(item.price / 100).toFixed(2)} each
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(totalPrice / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalPrice / 100).toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white w-full justify-center mb-3"
              >
                <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
                  <FaCreditCard />
                </div>
                <div className="w-px self-stretch bg-white/25" />
                Checkout
              </Link>

              <Link
                href="/#products"
                className="block text-center text-brand-purple hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </Bounded>
    </div>
  );
}
