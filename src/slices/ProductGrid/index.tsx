import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SkateboardProduct } from "./SkateboardProduct";
import { SlideIn } from "@/components/SlideIn";
import { ProductGridSlice } from "@/data/homepage";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = {
  slice: ProductGridSlice;
};

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid = ({ slice }: ProductGridProps): JSX.Element => {
  return (
    <Bounded
      id="products"
      data-slice-type={slice.slice_type}
      className="bg-texture bg-brand-gray"
    >
      <SlideIn>
        <Heading className="text-center ~mb-4/6" as="h2">
          {slice.heading}
        </Heading>
      </SlideIn>
      <SlideIn>
        <div className="text-center ~mb-6/10">
          {slice.body.map((paragraph, index) => (
            <p key={index}>{paragraph.text}</p>
          ))}
        </div>
      </SlideIn>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {slice.product_ids.map((id) => (
          <SkateboardProduct key={id} id={id} />
        ))}
      </div>
    </Bounded>
  );
};

export default ProductGrid;
