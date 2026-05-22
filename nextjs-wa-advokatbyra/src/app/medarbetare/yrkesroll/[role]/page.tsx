import Link from "next/link";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import RoleFilter from "@/components/RoleFilter";
import { EMPLOYEE_ROLE_QUERY } from "@/sanity/queries";
import PageHeader from "@/components/headers/PageHeader";

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  const data = await client.fetch(EMPLOYEE_ROLE_QUERY, { role });

  // Vi sparar rollens titel i en säker variabel först
  const currentRoleTitle = data?.role?.title || "";

  return (
    <div >
      <section className=" flex mx-0 flex-col justify-start items-center content-center p-6">
      <PageHeader pageName="medarbetare" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <div className="flex"> */}
        <RoleFilter />
        <div className="order-last">

        <Link href={'/medarbetare'}>Våra Medarbetare</Link> / {currentRoleTitle}
        </div>
        {/* className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8" */}
        <div       >

      </div>

        {data?.employees?.map((employee) => {
          const fName = employee.firstName || "";
          const lName = employee.lastName || "";
          const fullName = `${fName} ${lName}`.trim() || "Medarbetare";

          return (
            <Link
              key={employee._id}
              href={`/medarbetare/${employee.slug}`}
              className="group block border p-6 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
            >
              {employee.image && (
                <Image
                  src={urlFor(employee.image).width(600).url()}
                  alt={`Porträtt av ${fullName}${currentRoleTitle ? `, ${currentRoleTitle}` : ""} på WA Advokatbyrå`}
                  width={600}
                  height={400}
                  className="rounded-lg mb-4 object-cover"
                />
              )}

              <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {fullName}
              </h2>

              <div className="flex flex-row gap-2 w-full text-sm font-medium mt-3">
                {employee.roles?.map((role: any, index: number) => {
                  const roleSlug = typeof role.slug === 'object' ? role.slug.current : role.slug;
                  return (
                    <Link  
                      href={`/medarbetare/yrkesroll/${roleSlug}`}
                      key={index}
                      className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] place-self-end capitalize hover:bg-white bg-[#8AA2BD] text-white px-3 py-1 rounded-full border border-[#8AA2BD]"
                    >
                      {role.title}
                    </Link>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
      
      {(!data?.employees || data.employees.length === 0) && (
        <p className="text-gray-500 italic">Inga medarbetare hittades för denna kategori.</p>
      )}
      </section>
      
    </div>
  );
}
