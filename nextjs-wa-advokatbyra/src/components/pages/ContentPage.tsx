import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PAGE_BY_PATH_QUERY } from "@/sanity/queries";
import PageBuilder from "@/components/page-builder/PageBuilder";
import HeroRegular from "@/components/heroes/HeroRegular";

export default async function ContentPage({ path }: { path: string }) {
  const page = await client.fetch(
    PAGE_BY_PATH_QUERY,
    { path },
    { next: { revalidate: 30 } },
  );
  if (!page) notFound();

  return (
    <main>
      <HeroRegular />
      <PageBuilder sections={page.sections ?? []} />
    </main>
  );
}
