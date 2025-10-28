import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { AboutSlice } from "@/data/homepage";

export type AboutProps = {
  slice: AboutSlice;
};

const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <Bounded
      id="about"
      data-slice-type={slice.slice_type}
      className="bg-texture bg-brand-gray relative overflow-hidden"
    >
      {/* Concentric circles background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute rounded-full border-8 border-brand-pink aspect-square opacity-70" style={{ width: 'min(150vw, 200vh)' }} />
        <div className="absolute rounded-full border-[6px] border-brand-purple aspect-square opacity-25" style={{ width: 'min(120vw, 160vh)' }} />
        <div className="absolute rounded-full border-4 border-cyan-400 aspect-square opacity-25" style={{ width: 'min(90vw, 120vh)' }} />
        <div className="absolute rounded-full border-[5px] border-brand-lime aspect-square opacity-25" style={{ width: 'min(65vw, 85vh)' }} />
        <div className="absolute rounded-full border-4 border-brand-orange aspect-square opacity-25" style={{ width: 'min(40vw, 50vh)' }} />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <SlideIn>
          <Heading className="~mb-6/10" as="h2">
            {slice.heading}
          </Heading>
        </SlideIn>
        <SlideIn>
          <div className="space-y-6 text-lg leading-relaxed">
            {slice.body.map((paragraph, index) => {
              if (paragraph.emphasis) {
                const parts = paragraph.text.split(paragraph.emphasis);
                return (
                  <p key={index}>
                    {parts[0]}
                    <span className="font-bold text-brand-orange">{paragraph.emphasis}</span>
                    {parts[1]}
                  </p>
                );
              }
              return <p key={index}>{paragraph.text}</p>;
            })}
          </div>
        </SlideIn>
      </div>
    </Bounded>
  );
};

export default About;
