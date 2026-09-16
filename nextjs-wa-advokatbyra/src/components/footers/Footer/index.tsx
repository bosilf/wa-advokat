'use client'

import Button from "@/components/buttons/Button"
import Link from "next/link"
import {useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";


const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(
      () => {
        const footer = footerRef.current;
    
        if (
          !footer ||
          window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches
        ) {
          return;
        }
    
        gsap.fromTo(
          footer,
          {
            paddingTop: () =>
              window.innerWidth >= 1024 ? 280 : 85,
        
            paddingBottom: () =>
              window.innerWidth >= 1024 ? 0 : 0,
          },
          {
            paddingTop: () =>
              window.innerWidth >= 1024 ? 70 : 64,
        
            paddingBottom: () =>
              window.innerWidth >= 1024 ? 70 : 32,
        
            ease: "none",
        
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "top 10%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      },
      {scope: footerRef},
    );

    return (
        <footer ref={footerRef} className="z-2 overflow-hidden w-full h-screen bg-footer px-xl pt-16 pb-6 bg-blend-soft-light inline-flex flex-col justify-between items-end">
            <nav className="grid z-2 grid-cols-2 self-stretch justify-center items-start gap-4">
                <section className=" inline-flex flex-col justify-start items-start gap-0.5 cursor-default">
                    <h2 className="text-white font-bodybold">Navigering</h2>
                    <ul  className="text-white font-body flex flex-col gap-2">
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Rättsområden</Link>
                        </li>
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Medarbetare</Link>
                        </li>
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Juridikkurser</Link>
                        </li>
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Om oss</Link>
                        </li>
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Kontakt</Link>
                        </li>
                    </ul>
                </section>
                <section className="inline-flex flex-col justify-start items-start gap-0.5">
                    <h2 className="text-white font-bodybold cursor-default">Juridikkurser</h2>
                    <ul className="text-white font-body flex flex-col gap-2">
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Entreprenadjuridik</Link>
                        </li>
                        <li className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">
                            <Link href="/">Offentlig upphandling</Link>
                        </li>
                        <li>
                            <Button 
                            href=""
                            variant="simpleWhite"
                            >Boka kurs</Button>
                        </li>
                    </ul>
                </section>
                <section className="col-span-2 text-white flex flex-col gap-2">
                    <h2 className="flex-1 justify-start text-fill text-base font-semibold font-['Poppins'] cursor-default">Rättsområden</h2>
                    <ul>
                    <li className="w-40 inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Avtalsrätt</Link>
                    </li>
                    <li className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Entreprenadrätt och konsulträtt</Link>
                    </li>
                    <li className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Offentlig upphandling</Link>
                    </li>
                    <li className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Skadestånds- och föräkringsjuridik</Link>
                    </li>
                    <li className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Tvistelösning</Link>
                    </li>
                    <li className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Övrig affärsjuridik</Link>
                    </li>
                    <li className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <Link href="/" className="border-b-white/0 w-fit border-b hover:border-b-white duration-300 transform-all">Övrig juridik</Link>
                    </li>
                    </ul>
                </section>
            </nav>
            <section className="size- z-2 flex flex-col justify-start items-end gap-3">
                <div className="w-28 h-14 relative">
                    <div className="w-28 h-14 left-0 top-0 absolute overflow-hidden">
                        {/* <div className="w-16 h-14 left-0 top-0 absolute bg-white" />
                        <div className="w-11 h-14 left-[70.84px] top-[0.16px] absolute bg-white" /> */}
                    </div>
                </div>
                <p className="w-32 text-right justify-start text-white font-caption">Telefonnummer<br/>E-mail address</p>
            </section>
            <ul className="flex z-2 gap-y-1 gap-3 md:gap-0 flex-wrap self-stretch h-fit md:divide-x text-center justify-end text-white text-xs font-caption">
                <li className="md:px-2">© 2025 WA Advokatbyrå KB</li>
                <li className="md:px-2">Org-nummer: 969776-0404</li>
                <li className="md:px-2">Sibyllegatan 28, 114 43 Stockholm</li>
                <li className="md:px-2">Om cookies</li>
                <li className="md:px-2 md:pr-0">WA integritetspolicy</li>
            </ul>
            {/* <div className="w-screen z-0 left-0 right-0 overflow-hidden bg-footer fixed bottom-0 h-35" /> */}
        </footer>
    )
}

export default Footer