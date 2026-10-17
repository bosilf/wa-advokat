import type { Metadata } from "next";


import { client } from "@/sanity/client";
import { ARTICLES_QUERY } from "@/sanity/queries";
import type { ARTICLES_QUERY_RESULT } from "@/sanity/sanity.types";

import HeroRegular from "@/components/heroes/HeroRegular";
import ArticleCard from "@/components/cards/ArticleCard";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Artiklar | WA Advokatbyrå",
  description:
    "Läs artiklar och aktuella juridiska insikter från WA Advokatbyrå inom bland annat offentlig upphandling och entreprenadrätt.",
};

export default async function ArticlesPage() {
  const articles =
    await client.fetch<ARTICLES_QUERY_RESULT>(
      ARTICLES_QUERY,
      {},
      {
        next: {
          revalidate,
        },
      },
    );

  return (
    <>
      <HeroRegular title="Artiklar" eyebrow="Kunskap & insikter" />

      <main>
        <section className="px-section-sides py-section-tb">
          <div className="m-auto max-w-300">
            <div className="mb-xl">
              <p className="font-eyebrow text-muted">
                Artiklar
              </p>

              <h2 className="font-heading text-ink">
                Aktuellt från WA Advokatbyrå
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  title={article.title ?? "Artikel"}
                  lead={article.excerpt}
                  link={`/artiklar/${article.slug}`}
                  image={article.image}
                  writers={article.writers}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}