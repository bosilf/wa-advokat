'use client'
import {useState, type ReactNode} from "react";
import type {SanityImageSource} from "@sanity/image-url";

import {urlFor} from "@/sanity/image";

export type ImageSectionProps = {
  children?: ReactNode;
  image?: SanityImageSource | null;
  className?: string;
  overlay?: boolean;
};

export default function ImageSection({
  children,
  image,
  className = "",
  overlay = false,
}: ImageSectionProps) {

  const [isLoading, setIsLoading] = useState(false)

  function handleLoad() {
    setIsLoading(!isLoading)
  }

  const imageUrl = image
    ? urlFor(image)
        .width(2400)
        .quality(85)
        .auto("format")
        .url()
    : undefined;

  return (
    <section
    onLoad={handleLoad}
      style={
        imageUrl
          ? {backgroundImage: `url("${imageUrl}")`}
          : undefined
      }
      className={`

        ${isLoading ? "bg-accent" : "bg-white"}
        relative
        bg-cover
        bg-center
        bg-no-repeat
        px-section-sides
        py-section-tb
        ${className}
      `}
    >
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/40"
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}