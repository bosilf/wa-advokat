export type props = {
  hide?: boolean
}

const TeamCardSmall = ({hide}: props) => {
  return (
    <div hidden={hide} className="w-96 p-5 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
      <div className="self-stretch inline-flex justify-start items-center gap-3">
        <img className="size-10 p-2.5 rounded-full" src="https://placehold.co/40x40" />
        <div className="w-72 h-10 inline-flex flex-col justify-center items-start">
          <div className="self-stretch inline-flex justify-start items-center gap-1">
            <div className="justify-center text-black text-sm font-normal font-['Poppins'] leading-8">Av:</div>
            <div className="size- flex justify-start items-center gap-0.5">
              <div data-typografi="Default" className="size- flex justify-center items-center gap-2.5">
                <div className="justify-center text-colors-type-ink text-base font-semibold font-['Poppins']">Förnamn</div>
              </div>
              <div className="justify-center text-black text-base font-semibold font-['Poppins']"> </div>
              <div data-isvisible="true" data-property-1="Default" className="size- flex justify-center items-center gap-2.5">
                <div className="justify-center text-colors-type-ink text-base font-semibold font-['Poppins']">Efternamn</div>
              </div>
            </div>
          </div>
          <div data-hassecondtitle="true" className="size- inline-flex justify-start items-center gap-1">
            <div className="size- flex justify-center items-center gap-2.5">
              <div className="justify-center text-colors-type-body text-xs font-normal font-['Poppins']">title</div>
            </div>
            <div className="justify-center text-colors-type-body text-xs font-normal font-['Poppins']">|</div>
            <div className="size- flex justify-center items-center gap-2.5">
              <div className="justify-center text-colors-type-body text-xs font-normal font-['Poppins']">title</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamCardSmall