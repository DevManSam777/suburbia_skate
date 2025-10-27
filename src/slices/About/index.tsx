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
      className="bg-texture bg-brand-gray"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SlideIn>
          <Heading className="~mb-6/10" as="h2">
            {slice.heading}
          </Heading>
        </SlideIn>
        <SlideIn>
          <div className="space-y-6 text-lg leading-relaxed">
            {slice.body.map((paragraph, index) => (
              <p key={index}>{paragraph.text}</p>
            ))}
          </div>
        </SlideIn>
      </div>
    </Bounded>
  );
};

export default About;
