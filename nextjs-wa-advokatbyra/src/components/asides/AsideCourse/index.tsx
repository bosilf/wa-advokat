"use client";

import ButtonComp from "@/components/buttons/Button";
import TeamCardSmall, {
  TeamCardSmallType,
} from "@/components/cards/TeamCardSmall";
import Icon from "@/components/Icon";

import Link from "next/link";

type AsideCourseProps = {
  courseName: string;
  categoryName: string;
  length: string;
  teamCard: TeamCardSmallType;
  cost: string,
  date: string,
  link: string,
  bg?: string
};

export default function AsideCourse({
  teamCard,
  courseName,
  length,
  cost,
  date,
  bg

}: AsideCourseProps) {
  return (
    <aside
      className={`
        ${bg || 'bg-white'}
        -mt-xl
        
        lg:mt-0
        lg:sticky
        lg:top-0
        lg:h-screen
        py-section-tb
        px-lg
        left-0
        w-full
        flex
        flex-col
        gap-xl
      `}
    >
      <div className="flex flex-col gap-lg">
        <div>
          <p className="font-eyebrow text-muted">
            kursinfo
          </p>

          <h2 className="font-serif text-2xl lg:font-sans lg:text-xl font-semibold text-ink">
            {courseName}
          </h2>
        </div>

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
        <div className="grid grid-cols-[auto_1fr] gap-y-0 gap-sm grid-rows-[auto_auto] lg:grid-rows-[auto_auto_auto]">
          <p className="font-eyebrow text-muted mb-sm col-span-2">
            bokning
          </p>
        <ButtonComp variant="primary" className="lg:col-span-2" href="#bokning" showIcon={false} >Önska datum</ButtonComp>
        <ButtonComp variant="secondary" className="lg:col-span-2" href="/boka-kurs" showIcon>Fler kurser</ButtonComp>
        </div>
        </div>

        {/* <div className="border-b border-border w-full" /> */}
      </div>

      <div className="flex-col gap-md mt-auto hidden lg:flex">
        <Link href="/juridikkurser" className="group font-serif text-xl font-semibold hover:underline">
          <Icon name="arrowSerifLeft" size={15} /> Tillbaka till <span className="italic text-ink">juridikkurssidan</span>
        </Link>
      </div>
    </aside>
  );
}