import { notFound } from "next/navigation";

import { client } from "@/sanity/client";
import { PAGE_BY_PATH_QUERY } from "@/sanity/queries";
import PageBuilder from "@/components/page-builder/PageBuilder";
import HeroRegular from "@/components/heros/HeroRegular";

const options = {
  next: {
    revalidate: 30,
  },
};

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function DynamicPage({
  params,
}: PageProps) {
  const { slug } = await params;

  if (slug.length < 1 || slug.length > 3) {
    notFound();
  }

  const path = slug.join("/");

  const page = await client.fetch(
    PAGE_BY_PATH_QUERY,
    { path },
    options,
  );

  if (!page) {
    notFound();
  }

  return (
    <main>
      <HeroRegular />
      <PageBuilder sections={page.sections ?? []} />
    </main>
  );
}