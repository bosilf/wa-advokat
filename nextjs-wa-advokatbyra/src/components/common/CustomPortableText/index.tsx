"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import { PortableText } from "@portabletext/react";
import type {
  PortableTextComponents,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from "@portabletext/react";

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

type LinkMark = {
  _type: "link";
  href?: string;
};

const components: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 font-body text-body marker:text-body">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-body marker:font-thin marker:text-body">
        {children}
      </ol>
    ),

    check: ({ children }) => (
      <ol className="mb-4 ml-6 list-item space-y-2 text-body marker:font-bold marker:text-body">
        {children}
      </ol>
    )
  },

  block: {
    normal: ({ children }) => (
      // Empty paragraphs from Sanity should occupy one line instead of collapsing.
      <p className="mb-4 min-h-[1lh] font-body text-body leading-relaxed">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="mt-sm min-h-[1lh] font-heading text-ink">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="min-h-[1lh] font-subheading text-ink">
        {children}
      </h3>
    ),

    eyebrow: ({ children }) => (
      <p className="min-h-[1lh] font-eyebrow text-muted">
        {children}
      </p>
    ),
    subheading: ({ children }) => (
      <p className="min-h-[1lh] font-subheading text-ink">
        {children}
      </p>
    ),

    h4: ({ children }) => (
      <h4 className="min-h-[1lh] font-eyebrow text-muted">
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
    }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href}
        className="font-bodybold text-ink transition-colors hover:text-accent"
      >
        {children}
      </a>
    ),
  },
};

type TextContent = PortableTextProps["value"] | ReactNode;

function isPortableText(value: TextContent): value is NonNullable<PortableTextProps["value"]> {
  const isBlock = (block: unknown) =>
    typeof block === "object" && block !== null && "_type" in block;

  return Array.isArray(value) ? value.every(isBlock) : isBlock(value);
}

export function CustomPortableText({
  value,
}: {
  value: TextContent;
}) {
  if (!isPortableText(value)) {
    return <>{value}</>;
  }

  return (
    <PortableText
      value={value}
      components={components}
    />
  );
}
