import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import PageHeaderImage from "../PageHeaderImage";


const PAGE_IMAGE_QUERY = `
  *[_type == "pageimage" && page == $page][0]{
    image {
      asset,
      crop,    
      hotspot  
    },
    pageColor
  }
`;


export default async function PageHeader({ pageName }: { pageName: string }) {
  const data = await client.fetch(PAGE_IMAGE_QUERY, { page: pageName });
  
  if (!data?.image) return null;
  const activeColor = data.pageColor || "#8AA2BD";

  return (
    <header className="w-screen  h-[70%] grid grid-rows-[1fr_8fr] p-3 pt-0 md:p-8 md:pt-0 mb-8">
      <h1 className="text-4xl capitalize self-center text-center font-bold my-6">{pageName}</h1>
      <PageHeaderImage image={data.image} activeColor={activeColor} />
    </header>
  );
}

