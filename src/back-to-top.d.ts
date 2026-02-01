declare module "@devmansam/back-to-top";

declare namespace JSX {
  interface IntrinsicElements {
    "back-to-top": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        position?: "left" | "right";
        size?: string;
        "bottom-offset"?: string;
        "side-offset"?: string;
        "border-radius"?: string;
        "primary-color"?: string;
        "background-color"?: string;
        "border-color"?: string;
        "box-shadow"?: string;
        "backdrop-blur"?: string;
        "dark-primary-color"?: string;
        "dark-background-color"?: string;
        "dark-border-color"?: string;
        "dark-box-shadow"?: string;
        "show-after"?: string;
        "scroll-behavior"?: "smooth" | "auto";
        "animation-duration"?: string;
        "hover-lift"?: string;
        theme?: "light" | "dark" | "auto";
        "aria-label"?: string;
        "keyboard-support"?: string;
      },
      HTMLElement
    >;
  }
}