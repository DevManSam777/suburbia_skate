export type Skater = {
  id: string;
  first_name: string;
  last_name: string;
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
    photo_background: {
      url: "/images/team/sophie-back.png",
      alt: "Sophie Castillo background",
    },
    photo_foreground: {
      url: "/images/team/sophie-front.png",
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
    photo_background: {
      url: "/images/team/dylan-back.png",
      alt: "Dylan Foster background",
    },
    photo_foreground: {
      url: "/images/team/dylan-front.png",
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
    photo_background: {
      url: "/images/team/carter-back.png",
      alt: "Carter Bell background",
    },
    photo_foreground: {
      url: "/images/team/carter-front.png",
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
    photo_background: {
      url: "/images/team/jordan-back.png",
      alt: "Jordan Lee background",
    },
    photo_foreground: {
      url: "/images/team/jordan-front.png",
      alt: "Jordan Lee",
    },
    customizer_link: {
      url: "/build?deck=red-black&truck=silver",
      text: "Build their board",
    },
  },
];
