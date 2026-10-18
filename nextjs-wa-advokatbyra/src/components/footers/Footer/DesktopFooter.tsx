"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

const navigation = [
  ["Rättsområden", "/rattsomraden"],
  ["Medarbetare", "/om-oss"],
  ["Juridikkurser", "/juridikkurser"],
  ["Om oss", "/om-oss"],
  ["Kontakt", "/kontakt"],
];

const practiceAreas = [
  ["Avtalsrätt", "/rattsomraden/avtalsratt"],
  ["Entreprenadrätt och konsulträtt", "/rattsomraden/entreprenadjuridik"],
  ["Offentlig upphandling", "/rattsomraden/offentlig-upphandling"],
  ["Skadestånds- och försäkringsjuridik", "/rattsomraden"],
  ["Tvistelösning", "/rattsomraden"],
  ["Övrig affärsjuridik", "/rattsomraden"],
  ["Övrig juridik", "/rattsomraden"],
];

const headingClasses = "m-0! font-subheading text-[15px]! md:text-[17px]! lg:text-[19px]! leading-normal! text-white";
const linkClasses = "w-fit text-sm md:text-[15px] lg:text-base leading-[33px] text-white hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4";
const fieldClasses = "w-full bg-surface px-6 py-2 lg:py-3 font-sans text-[11px] lg:text-xs leading-normal text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function DesktopFooter() {
  const formId = useId();
  const [tested, setTested] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTested(true);
  }

  return (
    <div className="flex min-h-svh flex-col justify-between gap-8 bg-footer px-6 pt-16 pb-6 font-sans md:min-h-0 md:justify-start md:gap-12 md:px-8 md:pt-24 md:pb-8 lg:gap-16 lg:px-12 lg:pt-[120px] lg:pb-10 xl:px-20">
      <div className="grid grid-cols-2 items-start gap-4 md:gap-x-2.5 md:gap-y-12 lg:grid-cols-[1fr_1fr_1.5fr] lg:gap-x-3 lg:gap-y-16">
        <nav aria-label="Navigering i sidfoten" className="flex flex-col gap-0.5 md:gap-1">
          <h2 className={headingClasses}>Navigering</h2>
          <ul className="flex flex-col gap-0.5 md:gap-1">
            {navigation.map(([label, href]) => (
              <li key={label}><Link href={href} className={linkClasses}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Juridikkurser i sidfoten" className="flex flex-col gap-0.5 md:gap-1">
          <h2 className={headingClasses}>Juridikkurser</h2>
          <ul className="flex flex-col gap-0.5 md:gap-1">
            <li className="max-w-[168px]"><Link href="/entreprenadjuridik" className={linkClasses}>Entreprenadjuridik</Link></li>
            <li className="max-w-[168px]"><Link href="/offentlig-upphandling" className={linkClasses}>Offentlig upphandling</Link></li>
            <li>
              <Link href="/boka-kurs" className={`${linkClasses} inline-flex items-center gap-2.5`}>
                Boka kurs
                <Image src="/assets/footer/booking-arrow.svg" alt="" width={11.7} height={12.5187} unoptimized />
              </Link>
            </li>
          </ul>
        </nav>

        <form onSubmit={handleSubmit} aria-labelledby={`${formId}-heading`} className="col-start-2 relative z-15 row-start-2 row-span-2 hidden h-full md:flex min-w-0 flex-col gap-4 lg:col-start-3 lg:row-start-1 lg:gap-3 xl:pr-24">
          <h2 id={`${formId}-heading`} className={headingClasses}>Skicka ett meddelande!</h2>
          <label htmlFor={`${formId}-name`} className="sr-only">För- och efternamn</label>
          <input id={`${formId}-name`} name="name" autoComplete="name" placeholder="För- och efternamn" required className={`${fieldClasses} rounded-full`} />
          <label htmlFor={`${formId}-email`} className="sr-only">E-post</label>
          <input id={`${formId}-email`} name="email" type="email" autoComplete="email" placeholder="E-post" required className={`${fieldClasses} rounded-full`} />
          <label htmlFor={`${formId}-phone`} className="sr-only">Telefon</label>
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Telefon" className={`${fieldClasses} rounded-full`} />
          <label htmlFor={`${formId}-message`} className="sr-only">Meddelande</label>
          <textarea id={`${formId}-message`} name="message" placeholder="Skriv ett meddelande…" required className={`${fieldClasses} min-h-48 flex-1 resize-y rounded-[18px] lg:rounded-[20px]`} />
          <button type="submit" className="w-fit rounded-full bg-ink px-6 py-2 lg:py-3 font-subheading m-0! text-[17px]! lg:text-[19px]! leading-normal! text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Skicka meddelande</button>
          {tested && <p role="status" className="text-sm text-white">Formuläret är i testläge. Inget meddelande har skickats.</p>}
        </form>

        <nav aria-label="Rättsområden i sidfoten" className="col-span-2 col-start-1 row-start-2 flex flex-col gap-0.5 md:col-span-1 md:gap-1">
          <h2 className={headingClasses}>Rättsområden</h2>
          <ul className="flex flex-col gap-0.5 md:gap-1">
            {practiceAreas.map(([label, href]) => (
              <li key={label}><Link href={href} className={linkClasses}>{label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 col-start-1 row-start-3 mt-16 flex flex-col items-end gap-3 text-right text-xs leading-normal text-white md:col-span-1 md:mt-0 md:items-start md:gap-0 md:text-left md:text-[15px] md:leading-[33px] lg:col-span-3 lg:text-base">
          <Image src="/assets/footer/wa-logo-mobile.svg" alt="WA Advokatbyrå" width={115.6} height={54.06} unoptimized className="md:hidden" />
          <Image src="/assets/footer/wa-logo.svg" alt="WA Advokatbyrå" width={104.181} height={42.9609} unoptimized className="hidden md:order-last md:block lg:order-first" />
          <div className="flex flex-col">
            <span>Telefonnummer</span>
            <a href="mailto:default@wa-advokat.se" className="hover:underline underline-offset-4">
              <span className="md:hidden">E-mail address</span>
              <span className="hidden md:inline">default@wa-advokat.se</span>
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] leading-normal text-white md:text-border lg:text-xs">
        © {new Date().getFullYear()} WA Advokatbyrå KB | Org-nummer: 969776-0404 | Sibyllegatan 28, 114 43 Stockholm |{" "}
        <Link href="/cookies" className="hover:underline">Om cookies</Link> |{" "}
        <Link href="/integritetspolicy" className="hover:underline">WA integritetspolicy</Link>
      </p>
    </div>
  );
}
