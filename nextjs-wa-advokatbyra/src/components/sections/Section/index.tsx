"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

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



export type SectionProps = {
  children: ReactNode;
  color?: string;
  textColor?: string;
  paperTexture?: boolean;
  zIndex?: number;
  hideEyebrow?: boolean;
  eyebrow?: string;
  eyebrowHref?: string;
  eyebrowOpenInNewTab?: boolean;
  eyebrowCrumbs?: EyebrowCrumb[];
  heading: string;
};

export default function Section({
  heading,
  eyebrow,
  eyebrowCrumbs = [],
  eyebrowHref,
  eyebrowOpenInNewTab = false,
  hideEyebrow = false,
  children,
  color = "bg-canvas",
  textColor,
  paperTexture = false,
  zIndex = 15,
}: SectionProps) {
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
              : 0,

          paddingBottom: () =>
            window.innerWidth >= 1024
              ? 12
              : 0,

          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top",
            end: "bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
      const revealTimeline =
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            once: true,
          },
        });

      revealTimeline
        .from(headingElement, {
          autoAlpha: 0,
          y: 50,
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
          "-=0.7",
        );

      // const revealTimeline = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: section,
      //     start: "top 95%",

      //     once: true,
      //   },
      // });

      // revealTimeline
      //   .from(headingElement, {
      //     autoAlpha: 0,
      //     y: 32,
      //     duration: 0.8,
      //     ease: "power3.out",
      //   })
      //   .from(
      //     contentElement,
      //     {
      //       autoAlpha: 0,
      //       y: 32,
      //       duration: 0.8,
      //       ease: "power3.out",
      //     },
      //     "-=0.5",
      //   );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className={`${color} relative h-fit w-full ${paperTexture ? "isolate" : ""}`}
      style={{zIndex}}
    >
      {paperTexture && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/assets/paper-texture.svg')] bg-size-[125px_125px] bg-repeat mix-blend-multiply opacity-60"
        />
      )}
      <div className={`${paperTexture ? "relative" : ""} z-10 m-auto flex max-w-200 flex-col gap-md px-section-sides py-section-tb`}>
      <div
        ref={headingRef}
      >
        {!hideEyebrow && (
          <>
            {eyebrowCrumbs.length > 0 ? (
              <nav
                aria-label="Brödsmulor"
                className="mb-xs"
              >
                <ol className="flex flex-wrap items-center gap-xs font-eyebrow">
                  {eyebrowCrumbs.map(
                    (crumb, index) => {
                      const isLast =
                        index ===
                        eyebrowCrumbs.length - 1;
                    
                      return (
                        <li
                          key={`${crumb.label}-${index}`}
                          className="flex items-center gap-xs"
                        >
                          {crumb.href ? (
                            <Link
                              href={crumb.href}
                              target={
                                crumb.openInNewTab
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                crumb.openInNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="
                                text-muted
                                
                                transition-colors
                                hover:text-ink
                                hover:underline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-ink
                              "
                            >
                              {crumb.label}
                            </Link>
                          ) : (
                            <span
                              aria-current={
                                isLast
                                  ? "page"
                                  : undefined
                              }
                              className={
                                isLast
                                  ? "text-accent"
                                  : "text-muted"
                              }
                            >
                              {crumb.label}
                            </span>
                          )}

                          {!isLast && (
                            <span
                              aria-hidden="true"
                              className="text-muted"
                            >
                              /
                            </span>
                          )}
                        </li>
                      );
                    },
                  )}
                </ol>
              </nav>
            ) : eyebrow ? (
              <div className="mb-xs">
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
                    className={`w-fit font-eyebrow ${textColor ?? "text-muted hover:text-ink"}`}
                  >
                    {eyebrow}
                  </Link>
                ) : (
                  <span className={`font-eyebrow ${textColor ?? "text-muted"}`}>
                    {eyebrow}
                  </span>
                )}
              </div>
            ) : null}
          </>
        )}

          <h2 className={`font-heading ${textColor ?? "text-ink"} z-15 relative text-balance`}>
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-md" ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
}
