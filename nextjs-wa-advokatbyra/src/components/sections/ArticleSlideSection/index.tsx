import ArticleCard, { ArticleCardProps } from "@/components/cards/ArticleCard";

export type ArticleSlideSectionProps = {
  articles: ArticleCardProps[];
}

export default function ArticleSlideSection({articles}: ArticleSlideSectionProps) {
  return (
    <section className="bg-canvas w-full h-fit">
      <div className="container py-lg">
        <h2 className="font-heading text-ink text-center mb-md text-balance">Senaste artiklar</h2>
        <div className="w-full h-fit border-muted border-r">
          <div className="h-full absolute right-0 w-2 bg-accent" />

        <ul className="flex gap-md overflow-x-auto snap-mandatory scrollbar-none">
          {articles && articles.slice(0, 3).map((article) => (
            <li className="w-150 flex-srink-0 snap-start" key={article.link}>
              <ArticleCard {...article} />
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}