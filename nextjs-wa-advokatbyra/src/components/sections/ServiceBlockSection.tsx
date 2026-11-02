"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import Icon from "../Icon";

export type ServiceBlockItem = {
  id: string;
  title: string;
  href: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  content?: ReactNode;
};

type ServiceBlockSectionProps = {
  items: readonly ServiceBlockItem[];
  eyebrow?: string;
  introContent?: ReactNode;
  navigationOnly?: boolean;
  introHref?: string;
  introLabel?: string;
};

export default function ServiceBlockSection({
  items,
  eyebrow = "Tjänsteområden",
  introContent,
  navigationOnly = false,
  introHref,
  introLabel = "Introduktion",
}: ServiceBlockSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionId = useId();
  const selectedIndex = items.findIndex((item) => item.id === selectedId);
  const selectedItem = items[selectedIndex];
  const isIntro = selectedIndex === -1;

  return (
    <section id={sectionId} className="relative z-15 w-full bg-canvas font-sans">
      <div className={`relative m-auto grid max-w-250 grid-cols-1 gap-2 px-section-sides py-section-tb ${navigationOnly ? "md:grid-cols-1" : "md:grid-cols-[1fr_2fr]"}`}>
        <p className="font-eyebrow">{eyebrow}</p>
        <div className="mb-md flex flex-col gap-md md:ml-auto md:w-[80%] md:items-end">
          <p className="w-fit rounded-full px-3 py-2 text-sm tracking-wider outline">
            {items.length} tjänsteområden
          </p>
        </div>

        <div className={`order-2 min-w-0 md:order-0 md:mr-5 ${navigationOnly ? "md:col-span-full md:mr-0" : ""}`}>
          {!navigationOnly && <h3>
            {introHref ? (
              <Link
                href={introHref}
                className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-lg px-2.5 py-3.5 text-left text-sm tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${isIntro ? "bg-ink text-white" : "text-ink hover:bg-gray-200"}`}
              >
                {introLabel}
                <Icon size={16} className={isIntro ? "text-white" : "text-ink"} name="arrowUpRight" />
              </Link>
            ) : <button
              id={`${sectionId}-intro`}
              type="button"
              onClick={() => setSelectedId(null)}
              aria-pressed={isIntro}
              aria-controls={`${sectionId}-content`}
              className={`grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-lg px-2.5 py-3.5 text-left text-sm tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${isIntro ? "bg-ink text-white" : "text-ink hover:bg-gray-200"}`}
            >
              {introLabel}
              <Icon size={16} className={isIntro ? "text-white" : "text-ink"} name="arrowUpRight" />
            </button>}
          </h3>}
          <ul className={`list-none gap-1 ${navigationOnly ? "flex flex-col md:grid md:grid-cols-3 md:gap-md" : "flex flex-col"}`}>
            {items.map((item, index) => (
              <li key={item.id}>
                {navigationOnly ? (
                  <Link
                    href={item.href}
                    className="group relative grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 overflow-hidden rounded-3xl bg-white px-2.5 py-2 text-left text-sm tracking-wider text-ink transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:flex md:h-full md:flex-col md:items-start md:gap-sm md:p-0"
                  >
                    <span className="relative block size-12 shrink-0 overflow-hidden rounded-md bg-border md:aspect-square md:h-auto md:w-full md:rounded-none" aria-hidden="true">
                      {(item.imageUrl || item.thumbnailUrl) && <Image src={item.imageUrl || item.thumbnailUrl!} alt="" fill sizes="(min-width: 1280px) 380px, (min-width: 768px) 33vw, 48px" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                      <span className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Icon size={24} className="text-white" name="arrowUpRight" />
                      </span>
                    </span>
                    <span className="md:min-h-10 md:w-full md:p-lg md:font-subheading">{item.title}</span>
                  </Link>
                ) : (
                <button
                  id={`${sectionId}-item-${index}`}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={index === selectedIndex}
                  aria-controls={`${sectionId}-content`}
                  className={`grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${index === selectedIndex ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-gray-200"}`}
                >
                  <span className="relative block size-12 shrink-0 overflow-hidden rounded-md bg-border" aria-hidden="true">
                    {(item.thumbnailUrl || item.imageUrl) && (
                      <Image
                        src={item.thumbnailUrl || item.imageUrl!}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <span>{item.title}</span>
                  <Icon size={16} className={index === selectedIndex ? "text-white" : "text-ink"} name="arrowUpRight" />
                </button>
                )}
              </li>
            ))}
          </ul>
          {navigationOnly && introHref && (
            <Link
              href={introHref}
              className="mt-8 inline-flex w-fit items-center gap-sm rounded-full bg-ink px-md py-sm font-subheading text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {introLabel}
              <Icon size={16} className="text-white" name="arrow" />
            </Link>
          )}
        </div>

        {!navigationOnly && <div
          id={`${sectionId}-content`}
          role="region"
          aria-labelledby={isIntro ? `${sectionId}-intro` : `${sectionId}-item-${selectedIndex}`}
          className="order-1 flex h-fit min-w-0 flex-col gap-3 rounded-3xl bg-white p-lg md:order-0"
        >
          {!isIntro && selectedItem.imageUrl && (
            <div className="relative aspect-16/7 w-full overflow-hidden rounded-2xl bg-border">
              <Image
                src={selectedItem.imageUrl}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <p className="font-eyebrow">{isIntro ? "intro" : "Tjänsteområde"}</p>
          <h3 className="font-heading-sm">{isIntro ? "Introduktion" : selectedItem.title}</h3>
          <div className="my-4 h-px w-full bg-border" />
          {isIntro ? introContent : selectedItem.content}
          {!isIntro && selectedItem.href && (
            <Link
              href={selectedItem.href}
              className="inline-flex w-fit items-center gap-sm rounded-full bg-ink px-md py-sm font-subheading text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Till {selectedItem.title}
              <Icon size={16} className="text-white" name="arrow" />
            </Link>
          )}
        </div>}
      </div>
    </section>
  );
}
