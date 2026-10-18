import { notFound } from "next/navigation";
import ContentPage from "@/components/pages/ContentPage";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug.length < 1 || slug.length > 3) notFound();
  return <ContentPage path={slug.join("/")} />;
}