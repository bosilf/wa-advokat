
import Button from "@/components/Button"
import Image from "next/image"
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";


export default async function HeroHome() {
  const homepage = await client.fetch(HOMEPAGE_QUERY)

  return (
    <section className="bg-accent overflow-hidden h-screen m-auto w-full justify-center bg-accent grid grid-rows-[2fr_1fr] grid-cols lg:grid-rows-1 lg:grid-cols-2"
    >
      <div className="absolute z-1 opacity-20 mix-blend-luminosity bg-linear-10 from-white to-ink overflow-hidden h-screen m-auto w-full">
      </div>
      <div className="absolute z-2 opacity-30 bg-blend-overlay bg-linear-145 from-canvas to-footer overflow-hidden h-screen m-auto w-full">
      </div>
      <div className="p-10 z-10 flex flex-col  justify-center gap-md">
      <h1 className=" flex flex-col displayHeading text-white" >
        <span className="text-white eyebrow">{homepage?.homeEyebrow} </span>
        {homepage?.homeTitle}
      </h1>
      <div className="flex gap-sm">
        <Button 
        href=""
        >Kontakta oss</Button>
        <Button 
        href=""
        >Läs mer</Button>
      </div>
      </div>
    <div className="h-full flex items-end">

    <div className="z-10 grid grid-cols-[1fr_1fr] h-100 -gap-20 w-full items-end">
      <div className="relative w-full h-[90%] min-w-[262px] -mr-10">
        <Image priority src="/assets/maria-frame.png" alt="" fill className="absolute object-contain object-bottom drop-shadow-2xl/30" />
      </div>
      <div className="relative w-full h-[100%] min-w-[262px] -ml-10">
        <Image priority src="/assets/sven-frame.png" alt="" fill className="absolute object-contain object-bottom drop-shadow-xl/30" />
      </div>
    </div>
    </div>
    </section>
  )
}