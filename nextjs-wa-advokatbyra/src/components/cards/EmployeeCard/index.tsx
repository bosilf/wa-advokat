"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import type { EMPLOYEES_QUERY_RESULT } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/image";

import Icon from "../../Icon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type EmployeeCardEmployee = Pick<
  EMPLOYEES_QUERY_RESULT[number],
  "_id" | "firstName" | "lastName" | "slug" | "image" | "roles"
>;

export type EmployeeCardProps = {
  employee: EmployeeCardEmployee;
};

export default function EmployeeCard({
  employee,
}: EmployeeCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const firstName = employee.firstName ?? "";
  const lastName = employee.lastName ?? "";
  const employeeName =
    [firstName, lastName].filter(Boolean).join(" ") ||
    "Medarbetare";

  const initials =
    [firstName, lastName]
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase() || "WA";

  const roles =
    employee.roles?.filter((role) => Boolean(role.title)) ?? [];

  useGSAP(
    () => {
      if (!imageRef.current || !cardRef.current) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            imageRef.current,
            {
              yPercent: -4,
            },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      return () => media.revert();
    },
    {
      scope: cardRef,
    }
  )

  if (!employee.slug) {
    return null;
  }

  const employeeHref = `/medarbetare/${employee.slug}`;

  return (
    <article
      ref={cardRef}
      className="
        group relative overflow-hidden rounded-lg bg-white shadow-sm
        transition-shadow duration-300
        hover:shadow-lg
        focus-within:ring-2 focus-within:ring-accent
        focus-within:ring-offset-2
      "
    >
      <div className="relative aspect-4/5 overflow-hidden bg-surface">
        {employee.image ? (
          <Image
            ref={imageRef}
            src={urlFor(employee.image)
              .width(800)
              .height(1000)
              .url()}
            alt=""
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
            {initials}
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
          <span className="font-body">Läs mer om</span>

          <span className="flex items-center gap-sm font-subheading">
            {firstName || employeeName}

            <Icon
              name="arrow"
              size={15}
              className="text-white"
            />
          </span>
        </div>
      </div>

      <div className="relative p-lg">
        <h3 className="font-subheading text-ink">
          <Link
            href={employeeHref}
            aria-label={`Läs mer om ${employeeName}`}
            className="
              transition-colors
              after:absolute after:inset-0 after:z-20
              after:content-['']
              group-hover:text-accent
              focus-visible:outline-none
            "
          >
            {employeeName}
          </Link>
        </h3>

        {roles.length > 0 && (
          <ul
            aria-label={`Yrkesroller för ${employeeName}`}
            className="
              relative z-30 mt-sm flex flex-wrap
              divide-x divide-ink/20
              font-caption text-body
            "
          >
            {roles.map((role) => (
              <li
                key={role._id}
                className="px-xs first:pl-0 last:pr-0"
              >
                {role.slug ? (
                  <Link
                    href={`/medarbetare/yrkesroll/${role.slug}`}
                    className="
                      transition-colors
                      hover:text-accent hover:underline
                      focus-visible:text-accent
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-accent
                    "
                  >
                    {role.title}
                  </Link>
                ) : (
                  <span>{role.title}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}