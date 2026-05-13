import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const PAGE_IMAGE_QUERY = `
  *[_type == "pageimage" && page == $page][0]{
    image,
    pageColor
  }
`

export default async function PageHeader({ pageName }: { pageName: string }) {
  // Hämta datan direkt i komponenten (Server Component)
  const data = await client.fetch(PAGE_IMAGE_QUERY, { page: pageName })
  if (!data?.image) return null
  const activeColor = data.pageColor || "#8AA2BD"
  return (
    <div className="grow flex flex-col">
      <h1 className="text-4xl capitalize font-bold mb-8">{pageName}</h1>
      <div className={`grow grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_2fr] my-8`}>
        <div className="row-span-2 col-start-2 relative overflow-hidden border-x-4 border-t-4 rounded-t-lg">
          <Image 
            src={urlFor(data.image).url()}
            alt="Sidobild"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          style={{ backgroundColor: activeColor }} 
          className="row-start-2 rounded-l-lg">
        </div>
        <div 
          style={{ backgroundColor: activeColor }} 
          className={`col-start-3 row-start-2 rounded-r-lg`}>
        </div>
      </div>
    </div>
  )
}