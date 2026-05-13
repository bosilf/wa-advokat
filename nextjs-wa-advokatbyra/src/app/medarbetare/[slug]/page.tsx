// import Link from "next/link";
// import { client } from "@/sanity/client";
// import { EMPLOYEES_QUERY } from "@/sanity/queries";
// import Image from "next/image";
// import { urlFor } from "@/sanity/image";
// import RoleFilter  from "@/components/RoleFilter";
// import PageHeader from "@/components/PageHeader";

// export default async function MedarbetarePage() {
//   const employees = await client.fetch(EMPLOYEES_QUERY);

//   return (
//     <div className="min-h-screen container flex flex-col mx-auto p-8">
//       <PageHeader pageName="medarbetare" />
//       <RoleFilter />
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {employees.map((employee) => (
//           // ÄNDRAT: Hela kortet är nu en div istället för en Link för att tillåta knappar/länkar inuti
//           <div 
//             key={employee._id} 
//             className="group block border p-6 rounded-xl hover:shadow-md transition-all bg-white"
//           >
//             {/* Bilden länkar till medarbetaren */}
//             {employee.image && (
//               <Link href={`/medarbetare/${employee.slug || ""}`}>
//                 <div className="relative w-full h-[300px] mb-4 overflow-hidden rounded-lg">
//                   <Image
//                     src={urlFor(employee.image).width(600).url()}
//                     alt={employee.name || "Medarbetare"}
//                     width={600}
//                     height={600}
//                     className="rounded-lg object-cover group-hover:scale-102 transition-transform duration-300"
//                   />
//                 </div>
//               </Link>
//             )}

//             {/* Namnet länkar till medarbetaren */}
//             <h2 className="text-2xl font-bold transition-colors">
//               <Link href={`/medarbetare/${employee.slug || ""}`} className="hover:text-blue-600">
//                 {employee.name}
//               </Link>
//             </h2>

//             {/* Yrkesroller (Länkarna här inuti kraschar inte längre) */}
//             <div className="text-gray-600 mt-4 capitalize">
//               <div className="flex flex-row flex-wrap gap-2 w-full text-sm font-medium">
//                 {employee.roles?.map((role, index: number) => (
//                   <Link  
//                     href={`/medarbetare/yrkesroll/${role.slug || ""}`}
//                     key={index}
//                     className="transition-all duration-300 ease-in-out hover:text-[#8AA2BD] hover:bg-white bg-[#8AA2BD] text-white px-3 py-1 rounded-full border border-[#8AA2BD]"
//                   >
//                     {role.title}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <Link 
//               href={`/medarbetare/${employee.slug || ""}`} 
//               className="text-blue-500 mt-4 inline-block font-medium hover:underline"
//             >
//               Läs mer →
//             </Link>
//           </div>
//         ))}
//       </div>

//       {employees.length === 0 && (
//         <p className="text-gray-500">Inga medarbetare hittades.</p>
//       )}
//     </div>
//   );
// }

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
          src={urlFor(employee.image).url()}
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