"use client";

import { useEffect, useState } from "react";
import { Image } from "next-sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/image";
import Section from "@/components/sections/Section";

type HeroImage = SanityImageSource & {
  alt?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
  } | null;
};

export type EmployeeInfoProps = {
  firstName: string,
  lastName: string,
  roles: string,
  email: string,
  phone: string
}

type HeroEmployeeMobileProps = {
  employee: EmployeeInfoProps;
  eyebrow?: string | null;
  title?: string | null;
  image?: HeroImage | null;
};

export default function HeroEmployeeMobile({
  employee,
  eyebrow,
  title,
  image,
}: HeroEmployeeMobileProps) {
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
    <>
    <section className="bg-canvas z-10 flex h-svh min-h-screen flex-col overflow-hidden">
      <div className="relative min-h-0 w-full flex-1 overflow-hidden">
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

        <div
          className="pointer-events-none absolute inset-0 bg-accent/50 mix-blend-soft-light"
          aria-hidden="true"
        />
      </div>

      <div
        className={`
          bg-footer md:bg-accent shrink-0 py-lg pr-lg
          shadow-[inset_0px_20px_15px_-11px_rgba(0,0,0,0.10)]
          transition-[border-radius] duration-500 ease-out
          ${hasScrolled ? "rounded-b-xl" : "rounded-b-none"}
        `}
      >
        <h1 className="flex flex-col gap-sm p-lg md:pl-0 text-white">
          {eyebrow && (
            <span className="font-eyebrow pl-lg md:pl-xl text-white">
              {eyebrow}
            </span>
          )}

          {title && (
            <span className="font-display md:text-white  md:py-md md:pl-xl md:pr-xl w-fit px-lg">
              {title}
            </span>
          )}
        </h1>
      </div>
    </section>
    <Section color="bg-canvas" heading="Kontaktuppgifter" eyebrow="medarbetare">
      <ul className="flex flex-col font-body">
        <li className="font-subheading text-ink">
          {employee?.firstName} {employee?.lastName}
        </li>
        {employee.roles && <li>{employee.roles}</li>}
        <li>
          <a className="hover:underline" href={`mailto:${employee?.email}` || 'admin@wa-advokat.se'}>{employee?.email || 'epost saknas'}</a>
        </li>
        <li>
          <a href={`tel:${employee!.phone.replace(/[^\d+]/g, "")}`}> </a>
          {employee?.phone || 'nummer saknas'}
        </li>
      </ul>
    </Section>
    </>
  );
}