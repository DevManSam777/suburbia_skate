import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import React from "react";
import { Skater } from "./Skater";
import { SlideIn } from "@/components/SlideIn";
import { TeamGridSlice } from "@/data/homepage";
import { skaters } from "@/data/skaters";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = {
  slice: TeamGridSlice;
};

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid = ({ slice }: TeamGridProps): JSX.Element => {
  return (
    <Bounded
      id="team"
      data-slice-type={slice.slice_type}
      className="bg-texture bg-brand-navy"
    >
      <SlideIn>
        <Heading as="h2" size="lg" className="mb-8 text-center text-white">
          {slice.heading}
        </Heading>
      </SlideIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <SlideIn key={skater.id}>
            <Skater index={index} skater={skater} />
          </SlideIn>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
