import { Metadata } from "next";
import { homepage, Slice, TextAndImageSlice } from "@/data/homepage";
import Hero from "@/slices/Hero";
import ProductGrid from "@/slices/ProductGrid";
import TeamGrid from "@/slices/TeamGrid";
import TextAndImage from "@/slices/TextAndImage";
import VideoBlock from "@/slices/VideoBlock";
import About from "@/slices/About";

export default async function Page() {
  const slices = bundleTextAndImageSlices(homepage.slices);

  return (
    <div>
      {slices.map((slice, index) => {
        switch (slice.slice_type) {
          case "hero":
            return <Hero key={index} slice={slice} />;
          case "product_grid":
            return <ProductGrid key={index} slice={slice} />;
          case "team_grid":
            return <TeamGrid key={index} slice={slice} />;
          case "text_and_image":
            return <TextAndImage key={index} slice={slice} index={index} />;
          case "video_block":
            return <VideoBlock key={index} slice={slice} />;
          case "about":
            return <About key={index} slice={slice} />;
          case "text_and_image_bundle":
            return (
              <div key={index}>
                {slice.slices.map((bundledSlice, bundleIndex) => (
                  <TextAndImage
                    key={bundleIndex}
                    slice={bundledSlice}
                    index={bundleIndex}
                  />
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: homepage.meta_title,
    description: homepage.meta_description,
  };
}

type TextAndImageBundleSlice = {
  id: string;
  slice_type: "text_and_image_bundle";
  slices: TextAndImageSlice[];
};

function bundleTextAndImageSlices(
  slices: Slice[]
): (Slice | TextAndImageBundleSlice)[] {
  const res: (Slice | TextAndImageBundleSlice)[] = [];

  for (let i = 0; i < slices.length; i++) {
    const slice = slices[i];

    if (slice.slice_type !== "text_and_image") {
      res.push(slice);
      continue;
    }

    const bundle = res.at(-1);
    if (bundle?.slice_type === "text_and_image_bundle") {
      bundle.slices.push(slice);
    } else {
      res.push({
        id: `${i}-bundle`,
        slice_type: "text_and_image_bundle",
        slices: [slice],
      });
    }
  }
  return res;
}
