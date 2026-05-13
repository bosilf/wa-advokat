import { CustomPortableText } from "@/components/CustomPortableText";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export default async function EmployeePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const query = `
  *[_type == "employee" && slug.current == $slug][0]{
    
    name,
    "slug": slug.current,
    number,
    email,
    bio,
    image{
      asset,
      alt
    },
    "roles": roles[]->{ title, "slug": slug.current },
    educationList[]{
      school,
      yearStart,
      yearEnd
    }
  }
`;

  const data = await client.fetch(query, { slug });

  if (!data) return <div>Hittades inte...</div>;

  return (
    <main className="p-8">
      {data.image && (
        <Image
          src={urlFor(data.image).width(600).url()}
          alt={data.name || "Medarbetare"}
          width={600}
          height={400}
          className="rounded-lg mb-4 object-cover"
        />
      )}
      <h1 className="text-4xl font-bold">{data.name}</h1>
      <p>Telefon: {data.number}</p>
      <p>E-mail: {data.email}</p>
      <div className="flex flex-row gap-2 w-full text-sm font-medium">
        {data.roles?.map((role: any, index: number) => (
          <Link  
            href={`/medarbetare/yrkesroll/${role.slug}`}
            key={index}
            className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] hover:bg-white bg-[#8AA2BD] capitalize text-white px-3 py-1 rounded-full border border-[#8AA2BD]"

            // className="bg-[#8AA2BD] text-white px-3 py-1 rounded-full border border-[#8AA2BD]"
          >
            {role.title}
          </Link>
        ))}
      </div>
      <div className="prose mt-6">
        <PortableText value={data.bio} />
      </div>
    </main>
  );
}