import type { Metadata } from "next";
import Link from "next/link";

import { client } from "@/sanity/client";
import { ARTICLES_QUERY } from "@/sanity/queries";
import type { ARTICLES_QUERY_RESULT } from "@/sanity/sanity.types";

import HeroRegular from "@/components/heros/HeroRegular";
import ImageComponent from "@/components/common/Image";

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
                <Link
                  key={article._id}
                  href={`/artiklar/${article.slug}`}
                  className="group flex flex-col"
                >
                  {article.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageComponent
                        image={article.image}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-sm pt-md">
                    {article.title && (
                      <p className="font-eyebrow text-muted">
                        {article.title}
                      </p>
                    )}

                    <h3 className="font-heading-sm text-ink group-hover:text-accent">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="font-body text-body">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}