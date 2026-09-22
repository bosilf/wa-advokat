'use client'

import { Image } from "next-sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/image";
import { ReactNode } from "react";
import TeamCardSmall, { TeamCardSmallType } from "@/components/cards/TeamCardSmall";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type ImageType = SanityImageSource & {
  alt?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
  } | null;
};

type ImageGridProps = {
  image: ImageType,
  hasTeamCard?: boolean,
  teamCard?: TeamCardSmallType | null,
  color?: string,
  heading: string,
  eyebrow?: string,
  children: ReactNode,
}

export default function ImageGridSectionRight({ 
  hasTeamCard, 
  teamCard, 
  image, 
  color = "bg-canvas", 
  heading, 
  eyebrow, 
  children}: 
ImageGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const hotspotX = image.hotspot?.x ?? 0.5;
  const hotspotY = image.hotspot?.y ?? 0.5;
  useGSAP(
    () => {
      const card = sectionRef.current;
      const image = imageRef.current;
  
      if (!card) return;
  
      const media = gsap.matchMedia();
  
      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            card,
            {
              marginBottom: 0,
              marginTop: 0,
              
            },
            {
              marginBottom: -50,
              marginTop: -50,
              ease: "none",
  
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
  
                scrub: 1.2,
  
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );
  
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!image) return;
  
          gsap.fromTo(
            image,
            {
              yPercent: -4,
            },
            {
              yPercent: 4,
              ease: "none",
  
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );
  
      return () => {
        media.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section className={`${color} grid-rows-[1fr_2fr] lg:grid-rows-1 grid lg:grid-cols-[3fr_2fr]`}> 
      <div className="order-2 relative h-full min-h-0 w-full flex-1 overflow-hidden ">
        {hasTeamCard 
          ? <div className="absolute bottom-0 left-0 z-20 min-w-70 w-auto m-sm mx-md">
              <TeamCardSmall hoverEffect name={teamCard!.name} image={teamCard!.image} link={teamCard!.link} caption={teamCard!.caption}/>
            </div>
          : ""
        }
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
      <div className="py-section-tb px-section-sides max-w-150 flex flex-col gap-md">
        <p className="font-eyebrow text-muted">{eyebrow}</p>
        <h2 className="font-heading text-ink mb-md">{heading}</h2>
        {children}
      </div>
    </section>
  )
}