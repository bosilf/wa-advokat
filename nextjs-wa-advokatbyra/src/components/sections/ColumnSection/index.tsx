"use client";

import { useRef } from "react";
import type { ReactNode } from "react";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    useGSAP,
  );
}
export type SectionProps = {
  children: ReactNode;
  color?: string;
  eyebrow?: string;
  heading: string;
};

export default function ColumnSection({
  heading,
  eyebrow,
  children,
  color = "bg-canvas",
}: SectionProps) {

  const sectionRef =
  useRef<HTMLElement>(null);

const headingRef =
  useRef<HTMLHeadingElement>(null);

const contentRef =
  useRef<HTMLDivElement>(null);

const eyebrowContent = (
  <span className="font-eyebrow text-muted">
    {eyebrow}
  </span>
);

useGSAP(
  () => {
    const section = sectionRef.current;
    const headingElement =
      headingRef.current;
    const contentElement =
      contentRef.current;

    if (
      !section ||
      !headingElement ||
      !contentElement
    ) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.fromTo(
      section,
      {
        paddingTop: () =>
          window.innerWidth >= 1024
            ? 100
            : 85,

        paddingBottom: () =>
          window.innerWidth >= 1024
            ? 100
            : 85,
      },
      {
        paddingTop: () =>
          window.innerWidth >= 1024
            ? 12
            : 2,

        paddingBottom: () =>
          window.innerWidth >= 1024
            ? 12
            : 2,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "top 10%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      },
    );

    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",

        once: true,
      },
    });

    revealTimeline
      .from(headingElement, {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        contentElement,
        {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );
  },
  {
    scope: sectionRef,
  },
);

  return (
    <section ref={sectionRef} className={`${color} h-fit w-full`}>
      <div className="max-w-200 py-section-tb px-section-sides m-auto flex flex-col md:flex-row gap-lg">
        <div className="flex-2 flex flex-col">
          <p hidden={eyebrow === undefined} className="font-eyebrow text-muted">{eyebrow}</p>
          <h2 
            ref={headingRef}
            className="font-heading text-ink text-pretty"
          >
            {heading}
          </h2>
        </div>
        <div ref={contentRef} className="flex-3 flex flex-col gap-lg">
          {children}
        </div>
      </div>
    </section>
  )
}