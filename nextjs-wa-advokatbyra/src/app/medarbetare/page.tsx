import { client } from "@/sanity/client";
import RoleFilter  from "@/components/RoleFilter";
import PageHeader from "@/components/headers/PageHeader";
import { EMPLOYEES_QUERY } from "@/sanity/queries";
import EmployeeCard from "@/components/EmployeeCard";


const options = { next: { revalidate: 30 } };

export default async function MedarbetarePage() {
  const employees = await client.fetch(EMPLOYEES_QUERY, {}, options);
  return (

    <section>
    <PageHeader pageName="medarbetare" />
    <section className=" flex mx-0 flex-col justify-start items-center content-center p-6">
        {employees.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8">
            <RoleFilter />
            {employees.map((employee) => (
              <EmployeeCard key={employee._id} employee={employee} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-8 text-center">Inga medarbetare hittades.</p>
        )}
        {employees.length === 0 && (
          <p className="text-gray-500">Inga medarbetare hittades.</p>
        )}
      </section>
      
    </section>
  );
}
