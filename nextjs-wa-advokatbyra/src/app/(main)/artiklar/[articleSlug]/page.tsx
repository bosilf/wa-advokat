import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";

import { client } from "@/sanity/client";
import { ARTICLE_PAGE_QUERY } from "@/sanity/queries";
import type { ARTICLE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";

import { CustomPortableText } from "@/components/common/CustomPortableText";
import Section from "@/components/sections/Section";
import HeroArticlePage from "@/components/heroes/HeroArticlePage";
import TeamCardSmall from "@/components/cards/TeamCardSmall";

type PageProps = {
  params: Promise<{
    articleSlug: string;
  }>;
};

export const revalidate = 30;

const getArticle = cache(async (articleSlug: string) => {
  return client.fetch<ARTICLE_PAGE_QUERY_RESULT>(
    ARTICLE_PAGE_QUERY,
    {
      articleSlug,
    },
    {
      next: {
        revalidate,
      },
    },
  );
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { articleSlug } = await params;

  const article = await getArticle(articleSlug);

  if (!article) {
    return {
      title: "Artikeln kunde inte hittas | WA Advokatbyrå",
      description: "Den efterfrågade artikeln kunde inte hittas.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    article.seo?.metaTitle || `${article.title || "Artikel"} | WA Advokatbyrå`;

  const description =
    article.seo?.metaDescription ||
    `Läs ${article.title || "artikeln"} från WA Advokatbyrå.`;

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { articleSlug } = await params;

  const article = await getArticle(articleSlug);

  if (!article) {
    notFound();
  }

  const writers = (article.writers ?? [])
    .filter((writer) => writer && (writer.firstName || writer.lastName))
    .map((writer) => ({
      ...writer,
      name: [writer.firstName, writer.lastName]
        .filter(Boolean)
        .join(" ")
        .trim(),
      roleTitles: (writer.roles ?? [])
        .map((role) => role?.title)
        .filter((title): title is string => Boolean(title)),
    }));

  return (
    <>
    <div className="flex flex-col h-screen">

      <HeroArticlePage
        eyebrow="artikel"
        title={article.title}
        image={article.image}
        />
        <Section color="bg-canvas" heading={article!.title!}>
          <p className="text-ink">{article.excerpt}</p>
          <div className="grid mt-md md:grid-cols-[auto_1fr] gap-sm md:w-full">
            <p className="font-bold text-ink">Av:</p>
            {writers.length > 0 &&
              writers.map((writer) => (
                <TeamCardSmall
                  key={writer._id}
                  name={writer.name}
                  caption={writer.roleTitles.length > 0 ? writer.roleTitles : "Medarbetare"}
                  link={writer.slug ? `/team/${writer.slug}` : undefined}
                  image={writer.image}
                />
              ))}
          </div>
        </Section>
        </div>
        <section className="bg-surface">

          <div className="max-w-200 m-auto px-section-sides py-section-tb">
            <CustomPortableText value={article.body} />
          </div>
        </section>

      <main>
      </main>
    </>
  );
}