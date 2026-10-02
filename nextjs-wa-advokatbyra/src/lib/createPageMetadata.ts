import type { Metadata } from "next";

type PageMetadataOptions = {
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
  fallbackTitle: string;
  fallbackDescription: string;
  notFound?: boolean;
};

export function createPageMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  notFound = false,
}: PageMetadataOptions): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    ...(notFound && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}