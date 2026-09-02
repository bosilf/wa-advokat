import Image from "next/image";

import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/image";

type BlockImage = SanityImageSource & {
  alt?: string | null;
  caption?: string | null;
};

export type ImageBlockData = {
  _key: string;
  _type: "imageBlock";
  image?: BlockImage | null;
  caption?: string | null;
};

type ImageBlockProps = {
  block: ImageBlockData;
};

export default function ImageBlock({
  block,
}: ImageBlockProps) {
  if (!block.image) {
    return null;
  }

  const imageUrl = urlFor(block.image)
    .width(1600)
    .height(1000)
    .fit("crop")
    .url();

  const caption =
    block.caption ?? block.image.caption;

  return (
    <figure className="flex flex-col gap-sm">
      <Image
        src={imageUrl}
        alt={block.image.alt ?? ""}
        width={1600}
        height={1000}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="h-auto w-full rounded-md object-cover"
      />

      {caption && (
        <figcaption className="font-body text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}