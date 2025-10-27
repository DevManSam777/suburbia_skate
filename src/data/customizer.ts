export type WheelOption = {
  id: string;
  name: string;
  texture: {
    url: string;
    alt: string;
  };
};

export type DeckOption = {
  id: string;
  name: string;
  texture: {
    url: string;
    alt: string;
  };
};

export type MetalOption = {
  id: string;
  name: string;
  color: string;
};

export type CustomizerSettings = {
  wheels: WheelOption[];
  decks: DeckOption[];
  metals: MetalOption[]; // Used for both trucks and bolts
};

export const customizerSettings: CustomizerSettings = {
  wheels: [
    { id: "cream", name: "Cream", texture: { url: "/skateboard/wheels/cream.png", alt: "Cream wheels" } },
    { id: "black", name: "Black", texture: { url: "/skateboard/wheels/black.png", alt: "Black wheels" } },
    { id: "navy", name: "Navy", texture: { url: "/skateboard/wheels/navy.png", alt: "Navy wheels" } },
    { id: "blue", name: "Blue", texture: { url: "/skateboard/wheels/blue.png", alt: "Blue wheels" } },
    { id: "yellow", name: "Yellow", texture: { url: "/skateboard/wheels/yellow.png", alt: "Yellow wheels" } },
    { id: "red", name: "Red", texture: { url: "/skateboard/wheels/red.png", alt: "Red wheels" } },
    { id: "lime", name: "Lime", texture: { url: "/skateboard/wheels/lime.png", alt: "Lime wheels" } },
    { id: "purple", name: "Purple", texture: { url: "/skateboard/wheels/purple.png", alt: "Purple wheels" } },
    { id: "pink", name: "Pink", texture: { url: "/skateboard/wheels/pink.png", alt: "Pink wheels" } },
  ],
  decks: [
    { id: "oni-mask", name: "Oni mask", texture: { url: "/skateboard/decks/oni-mask.webp", alt: "Oni mask deck" } },
    { id: "grid-streaks", name: "Grid streaks", texture: { url: "/skateboard/decks/grid-streaks.webp", alt: "Grid streaks deck" } },
    { id: "branches", name: "Branches", texture: { url: "/skateboard/decks/branches.webp", alt: "Branches deck" } },
    { id: "thank-you", name: "Thank you", texture: { url: "/skateboard/decks/thank-you.webp", alt: "Thank you deck" } },
    { id: "pink-swirl", name: "Pink swirl", texture: { url: "/skateboard/decks/pink-swirl.webp", alt: "Pink swirl deck" } },
    { id: "green-navy", name: "Green and navy", texture: { url: "/skateboard/decks/green-navy.webp", alt: "Green and navy deck" } },
    { id: "black-yellow", name: "Black and yellow", texture: { url: "/skateboard/decks/black-yellow.webp", alt: "Black and yellow deck" } },
    { id: "yellow-black", name: "Yellow and black", texture: { url: "/skateboard/decks/yellow-black.webp", alt: "Yellow and black deck" } },
    { id: "red-black", name: "Red and black", texture: { url: "/skateboard/decks/red-black.webp", alt: "Red and black deck" } },
    { id: "red-white", name: "Red and white", texture: { url: "/skateboard/decks/red-white.webp", alt: "Red and white deck" } },
    { id: "gray-black", name: "Gray and black", texture: { url: "/skateboard/decks/gray-black.webp", alt: "Gray and black deck" } },
  ],
  metals: [
    { id: "black", name: "Black", color: "#000000" },
    { id: "steel", name: "Steel", color: "#6F6E6A" },
    { id: "asphalt", name: "Asphalt", color: "#4A4A4A" },
    { id: "gold", name: "Gold", color: "#FFD700" },
    { id: "silver", name: "Silver", color: "#C0C0C0" },
    { id: "red", name: "Red", color: "#FF0000" },
    { id: "blue", name: "Blue", color: "#0000FF" },
    { id: "lime", name: "Lime", color: "#C9FF33" },
    { id: "yellow", name: "Yellow", color: "#FFFF00" },
    { id: "purple", name: "Purple", color: "#9333EA" },
    { id: "raspberry", name: "Raspberry", color: "#E30B5C" },
    { id: "pink", name: "Pink", color: "#FFC0CB" },
  ],
};
