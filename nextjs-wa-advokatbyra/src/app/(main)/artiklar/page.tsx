import type { Metadata } from "next";

import { client } from "@/sanity/client";
import { ARTICLES_QUERY } from "@/sanity/queries";
import type { ARTICLES_QUERY_RESULT } from "@/sanity/sanity.types";

import ArticleCard from "@/components/cards/ArticleCard";
import HeroArticlePage from "@/components/heroes/HeroArticlePage";
import DefaultImage from "../../../../public/assets/avtal.png";
import Section from "@/components/sections/Section";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Artiklar | WA Advokatbyrå",
  description:
    "Läs artiklar och aktuella juridiska insikter från WA Advokatbyrå inom bland annat offentlig upphandling och entreprenadrätt.",
};

export default async function ArticlesPage() {
  const articles = await client.fetch<ARTICLES_QUERY_RESULT>(
    ARTICLES_QUERY,
    {},
    {
      next: {
        revalidate,
      },
    },
  );

  const [featuredArticle, ...remainingArticles] = articles;

  return (
    <main>
      <div className="flex min-h-svh flex-col">
        <HeroArticlePage
          image={DefaultImage}
          title="Aktuellt från WA Advokatbyrå"
          eyebrow="Kunskap & insikter"
          className="h-[45svh]! min-h-64 md:h-auto!"
        />
        {featuredArticle && (
          <section
            aria-label="Utvald artikel"
            className="shrink-0 bg-canvas px-section-sides"
          >
            <ArticleCard
              featured
              featuredLead={featuredArticle.featuredLead}
              category={featuredArticle.topic}
              title={featuredArticle.title ?? "Artikel"}
              lead={featuredArticle.excerpt}
              link={`/artiklar/${featuredArticle.slug}`}
              image={featuredArticle.image}
              writers={featuredArticle.writers}
            />
          </section>
        )}
      </div>
      {remainingArticles.length > 0 && (
        <Section
        heading="Övriga artiklar"
        color="bg-surface"
          aria-label="Fler artiklar"
        >
          <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
            {remainingArticles.map((article) => (
              <ArticleCard
                key={article._id}
                category={article.topic}
                title={article.title ?? "Artikel"}
                lead={article.excerpt}
                link={`/artiklar/${article.slug}`}
                image={article.image}
                writers={article.writers}
              />
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
