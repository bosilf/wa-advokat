"use client";

import { useEffect, useState } from "react";
import { Image } from "next-sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/image";

type ImageType = SanityImageSource & {
  alt?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
  } | null;
};

type ImageProps = {
  image?: ImageType | null;
};

export default function ImageComponent({
  image,
}: ImageProps) {
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

  const hotspotX = image.hotspot?.x ?? 0.5;
  const hotspotY = image.hotspot?.y ?? 0.5;

  return (
      <div className="relative h-full min-h-0 w-full flex-1 overflow-hidden">
      <Image
        src={urlFor(image).url()}
        alt={image.alt ?? ""}
        fill
        loading="eager"
        preload
        quality={90}
        sizes="(max-width: 767px) 250vw, 100vw"
        className="object-cover"
        style={{
          objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%`,
        }}
      />
      </div>
  );
}