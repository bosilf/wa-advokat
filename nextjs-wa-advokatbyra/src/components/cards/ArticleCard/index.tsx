import Link from "next/link";
import ImageComponent, { type ImageCompProps } from "@/components/common/Image";
import type { ARTICLES_QUERY_RESULT } from "@/sanity/sanity.types";
import Icon from "@/components/Icon";
import FeaturedArticle from "./FeaturedArticle";
import ButtonComp from "@/components/buttons/Button";

export type ArticleCardProps = {
  title: string;
  featured?: boolean;
  featuredLead?: string | null;
  lead?: string | null;
  link: string;
  image?: ImageCompProps["image"];
  writers?: ARTICLES_QUERY_RESULT[number]["writers"];
  category?: string | null;
};

export default function ArticleCard({
  title,
  featured = false,
  featuredLead,
  lead,
  link,
  image,
  writers,
  category,
}: ArticleCardProps) {
  if (featured) {
    return <FeaturedArticle title={title} image={image} lead={featuredLead || lead} link={link} writers={writers} category={category} />;
  }

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
    <article className={`h-full relative isolate min-w-0 overflow-hidden rounded-2xl bg-accent font-sans text-ink shadow-sm transition-shadow hover:shadow-lg w-65 sm:w-full sm:min-h-20 sm:aspect-auto aspect-3/4`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="w-full absolute z-200 mix-blend-lighten h-full bg-linear-to-t from-accent to-accent/0" />
        <div className="w-full absolute z-100 mix-blend-color h-full bg-linear-to-t from-white to-accent" />
        <div className="opacity-70 h-full">
          <ImageComponent
            image={image}
            sizes={featured ? "(min-width: 1200px) 1200px, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          />
        </div>
      </div>
      <div
        className="relative z-10 flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >

        <div className={`relative flex flex-1 flex-col gap-3 p-6 lg:shrink-0 ${featured ? "justify-end md:p-10" : ""}`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/assets/paper-texture.svg')] bg-size-[125px_125px] mix-blend-multiply opacity-50"
          />
          {featured && <p className="relative font-eyebrow">Utvald artikel</p>}
          {category && <p className="relative font-eyebrow">{category}</p>}
          <Link 
        href={link}
          >
          <h3 className={`relative z-900 font-semibold group-hover:underline ${featured ? "max-w-200 font-heading" : "font-sans text-xl"}`}>
            {title}
          </h3>
          </Link>
          {lead && <p className="relative  z-900 line-clamp-4 max-w-200 text-sm">{lead}</p>}
          {byline && (
            <p className={`relative z-900 pt-3 font-caption ${featured ? "" : "mt-auto"}`}>
              Skriven av {byline}
            </p>
          )}
          <ButtonComp href={link} showIcon={false} variant="secondary" className={`z-900 ${featured ? "" : "mt-auto"}`}>
            Läs artikeln
          </ButtonComp>
        </div>
      </div>
    </article>
  );
}