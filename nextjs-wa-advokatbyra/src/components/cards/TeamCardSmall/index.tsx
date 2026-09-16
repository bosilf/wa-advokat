import Image from "next/image"

export type TeamCardSmallType = {
  hide?: boolean,
  name?: string,
  caption?: string,
  image?: string
}

const TeamCardSmall = ({hide, name, caption, image}: TeamCardSmallType) => {
  return (
    <div hidden={hide} className="w-96 p-5 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
      <div className="self-stretch inline-flex justify-start items-center gap-3">
        <Image className="size-10 p-2.5 rounded-full" src={image || "no image sr"} alt="" />
        <div className="w-72 h-10 inline-flex flex-col justify-center items-start">
          <div className="self-stretch inline-flex justify-start items-center gap-1">
            <div className="justify-center text-black text-sm font-normal font-['Poppins'] leading-8">Av:</div>
            <div className="size- flex justify-start items-center gap-0.5">
              <div data-typografi="Default" className="size- flex justify-center items-center gap-2.5">
                <div className="font-subheading text-ink">{name}</div>
              </div>
            </div>
          </div>
          <div data-hassecondtitle="true" className="size- inline-flex justify-start items-center gap-1">
            <div className="size- flex justify-center items-center gap-2.5">
              <div className="font-caption text-body">{caption}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamCardSmall