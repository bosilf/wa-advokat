import ButtonComp from "../buttons/Button";
import ShareCourseButton from "../buttons/ShareCourseButton";
import type { EMPLOYEES_QUERY_RESULT } from "@/sanity/sanity.types";
import Link from "next/link";
import Icon from "../Icon";

const categoryStyles: Record<string, string> = {
  entreprenadjuridik: "bg-contract-light max-h-min text-contract-dark hover:outline-2 outline-offset-1 hover:outline-accent",
  "offentlig-upphandling": "bg-procurement-light max-h-min text-procurement-dark hover:outline-2 outline-offset-1 hover:outline-procurement",
};

const categoryButtonStyles: Record<string, string> = {
  entreprenadjuridik: "hover:bg-contract-light! hover:text-contract-dark",
  "offentlig-upphandling": "hover:bg-procurement-light! hover:text-procurement-dark",
};

export type CourseCardProps = {
  name: string;
  description?: string | null;
  location?: string | null;
  cost?: string | null;
  dates?: string[] | null;
  length?: string | null;
  lecturer?: Pick<
    EMPLOYEES_QUERY_RESULT[number],
    "_id" | "firstName" | "lastName" | "slug" | "image" | "roles"
  > | null;
  type?: "digital" | "inPerson" | null;
  aim?: "company" | "open" | null;
  slug?: string | null;
  categorySlug?: string | null;
  categoryTitle?: string | null;
};

export default function CourseCard({
  name,
  description = "",
  location,
  cost,
  dates,
  length,
  type,
  slug,
  categorySlug,
  categoryTitle,
}: CourseCardProps) {
  const sortedDates = [...(dates ?? [])].sort();
  const categoryTagClassName = `col-span-full w-fit rounded-full px-3 py-1 font-eyebrow ${
    categoryStyles[categorySlug ?? ""] ?? "bg-gray-100 text-gray-900"
  }`;
  const courseDescription = description ?? "";
  const formatLabel =
    type === "digital" ? "Digitalt" : type === "inPerson" ? "På plats" : null;
  const locationLabel = [type !== "digital" ? location?.trim() : null, formatLabel]
    .filter(Boolean)
    .join(", ");
  const href =
    slug && categorySlug ? `/${categorySlug}/${slug}` : null;
  const words = courseDescription.trim().split(/\s+/);
  const excerpt =
    words.length > 15
      ? `${words.slice(0, 15).join(" ")}...`
      : courseDescription;

  return (
    <article className="group bg-white h-full gap-x-5 grid-cols-[auto_1fr_auto] md:grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_1fr_auto] grid-rows-auto min-w-0 max-w-full wrap-anywhere p-6 gap-2 rounded-md w-full grid drop-shadow-sm/0 hover:drop-shadow-md/10 transition-all duration-150">
      {categoryTitle && (
        categorySlug ? (
          <Link
            href={`/${categorySlug}`}
            className={categoryTagClassName}
          >
            {categoryTitle}
          </Link>
        ) : (
          <p className={categoryTagClassName}>{categoryTitle}</p>
        )
      )}
      <Link
        href={href || "#"}
        className="hover:underline no-underline decoration-ink/0 hover:decoration-footer transition-all duration-100 text-xl text-ink hover:text-footer font-bold font-['Poppins'] col-span-full cursor-pointer"
      >
        {name}
      </Link>
      <p className="font-caption col-span-full cursor-default mb-md">
        {length ? length : ""}
      </p>
      <ul className="col-span-full flex flex-col sm:flex-row flex-wrap gap-2 max-w-full mb-md">
        {locationLabel && (
          <li className="text-sm col-span-full items-center flex flex-row gap-2 font-bold cursor-default">
            <Icon name={type === "inPerson" ? "location" : "laptop"} size="" />{" "}
            <p>{locationLabel}</p>
          </li>
        )}
        <li className="text-sm flex items-center gap-2 font-bold cursor-default">
          <Icon name="house" size="" />{" "}
          <p>Öppen utbildning</p>
        </li>
        <li className="text-sm flex gap-2 font-bold cursor-default">
          <Icon name="pricetag" size="" />
          {cost?.trim()
            ? `Från ${new Intl.NumberFormat("sv-SE").format(Number(cost))} SEK`
            : "Enligt överenskommelse"}
        </li>
        {sortedDates.length > 0 && (
          <li className="text-sm font-semibold flex items-center gap-2 w-full cursor-default">
            <Icon name="calendar" size="" />
            {sortedDates.map((date, index) => (
              <span key={`${date}-${index}`}>
                {index > 0 && ", "}
                <time dateTime={date}>
                  {new Intl.DateTimeFormat("sv-SE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(`${date}T00:00:00Z`))}
                </time>
              </span>
            ))}
          </li>
        )}
      </ul>
      <p className="font-caption text-body col-span-full pb-2">{excerpt}</p>
      <ButtonComp
        href="/boka-kurs"
        variant="primary"
        showIcon={false}
        className={`col-span-1 max-h-min self-end ${
          categoryButtonStyles[categorySlug ?? ""] ?? "hover:bg-gray-100! hover:text-gray-900"
        }`}
        >
        Boka kurs
      </ButtonComp>
      <ShareCourseButton href={href} />
      <ButtonComp
        href="/boka-kurs"
        variant="custom"
        className="col-span-1 save-btn"
        icon="heartEmpty"
        >
        spara
      </ButtonComp>
    </article>
  );
}
