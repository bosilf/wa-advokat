'use client'
import {useRef, type ReactNode} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import type {SanityImageSource} from "@sanity/image-url";

import {urlFor} from "@/sanity/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type ImageColorSectionProps = {
  children?: ReactNode;
  image?: SanityImageSource | null;
  className?: string;
  color?: string;
  paperTexture?: boolean;
};

export default function ImageColorSection({
  children,
  image,
  color,
  paperTexture = false,
  className = "",
}: ImageColorSectionProps) {

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const imageUrl = typeof image === "string" && image.startsWith("/")
    ? image
    : image
    ? urlFor(image)
        .width(2400)
        .quality(85)
        .auto("format")
        .url()
    : undefined;

  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current || !imageUrl) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(imageRef.current, {yPercent: -10}, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => media.revert();
  }, {scope: sectionRef, dependencies: [imageUrl], revertOnUpdate: true});

  return (
    <section
      ref={sectionRef}
      className={`

        relative isolate overflow-hidden
        bg-cover
        bg-center
        ${color ?? ""}
        bg-no-repeat
        px-section-sides
        py-section-tb
        inset-shadow-md/90
        ${className}
      `}
    >
      {imageUrl && (
        <div
          ref={imageRef}
          aria-hidden="true"
          className="absolute inset-x-0 -inset-y-[15%] bg-cover bg-center bg-no-repeat motion-safe:will-change-transform"
          style={{backgroundImage: `url("${imageUrl}")`}}
        />
      )}
      {color && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${color} mix-blend-color`}
        />
      )}
      {color && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${color} mix-blend-darken opacity-50`}
        />
      )}

      {paperTexture && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/assets/paper-texture.svg')] bg-size-[125px_125px] bg-repeat mix-blend-multiply opacity-60"
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
