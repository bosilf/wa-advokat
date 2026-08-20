"use client"

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "../Icon";
import { EmployeeType } from "./din-fil-sökväg"; // Importera din uppdaterade typ ovanifrån

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type EmployeeCardProps = {
  employee: EmployeeType
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Säkra fallbacks mot null
  const firstName = employee.firstName ?? "Medarbetare";
  const lastName = employee.lastName ?? "";
  const employeeSlug = employee.slug ?? "#";
  const employeeName = `${firstName} ${lastName}`.trim();
  
  const roleTitles = employee.roles?.map(role => role.title) || [];
  let rolesText = "";
  if (roleTitles.length === 1) {
    rolesText = roleTitles[0];
  } else if (roleTitles.length > 1) {
    rolesText = roleTitles.slice(0, -1).join(", ") + " och " + roleTitles.slice(-1);
  }

  useGSAP(() => {
    if (!imageRef.current || !containerRef.current) return;

    gsap.fromTo(imageRef.current, 
      { yPercent: -5 },
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
    <li>
      <article ref={containerRef} className="aspect-2/3 rounded-lg w-full bg-white overflow-hidden group flex flex-col justify-between transition-all duration-400 hover:drop-shadow-lg">
        {employee.image && (
          <Link className="h-full flex-1" href={`/medarbetare/${employeeSlug}`}>
            <div className="overflow-hidden h-full relative">
              <h3 className="z-10 absolute h-full inset-0 bg-accent/70 backdrop-blur-lg opacity-0 transition-all duration-300 hover:opacity-100 flex flex-col items-center justify-center gap-1 select-none text-white font-body">
                Läs mer om 
                <span className="duration-300 flex w-fit gap-0 group-hover:gap-sm items-center">
                  {firstName} <Icon name="arrow" size={15} className="text-white" />
                </span>
              </h3>
              <Image
                ref={imageRef}
                src={urlFor(employee.image).fit('crop').width(800).height(900).url()}
                alt={`${employeeName}${rolesText ? `, ${rolesText}` : ''} på WA Advokatbyrå`}
                fill
                className="object-cover w-full scale-110 absolute inset-0 will-change-transform"
              />
            </div>
          </Link>
        )}
        <div className="flex flex-col p-6 bg-white">
          <Link href={`/medarbetare/${employeeSlug}`}>
            <h3 className="text-ink font-subheading">
              {employeeName}
            </h3>
          </Link>

          <div className="mt-2 h-min flex gap-1 text-body divide-x-1 font-caption">
            {employee.roles?.map((role, index: number) => {
              const roleSlug = role.slug ?? "#"; 
              return (
                <span className="flex justify-center flex-row pr-1 pl-1 first:pl-0" key={index}>
                  <Link  
                    className="hover:text-accent hover:underline"
                    href={`/medarbetare/yrkesroll/${roleSlug}`}
                  >
                    {role.title}
                  </Link>
                </span>
              )
            })}
          </div>
        </div>
      </article>
    </li>
  );
}