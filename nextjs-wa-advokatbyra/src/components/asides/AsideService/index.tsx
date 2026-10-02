"use client";

import ButtonComp from "@/components/buttons/Button";
import TeamCardSmall, {
  TeamCardSmallType,
} from "@/components/cards/TeamCardSmall";
import Icon from "@/components/Icon";

import Link from "next/link";

type AsideServiceProps = {
  service: string;
  experts: TeamCardSmallType[];
  bg?: string
};

export default function AsideService({
  experts,
  service,
  bg

}: AsideServiceProps) {
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
            rättsområde
          </p>

          <h2 className="font-serif text-2xl lg:font-sans lg:text-xl font-semibold text-ink">
            {service}
          </h2>
        </div>
        {experts && experts.length > 0 && (
          <>
            <p className="font-eyebrow text-muted mb-sm">
              {experts.length === 1 ? "Ansvarig inom rättsområdet" : "Ansvariga inom rättsområdet"}
            </p>
            {experts.map((expert, index) => (
              <div key={index}>
                <TeamCardSmall
                  link={expert.link}
                  image={expert.image}
                  caption={expert.caption}
                  name={expert.name}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="flex-col gap-md mt-auto hidden lg:flex">
        <Link href="/rattsomraden" className="group font-serif text-xl font-semibold hover:underline">
          <Icon name="arrowSerifLeft" size={15} /> Tillbaka till <br /><span className="italic text-ink">alla rättsområden</span>
        </Link>
      </div>
    </aside>
  );
}