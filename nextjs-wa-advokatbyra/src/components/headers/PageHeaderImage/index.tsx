"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/image";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageHeaderImageProps {
  image: any; 
  activeColor: string;
}

export default function PageHeaderImage({ image, activeColor }: PageHeaderImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!imageRef.current || !containerRef.current) return;

    gsap.fromTo(imageRef.current, 
      { yPercent: -15 },
      {
        yPercent: 20,
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
    <div ref={containerRef} className="h-full grid grid-cols-[1fr_6fr_1fr] md:grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_3fr] md:grid-rows-[1fr_2fr] overflow-hidden mt-10 inset-shadow-900/100">
       {/* shadow-[2px_-1px_6px_3px_#00000029] */}
      <div ref={imageRef} className=" relative row-span-2 w-full col-start-2 relative overflow-hidden border-x-10 mt-3 border-t-10 rounded-t-[20px] shadow-xl/20">
        <Image 
          
          src={urlFor(image)
            .fit('fill')
            // .height(800)
            // .width(1200)
            .auto('format')
            .url()}
          alt="Sidobild med parallaxeffekt"
          sizes="true"
          fill
          className="object-cover w-[390px] h-[844ps] sm:w-[100%] md:h-[auto] scale-102 inset-0 will-change-transform"
          priority
        />
      </div>


      {/* Vänster färgblock */}
      <div style={{ backgroundColor: activeColor }} className="row-start-2 rounded-l-[30px]" />
      
      {/* Höger färgblock */}
      <div style={{ backgroundColor: activeColor }} className="col-start-3 row-start-2 rounded-r-[30px]" />
    </div>
  );
}




// interface PageHeaderImageProps {
//   imageUrl: string;
//   activeColor: string;
// }

// export default function PageHeaderImage({ imageUrl, activeColor }: PageHeaderImageProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useGSAP(() => {
//     if (!imageRef.current || !containerRef.current) return;

//     gsap.fromTo(imageRef.current, 
//       { yPercent: -15 },
//       {
//         yPercent: 20,
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: 1,
//         }
//       }
//     );
//   }, { scope: containerRef });

//   return (
//     <div ref={containerRef} className="grow grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_2fr] my-8 overflow-hidden mt-10">
      
//       {/* Parallax Bildbehållare */}
//       <div ref={imageRef} className="row-span-2 h-100 mt-4 col-start-2 relative overflow-hidden border-x-10 border-t-10 rounded-t-[20px] shadow-[2px_-1px_6px_3px_#00000029]">
//         <Image 
//           src={urlFor(imageUrl).url()}
//           alt="Sidobild med parallaxeffekt"
//           sizes="true"
//           fill
//           className="object-cover scale-115 absolute inset-0 will-change-transform"
//           priority
//         />
//       </div>

//       {/* Vänster färgblock */}
//       <div
//         style={{ backgroundColor: activeColor }} 
//         className="row-start-2 rounded-l-[30px]"
//       />
      
//       {/* Höger färgblock */}
//       <div 
//         style={{ backgroundColor: activeColor }} 
//         className="col-start-3 row-start-2 rounded-r-[30px]"
//       />
//     </div>
//   );
// }
