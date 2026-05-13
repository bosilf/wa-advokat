export default function Page() {
  return (
    <>slug</>
  )
}

//import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
// import { client } from "@/sanity/client";
// import Link from "next/link";
// import Image from "next/image";
// import { DATA_QUERY } from "@/sanity/queries";
// import { CustomPortableText } from "@/components/CustomPortableText";

// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

// export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
//   const data = await client.fetch(DATA_QUERY, await params);

//   if (!data) return <main className="p-8">Hittades inte...</main>;
  
//   const imageUrl = data.image ? urlFor(data.image)?.width(550).height(310).url() : null;

//   return (
//     <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
//       <Link href="/" className="hover:underline">← Tillbaka</Link>
      
//       {imageUrl && (
//         <Image 
//           src={imageUrl} 
//           alt={("name" in data ? data.name : "title" in data ? data.title : "") || "Bild"} 
//           width={550}
//           height={310}
//           className="w-full md:w-[500px] rounded-xl shadow-lg object-cover" 
//         />
//       )}

//       {/* Om datan är en medarbetare */}
//       {data._type === "employee" && (
//         <>
//           <h1 className="text-4xl font-bold">{data.name}</h1>
//           <CustomPortableText value={data.role} />
//           <div className="prose">
//             {Array.isArray(data.bio) && <CustomPortableText value={data.bio} />}
//           </div>
//           {data.educationList && (
//             <div className="mt-4 border-t pt-4">
//               <h2 className="text-2xl font-bold">Utbildning</h2>
//               <ul className="list-disc pl-5">
//                 {data.educationList.map((edu: { school?: string; year?: string }, i: number) => (
//                   <li key={i}>{edu.school || "Skola"} ({edu.year || "År"})</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}

//       {data._type === "post" && (
//         <>
//           <h1 className="text-4xl font-bold">{data.title}</h1>
//           {data.publishedAt && (
//             <p className="text-gray-500">
//               Publicerad: {new Date(data.publishedAt).toLocaleDateString()}
//             </p>
//           )}
//           <div className="prose">
//             {Array.isArray(data.body) && <CustomPortableText value={data.body} />}
//           </div>
//         </>
//       )}
//     </main>
//   );
// }