export type Skateboard = {
  id: string;
  name: string;
  price: number; // in cents
  image: {
    url: string;
    alt: string;
  };
  customizer_link: {
    url: string;
    text: string;
  };
};

export const skateboards: Skateboard[] = [
  {
    id: "oni-mask",
    name: "Oni Mask",
    price: 5999, // $59.99
    image: {
      url: "/images/products/oni-mask.webp",
      alt: "Oni Mask skateboard",
    },
    customizer_link: {
      url: "/build?deck=oni-mask",
      text: "Customize",
    },
  },
  {
    id: "pink-drop",
    name: "Pink Drop",
    price: 8999, // $89.99
    image: {
      url: "/images/products/pink-drop.webp",
      alt: "Pink Drop skateboard",
    },
    customizer_link: {
      url: "/build?deck=pink-swirl",
      text: "Customize",
    },
  },
  {
    id: "thank-you",
    name: "Thank You",
    price: 6999, // $69.99
    image: {
      url: "/images/products/thank-you.webp",
      alt: "Thank You skateboard",
    },
    customizer_link: {
      url: "/build?deck=thank-you",
      text: "Customize",
    },
  },
  {
    id: "yellow-black",
    name: "Yellow & Black",
    price: 7999, // $79.99
    image: {
      url: "/images/products/yellow-black.webp",
      alt: "Yellow & Black skateboard",
    },
    customizer_link: {
      url: "/build?deck=yellow-black",
      text: "Customize",
    },
  },
];
