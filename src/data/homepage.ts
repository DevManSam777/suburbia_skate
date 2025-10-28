export type Image = {
  url: string;
  alt: string;
};

export type Link = {
  url: string;
  text: string;
};

export type RichText = Array<{
  type: 'paragraph';
  text: string;
  emphasis?: string; // Text to emphasize within the paragraph
}>;

export type HeroSlice = {
  slice_type: 'hero';
  heading: string;
  body: RichText;
  button: Link;
  skateboard_deck_texture: Image | null;
  skateboard_wheel_texture: Image | null;
  skateboard_truck_color: string | null;
  skateboard_bolt_color: string | null;
};

export type ProductGridSlice = {
  slice_type: 'product_grid';
  heading: string;
  body: RichText;
  product_ids: string[]; // IDs from skateboards data
};

export type TeamGridSlice = {
  slice_type: 'team_grid';
  heading: string;
};

export type TextAndImageSlice = {
  slice_type: 'text_and_image';
  heading: string;
  body: RichText;
  button: Link;
  theme: 'Blue' | 'Orange' | 'Navy' | 'Lime';
  foreground_image: Image;
  background_image: Image;
  variation?: 'imageOnLeft' | 'default';
};

export type VideoBlockSlice = {
  slice_type: 'video_block';
  youtube_video_id: string;
};

export type AboutSlice = {
  slice_type: 'about';
  heading: string;
  body: RichText;
};

export type Slice =
  | HeroSlice
  | ProductGridSlice
  | TeamGridSlice
  | TextAndImageSlice
  | VideoBlockSlice
  | AboutSlice;

export type Homepage = {
  meta_title: string;
  meta_description: string;
  slices: Slice[];
};

export const homepage: Homepage = {
  meta_title: "Suburbia Skate - Build Your Custom Skateboard",
  meta_description: "Not just a board, your board. Design a skateboard that's as real as the places you take it.",
  slices: [
    {
      slice_type: 'hero',
      heading: "Escape the Cul-de-sac",
      body: [
        { type: 'paragraph', text: "Not just a board, your board. Design a board that's as real as the places you take it.", emphasis: "your board" }
      ],
      button: {
        url: '/build',
        text: 'Build Your Board'
      },
      skateboard_deck_texture: {
        url: "/images/hero/green-and-navy.webp",
        alt: "Green and navy skateboard deck"
      },
      skateboard_wheel_texture: {
        url: "/images/hero/wheel-green.png",
        alt: "Green wheel"
      },
      skateboard_truck_color: null,
      skateboard_bolt_color: null,
    },
    {
      slice_type: 'product_grid',
      heading: "Latest Drop",
      body: [
        { type: 'paragraph', text: "Check out our newest skateboard designs" }
      ],
      product_ids: ['oni-mask', 'pink-drop', 'thank-you', 'yellow-black']
    },
    {
      slice_type: 'text_and_image',
      heading: "Crafted for the Kickflip",
      body: [
        { type: 'paragraph', text: "Every deck is built with precision and passion. Our boards are designed to handle whatever tricks you throw at them." }
      ],
      button: {
        url: '#products',
        text: 'Shop Boards'
      },
      theme: 'Blue',
      foreground_image: {
        url: "/images/backgrounds/guy-1.png",
        alt: "Skater performing trick"
      },
      background_image: {
        url: "/images/backgrounds/paint-background.png",
        alt: "Paint background"
      },
      variation: 'default'
    },
    {
      slice_type: 'text_and_image',
      heading: "Not Just a Deck, It's Your Canvas",
      body: [
        { type: 'paragraph', text: "Express yourself with custom designs. Make your board as unique as your style." }
      ],
      button: {
        url: '/build',
        text: 'Shop Boards'
      },
      theme: 'Orange',
      foreground_image: {
        url: "/images/backgrounds/guy-2.png",
        alt: "Skater with custom board"
      },
      background_image: {
        url: "/images/backgrounds/paint-background.png",
        alt: "Paint background"
      },
      variation: 'imageOnLeft'
    },
    {
      slice_type: 'text_and_image',
      heading: "Built for Hard Landings",
      body: [
        { type: 'paragraph', text: "Durable construction that can take a beating. Our boards are made to last through countless sessions." }
      ],
      button: {
        url: '#products',
        text: 'Shop Boards'
      },
      theme: 'Navy',
      foreground_image: {
        url: "/images/backgrounds/guy-3.png",
        alt: "Skater landing trick"
      },
      background_image: {
        url: "/images/backgrounds/paint-background.png",
        alt: "Paint background"
      },
      variation: 'default'
    },
    {
      slice_type: 'text_and_image',
      heading: "The Next Wave",
      body: [
        { type: 'paragraph', text: "Inspiring young skaters to push their limits. Join the movement and show us what you've got." }
      ],
      button: {
        url: '#products',
        text: 'Shop Boards'
      },
      theme: 'Lime',
      foreground_image: {
        url: "/images/backgrounds/guy-4.png",
        alt: "Young skater"
      },
      background_image: {
        url: "/images/backgrounds/paint-background.png",
        alt: "Paint background"
      },
      variation: 'imageOnLeft'
    },
    {
      slice_type: 'team_grid',
      heading: "Team Suburbia"
    },
    {
      slice_type: 'video_block',
      youtube_video_id: '44I29krtxaw'
    },
    {
      slice_type: 'about',
      heading: "About",
      body: [
        { type: 'paragraph', text: "Born from the concrete jungles and suburban streets, Suburbia Skate is more than just a skateboard company. We're a movement of riders who refuse to be confined by the ordinary.", emphasis: "Suburbia Skate" },
        { type: 'paragraph', text: "Every board we craft is designed with passion, built for performance, and made to express your unique style. Whether you're grinding rails in the city or cruising through your neighborhood, Suburbia Skate has your back.", emphasis: "Suburbia Skate" },
        { type: 'paragraph', text: "Join our community of skaters who are redefining what it means to escape the cul-de-sac." }
      ]
    }
  ]
};
