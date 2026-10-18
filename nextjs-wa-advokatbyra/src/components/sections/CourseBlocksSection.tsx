"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import Icon from "../Icon";

export type CourseBlockItem = {
  id: string;
  title: string;
  content?: ReactNode;
};

export type CourseBlocksSectionProps = {
  items?: readonly CourseBlockItem[];
  eyebrow?: string;
  heading?: string;
  description?: ReactNode;
  listTitle?: string;
  introContent?: ReactNode;
};

const defaultItems: CourseBlockItem[] = [
  {
    id: "kalkylforutsattningar",
    title: "Kalkylförutsättningar",
    content: <p className="whitespace-pre-line">För både beställare och entreprenörer är det viktigt att ha god kunskap om det juridiska regelverk som styr kalkylförutsättningarna. Detta är en viktig och grundläggande del av entreprenadjuridiken och blir styrande för vad som senare ska anses ingå i entreprenadavtalet. Lite förenklat är kalkylförutsättningarna den juridik som talar om vad entreprenören ska prissätta när han lämnar anbud samt vilka förutsättningar entreprenören ska räkna med, om det individuella entreprenadavtalet inte anger någonting särskilt. Det kan t ex rör vilket antal av någonting entreprenören ska räkna med i sitt anbud. Det kan också röra vilka förutsättningar entreprenören har rätt att utgå ifrån att han kommer att arbeta under, när entreprenadarbetena väl utförs. Särskilda regler har införts i standardavtalen AB 04 och ABT 06 i syfte att – så gott som det går – definiera vilka kalkylförutsättningar som gäller om inte parterna avtalar om någonting annat.

Om verkligheten avviker från kalkylförutsättningarna uppstår olika juridiska konsekvenser för parterna. Eftersom kalkylförutsättningarna styr vad entreprenören ska räkna med när han lämnar anbud, blir dessa styrande för vad som anses ingå i ett anbud som accepterats av beställaren, dvs vad som ingår i entreprenadavtalet. Kalkylförutsättningarna blir därför en entreprenadjuridisk utgångspunkt, som bland annat blir styrande för entreprenörens rätt till ekonomisk ersättning i projektet.

En grundläggande tanke är bakom kalkylförutsättningarna i AB 04 och ABT 06 är att anbuden ska vara jämförbara. Om olika entreprenören skulle räkna med olika saker när de lämnade anbud, skulle beställaren inte kunna jämföra anbuden. Beställaren skulle då inte kunna göra en upphandling i konkurrens. Det är viktigt för båda parter att ha god kunskap om det entreprenadjuridiska regelverket och vilka kalkylförutsättningar som branschens vanligaste standardavtal (AB 04 och ABT 06) föreskriver. Detta går vi igenom vid våra kurser i entreprenadjuridik.</p>,
  },
  { id: "formalia", title: "Formalia" },
];

export default function CourseBlocksSection({
  items = defaultItems,
  eyebrow = "Grundkurs i entreprenadjuridik",
  heading = "Detta lär du dig på en grundkurs",
  description = "Få en överblick över kursens innehåll och fördjupa dig i de delar som är relevanta för din vardag.",
  listTitle = "Entreprenadjuridik – kursinnehåll",
  introContent = <p>Välkommen till kursen! Här får du en introduktion till kursens innehåll och de moment vi går igenom. Välj ett kursmoment i listan eller börja med det första momentet för att fördjupa dig steg för steg.</p>,
}: CourseBlocksSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const selectedIndex = items.findIndex((item) => item.id === selectedId);
  const selectedItem = items[selectedIndex];
  const isIntro = selectedIndex === -1;

  return (
    <section id={sectionId} ref={sectionRef} className="bg-canvas relative z-15 font-sans w-full">
      <div className="max-w-250 gap-2 max-h-full relative grid grid-cols-1 md:grid-cols-[1fr_2fr] m-auto px-section-sides py-section-tb">
        <p className="font-eyebrow col-span-full">{eyebrow}</p>
        <h2 className="text-ink font-heading text-pretty">{heading}</h2>
        <div className="md:w-[80%] md:ml-auto md:items-end mb-md flex flex-col gap-md">
          <div className="text-balance md:text-right">{description}</div>
          <p className="rounded-full w-fit outline px-3 py-2 text-sm tracking-wider">
            {items.length} kursmoment
          </p>
        </div>

        <div className="order-2 min-w-0 md:order-0 md:mr-5">
          <h3>
            <button
              id={`${sectionId}-intro`}
              type="button"
              onClick={() => setSelectedId(null)}
              aria-pressed={isIntro}
              aria-controls={`${sectionId}-content`}
              className={`grid grid-cols-[1fr_auto] items-center text-sm tracking-wider gap-3 py-3.5 px-2.5 w-full text-left cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${isIntro ? "text-white bg-ink" : "text-ink hover:bg-gray-200"}`}
            >
              {listTitle}
              <Icon size={16} className={isIntro ? "text-white" : "text-ink"} name="arrowUpRight" />
            </button>
          </h3>
          <ol className="flex flex-col gap-1 list-none">
            {items.map((item, index) => (
              <li key={item.id}>
                <button
                  id={`${sectionId}-item-${index}`}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={index === selectedIndex}
                  aria-controls={`${sectionId}-content`}
                  className={`grid grid-cols-[auto_1fr_auto] items-center text-sm tracking-wider gap-3 cursor-pointer py-3.5 px-2.5 rounded-lg w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${index === selectedIndex ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-gray-200"}`}
                >
                  <span className={`text-sm ${index === selectedIndex ? "text-white" : "text-muted"}`}>{index + 1}</span>
                  <span>{item.title}</span>
                  <Icon size={16} className={index === selectedIndex ? "text-white" : "text-ink"} name="arrowUpRight" />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div
          id={`${sectionId}-content`}
          role="region"
          aria-labelledby={isIntro ? `${sectionId}-intro` : `${sectionId}-item-${selectedIndex}`}
          className="order-1 flex h-fit min-w-0 flex-col gap-3 bg-white rounded-3xl p-lg md:order-0"
        >
          <p className="font-eyebrow">{isIntro ? "intro" : `Kursmoment ${selectedIndex + 1} / ${items.length}`}</p>
          <h3 className="font-heading-sm">{isIntro ? listTitle : selectedItem.title}</h3>
          <div className="w-full h-px my-4 bg-border" />
          {isIntro ? introContent : selectedItem.content}
          {selectedIndex < items.length - 1 && (
            <button
              type="button"
              onClick={() => {
                setSelectedId(items[selectedIndex + 1].id);
                requestAnimationFrame(() => {
                  sectionRef.current?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                    block: "start",
                  });
                });
              }}
              className="inline-flex w-fit items-center gap-sm rounded-full bg-ink px-md py-sm font-subheading text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isIntro ? "Första kursmoment" : "Nästa kursmoment"}
              <Icon size={16} className="text-white" name="arrow" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
