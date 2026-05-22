"use client"; // Måste ligga högst upp för att kunna använda React-hooks och GSAP

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <article ref={containerRef} className=" group block flex flex-col justify-between mb-12">
        {employee.image && (
          <Link href={`/medarbetare/${employeeSlug}`}>
            {/* Ramen måste ha scale-105 eller h-[110%] på bilden så att det finns utrymme att flytta den utan att kanterna syns */}
            <div className="rounded-xl md:rounded-lg overflow-hidden w-full aspect-square relative">
              <div className="z-10 absolute inset-0 bg-[#8AA2BD]/60 backdrop-blur-xs opacity-0 transition-all duration-300 hover:opacity-100 flex flex-col items-center justify-center text-white p-4 gap-1 select-none">
                <div className="flex flex-col h-full w-full opacity-0 group-hover:opacity-100 justify-center transition-all delay-100 duration-300">
                  <h3 className="text-center break-all">{employee.firstName} {employee.lastName}</h3>
                  <p className="text-center font-medium break-all">{employee.number}</p>
                  <p className="text-center font-medium break-all">{employee.email}</p>
                </div>
              </div>
              <Image
                ref={imageRef}
                src={urlFor(employee.image)
                  .fit('crop')
                  .width(600)
                  .height(600)
                  .url()}
                alt={`${employeeName}${rolesText ? `, ${rolesText}` : ''} på WA Advokatbyrå`}
                fill
                className="object-cover w-full h-full scale-110 absolute inset-0 will-change-transform"
              />
            </div>
          </Link>
        )}
        
        <Link href={`/medarbetare/${employeeSlug}`}>
          <h2 className="text-2xl font-bold hover:text-blue-600 transition-colors mt-4">
            {employeeName}
          </h2>
        </Link>
        
        <div className="flex flex-col justify-between items-center mt-2">
          <div className="flex flex-wrap gap-1 w-full h-min text-xs md:text-sm font-medium">
            {employee.roles?.map((role, index: number) => {
              const roleSlug = typeof role.slug === 'object' ? role.slug.current : role.slug;
              return (
                <Link  
                  href={`/medarbetare/yrkesroll/${roleSlug}`}
                  key={index}
                  className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] hover:bg-white bg-[#8AA2BD] text-white px-2 py-sm rounded-full border border-[#8AA2BD]"
                >
                  {role.title}
                </Link>
              );
            })}
          </div>
          <Link className="text-[#8AA2BD] hover:text-blue-500 self-start text-sm capitalize whitespace-nowrap" href={`/medarbetare/${employeeSlug}`}>
              mer om {employee.firstName}
          </Link>
        </div>
      </article>
  );
}
