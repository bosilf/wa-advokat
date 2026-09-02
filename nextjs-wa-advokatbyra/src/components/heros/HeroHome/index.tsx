import Button from "@/components/buttons/Button"
import Image from "next/image"
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";

export default async function HeroHome() {
  const homepage = await client.fetch(HOMEPAGE_QUERY)

  return (
    <section className="z-20 bg-accent overflow-hidden h-screen m-auto w-full justify-center bg-accent grid grid-rows-[2fr_2fr] grid-cols lg:grid-rows-1 lg:grid-cols-2">
      <div className="absolute z-1 opacity-20 mix-blend-luminosity bg-linear-10 from-white to-ink overflow-hidden h-screen m-auto w-full" />
      <div className="absolute z-2 opacity-30 bg-blend-overlay bg-linear-145 from-canvas to-footer overflow-hidden h-screen m-auto w-full" />
      <div className="pl-xl z-10 flex flex-col  justify-center gap-md">
        <h1 className=" flex flex-col font-heading text-white" >
          <span className="text-white font-eyebrow">{homepage?.homeEyebrow}</span>
          {homepage?.homeTitle}
        </h1>
        <div className="flex gap-sm">
          <Button href="" showIcon={false}>Kontakta oss</Button>
          <Button href="" variant="secondary">Läs mer</Button>
        </div>
      </div>
      <div className="h-full flex items-end">
        <div className="z-10 grid grid-cols-[55%_45%] h-full -gap-20 w-full items-end">
          <div className="relative w-full h-[90%] min-w-[262px] -mr-10">
            <Image priority src="/assets/maria-frame.png" alt="" sizes="min-w-[262]" fill className="absolute object-contain object-bottom drop-shadow-2xl/30" />
          </div>
          <div className="relative w-full h-[100%] min-w-[262px] -ml-10">
            <Image priority src="/assets/sven-frame.png" alt="" sizes="min-w-[262]" fill className="absolute object-contain object-bottom drop-shadow-xl/30" />
          </div>
        </div>
      </div>
    </section>
  )
}