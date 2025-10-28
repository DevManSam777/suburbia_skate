export type NavigationItem = {
  link: {
    url: string;
    text: string;
  };
};

export type Settings = {
  navigation: NavigationItem[];
  footer_skateboards: string[];
  footer_image: {
    url: string;
    alt: string;
  };
};

export const settings: Settings = {
  navigation: [
    {
      link: {
        url: "/build",
        text: "Build",
      },
    },
    {
      link: {
        url: "/#products",
        text: "Products",
      },
    },
    {
      link: {
        url: "/#team",
        text: "Team",
      },
    },
  ],
  footer_skateboards: [
    "/images/products/oni-mask-new.webp",
    "/images/products/pink-drop-new.webp",
    "/images/products/gray-black.webp",
    "/images/products/thank-you-new.webp",
    "/images/products/black-yellow.webp",
    "/images/products/grid-streaks.webp",
    "/images/products/green-navy.webp",
    "/images/products/red-white.webp",
  ],
  footer_image: {
    url: "/images/backgrounds/footer-bg.webp",
    alt: "Footer background",
  },
};
