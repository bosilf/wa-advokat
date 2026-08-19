import Link from "next/link";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import RoleFilter from "@/components/RoleFilter";
import { EMPLOYEE_ROLE_QUERY } from "@/sanity/queries";
import PageHeader from "@/components/headers/PageHeader";
import EmployeeCard from "@/components/EmployeeCard";

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const data = await client.fetch(EMPLOYEE_ROLE_QUERY, { role });
  const currentRoleTitle = data?.role?.title || "";

  return (
    <section className="relative">
      <PageHeader pageName="medarbetare" />
      <section className="flex mx-0 flex-col justify-start items-center content-center p-6">
      {/* <div className="absolute rotate-90 origin-left left-2 flex gap-2 h-min self-end text-grey-600">
        <Link 
          className="transition-all text-sm duration-200 hover:text-blue-400"
          href={'/medarbetare'}>medarbetare</Link>/
        <p className="underline text-sm"> {currentRoleTitle}</p>
      </div> */}
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8">
          <div className="col-span-full flex gap-8 align-center">
            <RoleFilter />
          </div>
          {data?.employees?.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))}
        </div>
        {(!data?.employees || data.employees.length === 0) && (
          <p className="text-gray-500 italic">Inga medarbetare hittades för denna kategori.</p>
        )}
      </section>
    </section>
  );
}
