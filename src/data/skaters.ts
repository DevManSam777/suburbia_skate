export type Skater = {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  photo_background: {
    url: string;
    alt: string;
  };
  photo_foreground: {
    url: string;
    alt: string;
  };
  customizer_link: {
    url: string;
    text: string;
  };
};

export const skaters: Skater[] = [
  {
    id: "sophie-castillo",
    first_name: "Sophie",
    last_name: "Castillo",
    bio: "Street skating queen who learned to kickflip before she could ride a bike. Grinds rails for breakfast.",
    photo_background: {
      url: "/images/team/sophie-back.webp",
      alt: "Sophie Castillo background",
    },
    photo_foreground: {
      url: "/images/team/sophie-front.webp",
      alt: "Sophie Castillo",
    },
    customizer_link: {
      url: "/build?deck=yellow-black",
      text: "Build their board",
    },
  },
  {
    id: "dylan-foster",
    first_name: "Dylan",
    last_name: "Foster",
    bio: "Vert ramp destroyer with zero fear. If it's got coping, Dylan's riding it. Still banned from three skate parks.",
    photo_background: {
      url: "/images/team/dylan-back.webp",
      alt: "Dylan Foster background",
    },
    photo_foreground: {
      url: "/images/team/dylan-front.webp",
      alt: "Dylan Foster",
    },
    customizer_link: {
      url: "/build?deck=grid-streaks&wheel=yellow",
      text: "Build their board",
    },
  },
  {
    id: "carter-bell",
    first_name: "Carter",
    last_name: "Bell",
    bio: "Tech wizard. Lands tricks so smooth you'll rewind to watch again. Varial heelflip? That's just a warm-up.",
    photo_background: {
      url: "/images/team/carter-back.webp",
      alt: "Carter Bell background",
    },
    photo_foreground: {
      url: "/images/team/carter-front.webp",
      alt: "Carter Bell",
    },
    customizer_link: {
      url: "/build?deck=pink-swirl&wheel=blue",
      text: "Build their board",
    },
  },
  {
    id: "jordan-lee",
    first_name: "Jordan",
    last_name: "Lee",
    bio: "Big air specialist. Goes higher than your Wi-Fi signal. Sticks every landing like it's nothing. Absolute legend.",
    photo_background: {
      url: "/images/team/jordan-back.webp",
      alt: "Jordan Lee background",
    },
    photo_foreground: {
      url: "/images/team/jordan-front.webp",
      alt: "Jordan Lee",
    },
    customizer_link: {
      url: "/build?deck=red-black&truck=silver",
      text: "Build their board",
    },
  },
];
