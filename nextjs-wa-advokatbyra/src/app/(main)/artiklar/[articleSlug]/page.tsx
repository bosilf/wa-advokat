import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";

import { client } from "@/sanity/client";
import { ARTICLE_PAGE_QUERY } from "@/sanity/queries";
import type { ARTICLE_PAGE_QUERY_RESULT } from "@/sanity/sanity.types";

import HeroRegular from "@/components/heros/HeroRegular";
import { CustomPortableText } from "@/components/common/CustomPortableText";

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
    article.seo?.metaTitle ||
    `${article.title || "Artikel"} | WA Advokatbyrå`;

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

export default async function ArticlePage({
  params,
}: PageProps) {
  const { articleSlug } = await params;

  const article = await getArticle(articleSlug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <HeroRegular
        eyebrow="Artikel"
        title={article.title}
        image={article.image}
      />

      <main>
        <p>{article.title}</p>
      </main>
    </>
  );
}