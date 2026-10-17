"use client";

import { useEffect, useState } from "react";
import { Image } from "next-sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/image";

type HeroImage = SanityImageSource & {
  alt?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
  } | null;
};

type HeroArticlerProps = {
  eyebrow?: string | null;
  title?: string | null;
  image?: HeroImage | null;
};

export default function HeroArticlePage({
  eyebrow,
  title,
  image,
}: HeroArticlerProps) {
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
    <section
      className={`bg-footer transition-[border-radius] duration-500 ease-out h-svh drop-shadow-xl/20 flex flex-col
    ${hasScrolled ? "rounded-b-xl" : "rounded-b-none"}
    `}
    >
      <div className="relative min-h-0 w-full flex-1 overflow-hidden">
        <div className="absolute -mb-1 h-full w-full z-2 bg-linear-to-t from-footer to-footer/0 " />
        <Image
          src={urlFor(image).url()}
          alt={image.alt ?? ""}
          fill
          loading="eager"
          preload
          quality={75}
          sizes="100vw"
          className="object-cover opacity-45"
          style={{
            objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%`,
          }}
        />
      </div>
      <div
        className={`
          bg-footer h-fit shrink-0 pb-lg pr-lg
          
          transition-[border-radius] duration-500 ease-out
          ${hasScrolled ? "rounded-b-xl" : "rounded-b-none"}
        `}
      >
        <h1 className="flex flex-col gap-sm pb-lg px-lg md:pl-0 text-white">
          {eyebrow && (
            <span className="font-eyebrow pl-lg md:pl-xl text-white">
              {eyebrow}
            </span>
          )}

          {title && (
            <span className="italic font-serif text-4xl font-light md:text-white  md:py-md md:pl-xl md:pr-xl w-fit lg:max-w-[80%] px-lg">
              {title}
            </span>
          )}
        </h1>
      </div>
    </section>
  );
}
