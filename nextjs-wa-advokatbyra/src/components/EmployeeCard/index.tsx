"use client"; // Måste ligga högst upp för att kunna använda React-hooks och GSAP

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "../Icon";

// Registrera ScrollTrigger så att GSAP kan lyssna på webbläsarens scroll
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EmployeeCardProps {
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
    number: string;
    email: string;
    slug: { current: string } | string; 
    image?: any;
    roles?: Array<{ title: string; slug: { current: string } | string }>;
  };
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const employeeSlug = typeof employee.slug === 'object' ? employee.slug.current : employee.slug;
  const roleTitles = employee.roles?.map(role => role.title) || [];

  let rolesText = "";
  if (roleTitles.length === 1) {
    rolesText = roleTitles[0];
  } else if (roleTitles.length > 1) {
    rolesText = roleTitles.slice(0, -1).join(", ") + " och " + roleTitles.slice(-1);
  }
  
  const firstName = employee.firstName || '';
  const lastName = employee.lastName || '';
  const employeeName = `${firstName} ${lastName}`;

  // GSAP Parallax-logik
  useGSAP(() => {
    if (!imageRef.current || !containerRef.current) return;

    gsap.fromTo(imageRef.current, 
      { 
        yPercent: -5
      },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,                   
        }
      }
    );
  }, { scope: containerRef });

  return (
    <article ref={containerRef} className="aspect-2/3 rounded-lg w-full bg-white overflow-hidden group block flex flex-col justify-between hover:drop-shadow-lg">
        {employee.image && (
          <Link className="h-full flex-1" href={`/medarbetare/${employeeSlug}`}>
            {/* Ramen måste ha scale-105 eller h-[110%] på bilden så att det finns utrymme att flytta den utan att kanterna syns */}
            <div className="overflow-hidden h-full relative ">
              <div className="z-10 absolute h-full inset-0 bg-accent/60 backdrop-blur-xs opacity-0 group transition-all duration-300 hover:opacity-100 flex flex-col items-center justify-center text-white gap-1 select-none">
                  <h3 className="flex flex-col justify-center text-colors-type-ink text-base font-semibold font-body">Läs mer om <span className="duration-300 flex w-fit gap-0 group-hover:gap-sm">{employee.firstName} <Icon name="arrow" size={15} className="text-white" /></span></h3>
              </div>
              <Image
                ref={imageRef}
                src={urlFor(employee.image)
                  .fit('crop')
                  .width(800)
                  .height(900)
                  .url()}
                alt={`${employeeName}${rolesText ? `, ${rolesText}` : ''} på WA Advokatbyrå`}
                fill
                className="object-cover w-full h-stretch scale-110 absolute inset-0 will-change-transform"
              />
            </div>
          </Link>
        )}
        <div className="flex flex-col p-6">
          <Link href={`/medarbetare/${employeeSlug}`}>
            <h3 className="justify-center text-colors-type-ink text-base font-semibold font-['Poppins']">
              {employeeName}
            </h3>
          </Link>

            <div className="mt-2 h-min flex gap-1 text-colors-type-body text-xs font-normal font-['Poppins']">
              {employee.roles?.map((role, index: number) => {
                const roleSlug = typeof role.slug === 'object' ? role.slug.current : role.slug;
                return (
                  <span className="flex justify-center gap-1 flex-row" key={index}>
                    <Link  
                    className="hover:text-accent hover:underline"
                    href={`/medarbetare/yrkesroll/${roleSlug}`}
                    >
                      {role.title}
                    </Link>
                    {index === 0 && employee.roles.length > 1 && (
                      <div className="w-[1px] h-fill my-0.5 bg-ink"></div>
                    )}
                  </span>
                );
              })}
            </div>
        </div>

      </article>
  );
}
