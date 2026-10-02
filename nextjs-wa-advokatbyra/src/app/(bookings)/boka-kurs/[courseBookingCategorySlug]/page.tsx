import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { COURSE_BOOKING_QUERY } from "@/sanity/queries";
import Form, { type BookingCategory } from "./form";
import BackButton from "@/components/buttons/BackButton";

type PageProps = {
  params: Promise<{
    courseBookingCategorySlug: string;
  }>;
};

export default async function BookingCategoryPage({
  params,
}: PageProps) {
  const { courseBookingCategorySlug } = await params;

  const categories = await client.fetch<BookingCategory[]>(
    COURSE_BOOKING_QUERY,
    { courseBookingCategorySlug },
    { next: { revalidate: 30 } },
  );

  if (categories.length === 0) {
    notFound();
  }

  return (
    <main className=" m-auto h-screen flex flex-col justify-around">
      <Form
        categories={categories}
        title={categories[0]?.title}
      />
    <BackButton 
      icon={{name: 'arrowSerifLeft'}} 
      text="Tillbaka till föregående sida" 
      className="flex p-3 mr-auto flex-row-reverse font-serif font-semibold text-lg gap-3 hover:cursor-pointer hover:underline " 
    />
    </main>
  )
}