"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface teamCardProps {
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

export default function TeamCard({ employee }: teamCardProps) {
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
      <article ref={containerRef} className="w-72 bg-muted rounded-2xl inline-flex flex-col justify-start items-center overflow-hidden">
    {employee.image && (
          <Link href={`/medarbetare/${employeeSlug}`}>
            {/* Ramen måste ha scale-105 eller h-[110%] på bilden så att det finns utrymme att flytta den utan att kanterna syns */}
            <div className="rounded-xl md:rounded-xl overflow-hidden w-full sm:min-w-60 aspect-4/5 relative ">
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
    {/* <img className="self-stretch h-80 relative" src="https://placehold.co/279x319" /> */}
    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-0.5">
        <div className="size- inline-flex justify-start items-center gap-0.5">
            <div data-typografi="Default" className="size- flex justify-center items-center gap-2.5">
                {/* <div className="justify-center text-colors-type-ink text-base font-semibold font-['Poppins']">{employee.firstName} {employee.lastName}Förnamn</div> */}
            </div>
            <div className="justify-center text-black text-base font-semibold font-['Poppins']"> </div>
            <div data-isvisible="true" data-property-1="Default" className="size- flex justify-center items-center gap-2.5">
                <div className="justify-center text-colors-type-ink text-base font-semibold font-['Poppins']">Efternamn</div>
            </div>
        </div>
        <div data-hassecondtitle="true" className="size- inline-flex justify-start items-center gap-1">
            <div className="size- flex justify-center items-center gap-2.5">
            <ul className="flex flex-wrap gap-1 w-full h-min text-xs md:text-sm font-medium">
            {employee.roles?.map((role, index: number) => {
              const roleSlug = typeof role.slug === 'object' ? role.slug.current : role.slug;
              return (
                <Link  
                href={`/medarbetare/yrkesroll/${roleSlug}`}
                key={index}
                className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] hover:bg-white bg-[#8AA2BD] text-white px-2 py-sm rounded-full border border-[#8AA2BD]"
                >
                  <li>
                    {role.title}
                  </li>
                </Link>
              );
            })}
          </ul>
                <div className="justify-center text-colors-type-body text-xs font-normal font-['Poppins']">title</div>
            </div>
            <div className="justify-center text-colors-type-body text-xs font-normal font-['Poppins']">|</div>
            <div className="size- flex justify-center items-center gap-2.5">
                <div className="justify-center text-colors-type-body text-xs font-normal font-['Poppins']">title</div>
            </div>
        </div>
    </div>
</article>
  )
}