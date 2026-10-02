"use client";

import { useRef } from "react";
import type { ReactNode, RefObject } from "react";

import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    useGSAP,
  );
}

export type EyebrowCrumb = {
  label: string;
  href?: string;
  openInNewTab?: boolean;
};

export type CourseSectionProps = {
  children: ReactNode;
  color?: string;
  id?: string;
};

export default function AsideIntroSection({
  children,
  color = "bg-canvas",
  id,
}: CourseSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const headingRef =
    useRef<HTMLDivElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

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
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",

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
    <section
      id={id}
      ref={sectionRef}
      className={`${color} h-fit w-full lg:hidden`}
    >
      <div className="ml-auto mr-auto flex max-w-200 flex-col gap-md px-section-sides pt-md pb-section-tb">
        <div className="flex flex-col gap-md" ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
}