"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { STUDENT_QUERY_RESULT } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/image";

import Icon from "../../Icon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StudentCardStudent = NonNullable<
  STUDENT_QUERY_RESULT
>;

export type StudentCardProps = {
  student: StudentCardStudent;
};

export default function StudentCard({
  student,
}: StudentCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
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
            }
          );
        }
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
            }
          );
        }
      );

      return () => {
        media.revert();
      };
    },
    {
      scope: cardRef,
    }
  );

  if (!student) return null;

  const name = student.name ?? "Student";
  const studentHref = "/studentpoolen";

  return (
    <article
      ref={cardRef}
      className="
        group relative overflow-hidden rounded-lg bg-white
        transition-shadow duration-300
        hover:shadow-lg
        focus-within:ring-2 focus-within:ring-accent
        focus-within:ring-offset-2
      "
    >
      <Link
              href={studentHref}
              aria-label={`Läs mer om Studentpoolen`}
              className="
                transition-colors
                after:absolute after:inset-0 after:z-20
                after:content-['']
                group-hover:text-accent
                focus-visible:outline-none
              "
      >
      <div className="relative aspect-4/5 overflow-hidden bg-surface">
        {student.image ? (
          <Image
            ref={imageRef}
            src={urlFor(student.image)
              .width(800)
              .height(1000)
              .url()}
            alt={student.image.alt ?? `Porträtt av ${name}`}
            fill
            sizes="
              (min-width: 1280px) 380px,
              (min-width: 768px) 33vw,
              50vw
            "
            className="scale-110 object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="
              grid h-full place-items-center
              font-subheading text-4xl text-ink/30
            "
          >
            {name.charAt(0)}
          </div>
        )}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-10
            flex flex-col items-center justify-center gap-xs
            bg-accent/70 text-white opacity-0
            backdrop-blur-sm transition-opacity duration-300
            group-hover:opacity-100
            group-focus-within:opacity-100
          "
        >
          <span className="font-body">
            Läs mer om
          </span>

          <span className="flex items-center gap-sm font-subheading">
            Studentpoolen

            <Icon
              name="arrow"
              size={15}
              className="text-white"
            />
          </span>
        </div>
      </div>

        <div className="relative w-full p-lg">
          <h3 className="font-subheading text-ink">
            {name}
          </h3>
          <p className="font-caption">
            Studentpoolen
          </p>
      </div>
      </Link>
    </article>
  );
}