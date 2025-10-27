"use client";

import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { useCustomizerControls } from "./context";

const BASE_PRICE = 7999; // $79.99 in cents

export default function AddToCartButton() {
  const router = useRouter();
  const { addItem } = useCart();
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();

  const handleAddToCart = () => {
    if (!selectedWheel || !selectedDeck || !selectedTruck || !selectedBolt) {
      return;
    }

    const cartItemId = `${selectedDeck.id}-${selectedWheel.id}-${selectedTruck.id}-${selectedBolt.id}`;

    addItem({
      id: cartItemId,
      deck: {
        id: selectedDeck.id,
        name: selectedDeck.name,
        texture: selectedDeck.texture.url,
      },
      wheel: {
        id: selectedWheel.id,
        name: selectedWheel.name,
        texture: selectedWheel.texture.url,
      },
      truck: {
        id: selectedTruck.id,
        name: selectedTruck.name,
        color: selectedTruck.color,
      },
      bolt: {
        id: selectedBolt.id,
        name: selectedBolt.name,
        color: selectedBolt.color,
      },
      price: BASE_PRICE,
    });

    // Redirect to home page after adding to cart
    router.push("/#products");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="button-cutout group mx-4 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-lime to-brand-orange text-black"
    >
      <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full size-6">
        <FaPlus />
      </div>
      <div className="w-px self-stretch bg-black/25" />
      Add to cart
    </button>
  );
}
