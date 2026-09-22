"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import { PortableText } from "@portabletext/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    useGSAP,
  );
}

type AnimatedStrongProps = {
  children: ReactNode;
};

function AnimatedStrong({
  children,
}: AnimatedStrongProps) {
  const strongRef =
    useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = strongRef.current;

      if (!element) return;

      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      if (prefersReducedMotion) {
        gsap.set(element, {
          backgroundSize: "10% 0.12em",
        });

        return;
      }

      gsap.to(element, {
        backgroundSize: "100% 20em",
        duration: 2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    },
    {
      scope: strongRef,
    },
  );

  return (
    <strong
      ref={strongRef}
      className="font-bodybold px-xs text-white mix-blend-difference"
      style={{
        backgroundImage:
          "linear-gradient(var(--color-accent), var(--color-accent))",

        backgroundPosition:
          "left",

        backgroundRepeat:
          "no-repeat",

        backgroundSize:
          "0% 0.12em",

        paddingBottom:
          "0.06em",
      }}
    >
      {children}
    </strong>
  );
}

const components = {
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 ml-6 list-disc space-y-2 font-body text-body marker:text-body">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-body marker:font-thin marker:text-body">
        {children}
      </ol>
    ),

    check: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-item space-y-2 text-body marker:font-bold marker:text-body">
        {children}
      </ol>
    )
  },

  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 font-body text-body leading-relaxed">
        {children}
      </p>
    ),

    h2: ({ children }: any) => (
      <h2 className="mt-sm font-heading text-ink">
        {children}
      </h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="font-sans text-lg first-of-type:mt-0 font-semibold mt-6 mb-3 text-ink">
        {children}
      </h3>
    ),

    h4: ({ children }: any) => (
      <h4 className="font-eyebrow text-muted">
        {children}
      </h4>
    ),
  },

  marks: {
    strong: ({
      children,
    }: {
      children: ReactNode;
    }) => (
      <AnimatedStrong>
        {children}
      </AnimatedStrong>
    ),

    link: ({
      children,
      value,
    }: any) => (
      <a
        href={value.href}
        className="font-bodybold text-ink transition-colors hover:text-accent"
      >
        {children}
      </a>
    ),
  },
};

export function CustomPortableText({
  value,
}: {
  value: any;
}) {
  return (
    <PortableText
      value={value}
      components={components}
    />
  );
}