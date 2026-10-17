import Link from "next/link";
import ImageComponent, { type ImageCompProps } from "@/components/common/Image";
import type { ARTICLES_QUERY_RESULT } from "@/sanity/sanity.types";
import Icon from "@/components/Icon";

export type ArticleCardProps = {
  title: string;
  lead?: string | null;
  link: string;
  image?: ImageCompProps["image"];
  writers?: ARTICLES_QUERY_RESULT[number]["writers"];
  category?: string | null;
};

export default function ArticleCard({
  title,
  lead,
  link,
  image,
  writers,
  category,
}: ArticleCardProps) {
  const names = (writers ?? [])
    .map((writer) =>
      [writer.firstName, writer.lastName].filter(Boolean).join(" "),
    )
    .filter(Boolean);
  const byline =
    names.length > 1
      ? `${names.slice(0, -1).join(", ")} och ${names[names.length - 1]}`
      : names[0];

  return (
    <article className="h-full w-65 relative min-w-0 aspect-3/4 overflow-hidden rounded-2xl bg-footer font-sans text-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="absolute w-full h-full">
        {/* <div className="w-full absolute z-900 mix-blend-overlay bg-yellow-600" /> */}
        <div className="w-full absolute z-200 mix-blend-normal h-full bg-linear-to-t from-footer to-footer/0" />
        <div className="w-full absolute z-100 mix-blend-color h-full bg-linear-to-t from-footer to-accent" />
        <div className="opacity-50 h-full">
          <ImageComponent
            image={image}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
      <Link
        href={link}
        className="group z-900 flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
      >

        <div className="relative flex flex-1 flex-col gap-3 p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/assets/paper-texture.svg')] bg-size-[125px_125px] mix-blend-multiply opacity-50"
          />
          {category && <p className="relative font-eyebrow">{category}</p>}
          <h3 className="relative  z-900 font-sans text-xl font-semibold group-hover:underline">
            {title}
          </h3>
          {lead && <p className="relative  z-900 line-clamp-4 text-sm">{lead}</p>}
          {byline && (
            <p className="relative  z-900 mt-auto pt-3 font-caption">
              Skriven av {byline}
            </p>
          )}
          <span className="relative  z-900 mt-auto flex items-center gap-2 pt-3 font-subheading">
            Läs artikeln <Icon name="arrow" className="text-white" size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
