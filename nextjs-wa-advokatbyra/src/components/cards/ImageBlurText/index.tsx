'use client'

import { SanityImageSource } from "@sanity/image-url";
import { Image } from "next-sanity/image"
import { urlFor } from "@/sanity/image";
import Link from "next/link";

type ImageProps = SanityImageSource & {
  alt?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
  } | null;
};

export type ImageBlurProps = {
  image: ImageProps,
  eyebrow?: string,
  title?: string,
  link?: string
}

export default function ImageBlurText({
  image,
  eyebrow,
  title,
  link,
}: ImageBlurProps) {
  if (!image) return null;

  const hotspotX = image.hotspot?.x ?? 0.5;
  const hotspotY = image.hotspot?.y ?? 0.5;

  return (
    <div
      className="min-h-72 w-full relative overflow-hidden aspect-video lg:aspect-square"
    >
      <Link
        href={link || "#"}
        className={`${
          !link 
            ? "cursor-default hover:cursor-default" 
            : "hover:cursor-pointer group"
        } absolute inset-0 z-10 flex h-full w-full flex-col items-start justify-end overflow-hidden"`}
      >
      <Image
        src={urlFor(image).url()}
        alt={image.alt ?? ""}
        fill
        loading="lazy"
        quality={75}
        sizes="(max-width: 767px) 250vw, 100vw"
        className={`object-cover z-20 h-full ${
          !link
            ? ""
            : "group-hover:scale-103 transform-all duration-300"
        }`}
        style={{
          objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%`,
        }}
        />
      <div className="z-30 absolute h-[50%] ease-in-out flex w-full bottom-0 flex-col items-start justify-end gap-sm transition-colors duration-300 bg-linear-to-t from-footer/80 via-footer/5 to-transparent bg-blend-darken p-lg text-white">
        <p className="font-eyebrow text-white">
          {eyebrow}
        </p>

        <h2 className={`font-heading text-white ${
          !link 
            ? "cursor-default hover:cursor-default"
            : "hover:cursor-pointer"
        }`}>
          {title}
        </h2>
      </div>
    </Link>
    </div>
  )
}