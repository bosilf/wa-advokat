"use client";

import ButtonComp from "@/components/buttons/Button";
import TeamCardSmall, {
  TeamCardSmallType,
} from "@/components/cards/TeamCardSmall";
import Icon from "@/components/Icon";

import Link from "next/link";

type AsideLargeProps = {
  courseName: string;
  categoryName: string;
  length: string;
  teamCard: TeamCardSmallType;
  cost: string,
  date: string,
  link: string,
  bg?: string
};

export default function AsideLarge({
  teamCard,
  courseName,
  length,
  cost,
  date,
  bg
}: AsideLargeProps) {
  return (
    <section
      className={`
        ${bg || 'bg-white'}
        
        lg:mt-0
        lg:sticky
        lg:top-0
        lg:h-screen
        py-section-tb
        lg:px-lg
        left-0
        w-full
        flex
        flex-col
        gap-xl
      `}
    >
      <div className="grid md:grid-cols-2 grid-cols-1 gap-lg">
        <div className="flex flex-col gap-md">
        <div>
          <p className="font-eyebrow text-muted mb-sm">
            Kursledare
          </p>

          <TeamCardSmall
            link={teamCard.link}
            image={teamCard.image}
            caption={teamCard.caption}
            name={teamCard.name}
            />
        </div>
          <div className="hidden md:block">
          <p className="font-eyebrow text-muted">
            kursnamn
          </p>

          <h2 className="font-serif text-2xl lg:font-sans lg:text-xl font-semibold text-ink">
            {courseName}
          </h2>
          </div>

          </div>
        <div className="flex flex-col gap-md">

        <div>
          <p className="font-eyebrow text-muted mb-sm">
            längd
          </p>

          <p className="font-semibold text-ink">
            {length}
          </p>
        </div>
        <div>
          <p className="font-eyebrow text-muted mb-sm">
            datum
          </p>

          <p className="font-semibold text-ink">
            {date}
          </p>
        </div>
        <div>
          <p className="font-eyebrow text-muted mb-sm">
            pris
          </p>

          <p className="font-semibold text-ink">
            {cost}
          </p>
        </div>
        </div>
        <div className="grid md:col-span-2 grid-cols-[auto_1fr] gap-y-0 gap-sm grid-rows-[auto_auto] lg:grid-rows-[auto_auto_auto]">
          <p className="font-eyebrow text-muted mb-sm col-span-2">
            bokning
          </p>
          <ButtonComp variant="primary" className="col-span-2" href="#bokning" showIcon={false} >Gör intresseanmälan</ButtonComp>
          <ButtonComp variant="secondary" className="col-span-2" href="/boka-kurs" showIcon>Boka fler kurser</ButtonComp>
        </div>

        {/* <div className="border-b border-border w-full" /> */}
      </div>

    </section>
  );
}