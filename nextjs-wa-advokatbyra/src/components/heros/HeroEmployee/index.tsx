"use client";

import { ReactNode, useEffect, useState } from "react";
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

export type EmployeeInfoProps = {
  firstName: string,
  lastName: string,
  roles: string,
  email: string,
  phone: string
}

type HeroEmployeeProps = {
  eyebrow?: string | null;
  title?: string | null;
  image?: HeroImage | null;
  employee: EmployeeInfoProps;
};

export default function HeroEmployee({
  eyebrow,
  title,
  image,
  employee
}: HeroEmployeeProps) {

  if (!image) return null;

  const hotspotX = image.hotspot?.x ?? 0.5;
  const hotspotY = image.hotspot?.y ?? 0.5;
  return (
    <div className="flex flex-col h-full min-h-screen bg-footer">
      <div className="h-screen overflow-hidden grid grid-cols-2 grid-rows-2">
        <div className="row-start-1 col-start-1 col-span-2 bg-accent flex flex-col justify-end pl-30 pb-xl">
          <p className="font-eyebrow text-white">{eyebrow}</p>
          <h1 className="font-display text-white max-w-[50%]">{title}</h1>
        </div>
        <section className="row-start-2 col-start-1 col-span-2 bg-canvas flex flex-col justify-center pl-30 gap-md">
          <p className="font-eyebrow text-muted">medarbetare</p>
          <h2 className="font-heading text-ink">Kontaktuppgifter</h2>
          <ul className="flex flex-col font-body">
            <li className="font-subheading text-ink">{employee?.firstName} {employee?.lastName}</li>
            {employee.roles && <li>{employee.roles}</li>}
            <li>
              <a className="hover:underline" href={`mailto:${employee?.email}` || 'admin@wa-advokat.se'}>{employee?.email || 'epost saknas'}</a>
            </li>
            <li>
              <a href={`tel:${employee!.phone.replace(/[^\d+]/g, "")}`}> </a>
              {employee?.phone || 'nummer saknas'}
            </li>
          </ul>
        </section>
        <div className="relative row-start-1 row-span-2 col-start-2 flex flex-col mx-20 mt-40">
          {/* <div className="flex-1 bg-pink-800"/> */}
          {/* <div className="flex-1 bg-canvas" /> */}
          <div className="z-2000 h-full w-full absolute flex-1">
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
        </div>
      </div>
    </div>
  )
}