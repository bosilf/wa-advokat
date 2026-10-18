import Link from "next/link";
import ImageComponent from "@/components/common/Image";
import ButtonComp from "@/components/buttons/Button";
import type { ArticleCardProps } from ".";
import TeamCardSmall from "../TeamCardSmall";

export default function FeaturedArticle({
  title,
  lead,
  link,
  writers,
  category,
  image
}: Pick<ArticleCardProps, "title" | "image" | "lead" | "link" | "writers" | "category">) {
  return (
    <article className={`mx-auto grid w-full grid-cols-1 gap-6 py-16 font-sans lg:gap-8 lg:py-30 ${image ? "lg:grid-cols-[2fr_3fr]" : ""}`}>
      {image && (
        <div className="relative hidden min-h-88 overflow-hidden rounded-2xl lg:block">
          <ImageComponent image={image} sizes="(min-width: 1200px) 480px, 40vw" />
        </div>
      )}
      <div className="flex min-w-0 max-w-200 lg:pr-xl flex-col items-start gap-6 lg:gap-8">
      <div className="flex flex-col gap-3">
        {category && <p className="font-eyebrow text-muted text-[10px]! leading-normal! tracking-[1.4px] lg:text-[0.7rem]!">{category}</p>}
        <h3 className="font-heading text-ink text-2xl! leading-[1.2]! tracking-[-0.02em] lg:text-5xl! lg:leading-none!">
          <Link href={link} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
            {title}
          </Link>
        </h3>
      </div>
      {writers && writers.length > 0 && (
        <div className="flex flex-wrap gap-2 ">
          {writers.map((writer, index) => {
            const name = [writer.firstName, writer.lastName].filter(Boolean).join(" ");
            const href = writer.slug?.current ? `/team/${writer.slug.current}` : undefined;
            const content = (
              <TeamCardSmall key={index} name={name} link={href} image={writer.image} caption={writer.roles?.filter((role): role is string => Boolean(role))} />
            );
            return href ? (
              <Link key={writer._id ?? index} href={href} className="flex items-center gap-3 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{content}</Link>
            ) : <div key={writer._id ?? index} className="flex items-center gap-3">{content}</div>;
          })}
        </div>
      )}
      {lead && (
        <div className="line-clamp-7 space-y-6 text-sm leading-normal font-bold tracking-[0.05em] text-body lg:line-clamp-none lg:text-base">
          {lead.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      )}
      <ButtonComp href={link} className="gap-3!">
        Läs hela artikeln
      </ButtonComp>
      </div>
    </article>
  );
}
