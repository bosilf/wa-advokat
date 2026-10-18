"use client";

import { useEffect, useState } from "react";
import { Image } from "next-sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/image";

export type ImageType = SanityImageSource & {
  alt?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
  } | null;
};

export type ImageCompProps = {
  image?: ImageType | null;
  sizes?: string;
  aspectRatio?: number;
};

export default function ImageComponent({
  image,
  sizes = "100vw",
  aspectRatio,
}: ImageCompProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 5);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!image) return null;

  const cropped = aspectRatio !== undefined && aspectRatio > 0;
  const imageUrl = cropped
    ? urlFor(image)
        .width(800)
        .height(Math.max(1, Math.round(800 / aspectRatio)))
        .fit("crop")
        .url()
    : urlFor(image).url();
  const hotspotX = cropped ? 0.5 : (image.hotspot?.x ?? 0.5);
  const hotspotY = cropped ? 0.5 : (image.hotspot?.y ?? 0.5);

  return (
    <div className="relative h-full min-h-0 w-full flex-1 overflow-hidden">
      <Image
        src={imageUrl}
        alt={image.alt ?? ""}
        loading="lazy"
        fill
        quality={75}
        sizes={sizes}
        className="object-cover"
        style={{
          objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%`,
        }}
      />
    </div>
  );
}
