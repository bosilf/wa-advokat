"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CustomPortableText } from "@/components/common/CustomPortableText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    useGSAP,
  );
}

export type SectionProps = {
  children: ReactNode;
  color?: string;
  hideEyebrow?: boolean;
  eyebrow?: string;
  eyebrowHref?: string;
  eyebrowOpenInNewTab?: boolean;
  heading: string;
  description?: string
};

export default function SectionTwo({
  heading,
  eyebrow,
  eyebrowHref,
  eyebrowOpenInNewTab = false,
  hideEyebrow = false,
  children,
  description,
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
    <section className={`${color} h-fit w-full`}>
      <div className="z-10 m-auto grid max-w-200 grid-cols-1 md:grid-cols-2 gap-md px-section-sides py-section">
        <h2 
          ref={headingRef}
          className="mb-md flex flex-col"
        >
          {!hideEyebrow && eyebrow && (
            <>
              {eyebrowHref ? (
                <Link
                  href={eyebrowHref}
                  target={
                    eyebrowOpenInNewTab
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    eyebrowOpenInNewTab
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-fit"
                >
                  {eyebrowContent}
                </Link>
              ) : (
                eyebrowContent
              )}
            </>
          )}

          <span className="font-heading text-ink text-pretty">
            {heading}
          </span>
        </h2>
        <div ref={contentRef}>
        <CustomPortableText value={description || 'text saknas'} />
        {children}
        </div>
      </div>
    </section>
  );
}