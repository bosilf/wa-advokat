import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/image";


const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const EMPLOYEES_QUERY = `*[
  _type == "employee"
  && defined(slug.current)
]|order(name asc)[0...12]{_id, name, slug}`; 

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const employees = await client.fetch<SanityDocument[]>(EMPLOYEES_QUERY, {}, options);
  const homepage = await client.fetch(homepageQuery)
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">{homepage?.heroTitle}</h1>
      {homepage.heroImage ? (
        <Image 
          src={urlFor(homepage.heroImage).url()} 
          alt={homepage.heroTitle}
          width={1600}
          height={900}
          priority
        />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-400">Bild saknas</span>
          </div>
      )}
      {/* <Image
        src={urlFor(homepage.heroImage).url()}
      /> */}
      <p>{homepage?.heroText}</p>
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="my-8" />
      <ul className="grid grid-cols-1 gap-y-4">
        {employees.map((employee) => (
          <li className="hover:underline border p-4 rounded-lg" key={employee._id}>
            <Link href='/medarbetare'>medarbetare</Link>
            <Link href={`/medarbetare/${employee.slug.current}`}>
              {/* Använd employee.name här! */}
              <h2 className="text-xl font-semibold">{employee.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}