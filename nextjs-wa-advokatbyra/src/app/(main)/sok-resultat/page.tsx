import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { SEARCH_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Sökresultat | WA Advokatbyrå",
  robots: { index: false, follow: true },
};

const groups = [
  { type: "course", label: "Kurser" },
  { type: "courseCategory", label: "Kurskategorier" },
  { type: "service", label: "Rättsområden" },
  { type: "employee", label: "Medarbetare" },
  { type: "article", label: "Artiklar" },
] as const;

type SearchResult = {
  _id: string;
  _type: (typeof groups)[number]["type"];
  title: string | null;
  description: string | null;
  href: string;
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawSearch = Array.isArray(params.search) ? params.search[0] : params.search;
  const search = (rawSearch ?? "").trim().slice(0, 200);
  const tokens = search.match(/[\p{L}\p{N}]+/gu) ?? [];
  const results = tokens.length
    ? await client.fetch<SearchResult[]>(SEARCH_QUERY, {
        term: tokens.map((token) => `${token}*`).join(" "),
      })
    : [];

  return (
    <main id="main" className="mx-auto w-full max-w-200 px-section-sides pt-60 pb-section-tb">
      <h1 className="font-heading mb-md">Sök på webbplatsen</h1>
      <p className="mt-md mb-lg font-sans text-body">
        {!search
          ? "Sök efter kurser, rättsområden, medarbetare eller artiklar."
          : results.length
            ? `${results.length} träffar för ”${search}”.`
            : `Inga träffar för ”${search}”. Prova ett annat sökord.`}
      </p>
      {groups.map(({ type, label }) => {
        const matches = results.filter((result) => result._type === type);
        if (!matches.length) return null;

        return (
          <section key={type} aria-labelledby={`results-${type}`} className="mb-lg">
            <h2 id={`results-${type}`} className="font-heading-sm mb-md">
              {label} ({matches.length})
            </h2>
            <ul className="flex flex-col gap-md">
              {matches.map((result) => (
                <li key={result._id} className="min-w-0 rounded-md bg-white p-md wrap-anywhere">
                  <h3 className="font-subheading">
                    <Link href={result.href} className="text-ink underline underline-offset-4 hover:text-footer focus-visible:outline-2 focus-visible:outline-offset-2">
                      {result.title || "Namnlös sida"}
                    </Link>
                  </h3>
                  {result.description && (
                    <p className="mt-sm font-sans text-sm text-body">
                      {result.description.length > 200
                        ? `${result.description.slice(0, 200).trimEnd()}…`
                        : result.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}