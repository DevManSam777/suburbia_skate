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
        url: "#team",
        text: "Team",
      },
    },
    {
      link: {
        url: "#products",
        text: "Products",
      },
    },
    {
      link: {
        url: "#about",
        text: "About",
      },
    },
  ],
  footer_skateboards: [
    "/images/products/oni-mask.png",
    "/images/products/pink-drop.png",
    "/images/products/thank-you.png",
    "/images/products/yellow-black.png",
  ],
  footer_image: {
    url: "/images/backgrounds/footer-bg.jpg",
    alt: "Footer background",
  },
};
