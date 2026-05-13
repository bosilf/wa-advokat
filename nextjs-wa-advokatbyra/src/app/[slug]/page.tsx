import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Image } from "next-sanity/image";

// Denna query hämtar dokumentet oavsett om det är post eller employee
const DATA_QUERY = `*[( _type == "post" || _type == "employee") && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const data = await client.fetch<SanityDocument>(DATA_QUERY, await params);

  if (!data) return <main className="p-8">Hittades inte...</main>;
  const imageUrl = data.image ? urlFor(data.image)?.width(550).height(310).url() : null;

  return (
    <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">← Tillbaka</Link>
      
      {imageUrl && (
        <Image src={imageUrl} alt={data.name || data.title} className="width-500px rounded-xl shadow-lg" />
      )}

      {/* Om det är en MEDARBETARE */}
      {data._type === "employee" && (
        <>
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="text-xl text-blue-600 font-medium">{data.role}</p>
          <div className="prose">
            {Array.isArray(data.bio) && <PortableText value={data.bio} />}
          </div>
          {data.educationList && (
            <div className="mt-4 border-t pt-4">
              <h2 className="text-2xl font-bold">Utbildning</h2>
              <ul className="list-disc pl-5">
                {data.educationList.map((edu: any, i: number) => (
                  <li key={i}>{edu.school} ({edu.year})</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Om det är ett BLOGGINLÄGG */}
      {data._type === "post" && (
        <>
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <p className="text-gray-500">Publicerad: {new Date(data.publishedAt).toLocaleDateString()}</p>
          <div className="prose">
            {Array.isArray(data.body) && <PortableText value={data.body} />}
          </div>
        </>
      )}
    </main>
  );
}


// app/medarbetare/[slug]/page.tsx
// import { client } from "@/sanity/lib/client"; // Din Sanity-klient
// import { PortableText } from "@portabletext/react";

// export default async function EmployeePage({ params }: { params: { slug: string } }) {
//   // Här hämtar vi data baserat på sluggen i URL:en
//   const query = `*[_type == "employee" && slug.current == $slug][0] {
//     name,
//     role,
//     image,
//     bio,
//     educationList
//   }`;
// 
//   const employee = await client.fetch(query, { slug: params.slug });
// 
//   if (!employee) return <div>Medarbetaren hittades inte.</div>;
// 
//   return (
//     <main>
//       <h1>{employee.name}</h1>
//       <p className="role">{employee.role}</p>
  // 
//       {/* Om du har bio som Portable Text */}
//       <div className="bio">
//         <PortableText value={employee.bio} />
//       </div>
  // 
//       {/* Din lista med utbildningar */}
//       {employee.educationList && (
//         <div className="education">
//           <h2>Utbildning</h2>
//           <ul>
//             {employee.educationList.map((edu: any, index: number) => (
//               <li key={index}>
//                 <strong>{edu.school}</strong> ({edu.year})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </main>
//   );
// }

// import { PortableText, type SanityDocument } from "next-sanity";
// import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
// import { client } from "@/sanity/client";
// import Link from "next/link";
// 
// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
// const EMPLOYEES_QUERY = `*[_type == "employee" && slug.current == $slug][0]`;
// 
// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? createImageUrlBuilder({ projectId, dataset }).image(source)
//     : null;
// 
// const options = { next: { revalidate: 30 } };
// 
// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
//   const postImageUrl = post.image
//     ? urlFor(post.image)?.width(550).height(310).url()
//     : null;
//     const employee = await client.fetch<SanityDocument>(EMPLOYEES_QUERY, await params, options);
//     const employeeImageUrl = employee.image
//       ? urlFor(employee.image)?.width(550).height(310).url()
//       : null;
//   return (
//     <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
//       <Link href="/" className="hover:underline">
//         ← Back to posts
//       </Link>
//       {postImageUrl && (
//         <img
//           src={postImageUrl}
//           alt={post.title}
//           className="aspect-video rounded-xl"
//           width="550"
//           height="310"
//         />
//       )}
//       <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
//       <div className="prose">
//         <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
//         {Array.isArray(post.body) && <PortableText value={post.body} />}
//       </div>
//       <Link href="/" className="hover:underline">
//         ← Back to employees
//       </Link>
//       {employeeImageUrl && (
//         <img
//           src={employeeImageUrl}
//           alt={employee.title}
//           className="aspect-video rounded-xl"
//           width="550"
//           height="310"
//         />
//       )}
//       <h1 className="text-4xl font-bold mb-8">{employee.title}</h1>
//       <div className="prose">
//         <p>Published: {new Date(employee.publishedAt).toLocaleDateString()}</p>
//         {Array.isArray(employee.body) && <PortableText value={employee.body} />}
//       </div>
//     </main>
//   );
// }
