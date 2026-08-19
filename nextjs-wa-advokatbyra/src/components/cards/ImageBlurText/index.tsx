export type props = {
  hide: boolean
}

const ImageBlurText = ({hide}: props) => {
  return (
    <div hidden={hide} className="self-stretch min-h-28 inline-flex flex-col justify-end items-start gap-2.5">
      <div className="self-stretch h-72 min-h-72 p-6 bg-blend-multiply bg-linear-273 from-colors-accent-accent-3 from 16% to-gray-400/0 to 65% backdrop-blur-[6.85px] flex flex-col justify-end items-start gap-3">
        <div data-color="Default" className="size- inline-flex justify-center items-center gap-2.5">
          <div className="justify-center text-fill text-[10px] font-medium font-['Poppins'] uppercase tracking-wider">kursutbud i</div>
        </div>
        <div data-type="Section" className="size- max-w-[650px] inline-flex justify-start items-center gap-2.5">
          <div className="flex-1 justify-center text-fill text-2xl font-semibold font-['Cormorant_Garamond'] leading-7">Offentlig upphandling</div>
        </div>
      </div>
    </div>
  )
}

export default ImageBlurText