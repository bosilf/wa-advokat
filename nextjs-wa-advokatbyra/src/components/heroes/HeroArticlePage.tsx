"use client";

import { useEffect, useState } from "react";
import { Image as SanityImage } from "next-sanity/image";
import NextImage, { type StaticImageData } from "next/image";
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
  className?: string;
  eyebrow?: string | null;
  title?: string | null;
  image?: HeroImage | StaticImageData | null;
};

export default function HeroArticlePage({
  className = "",
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

  const staticImage = typeof image === "object" && "src" in image ? image : null;
  const sanityImage = staticImage ? null : image as HeroImage;
  const Image = staticImage ? NextImage : SanityImage;
  const hotspotX = sanityImage?.hotspot?.x ?? 0.5;
  const hotspotY = sanityImage?.hotspot?.y ?? 0.5;

  return (
    <section
      className={`bg-footer transition-[border-radius] md:flex-1 duration-500 ease-out h-svh drop-shadow-xl/20 flex flex-col
    ${hasScrolled ? "rounded-b-xl" : "rounded-b-none"}
    ${className}
    `}
    >
      <div className="relative min-h-0 w-full flex-1 overflow-hidden">
        <div className="absolute mix-blend-color -mb-1 h-full w-full z-2 bg-footer " />
        <div className="absolute -mb-1 h-full w-full z-3 bg-linear-to-t from-footer to-footer/0 " />
        <Image
          src={staticImage ? String(staticImage.src) : urlFor(sanityImage!).url()}
          alt={sanityImage?.alt ?? ""}
          fill
          loading="eager"
          preload
          quality={75}
          sizes="100vw"
          className="object-cover opacity-70 mix-blend-overlay"
          style={{
            objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%`,
          }}
        />
      </div>
      <div
        className={`
          bg-footer m-auto max-w-200 h-fit w-full shrink-0 pb-lg px-section-sides
          
          transition-[border-radius] duration-500 ease-out
          ${hasScrolled ? "rounded-b-xl" : "rounded-b-none"}
        `}
      >
        <h1 className="flex flex-col gap-sm  text-white">
          {eyebrow && (
            <span className="font-eyebrow text-white">
              {eyebrow}
            </span>
          )}

          {title && (
            <span className="italic font-serif text-4xl font-light md:text-white  md:py-md w-fit ">
              {title}
            </span>
          )}
        </h1>
      </div>
    </section>
  );
}
