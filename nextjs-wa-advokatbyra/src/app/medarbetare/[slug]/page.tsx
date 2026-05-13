// import { CustomPortableText } from "@/components/CustomPortableText";
import { CustomPortableText } from "@/components/CustomPortableText";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { EMPLOYEE_PAGE_QUERY } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";


export default async function EmployeePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const employee = await client.fetch(EMPLOYEE_PAGE_QUERY, { slug });


  if (!employee) return <div>Hittades inte...</div>;

  return (
    <main className="p-8">
      {employee.image && (
        <Image
          src={urlFor(employee.image).width(600).url()}
          alt={employee.name || "Medarbetare"}
          width={600}
          height={400}
          className="rounded-lg mb-4 object-cover"
        />
      )}
      <h1 className="text-4xl font-bold">{employee.name}</h1>
      <p>Telefon: {employee.number}</p>
      <p>E-mail: {employee.email}</p>
      <div className="flex flex-row gap-2 w-full text-sm font-medium">
        {employee.roles?.map((role, index: number) => (
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
        <CustomPortableText value={employee.bio} />
      </div>
    </main>
  );
}