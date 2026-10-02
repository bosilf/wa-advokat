import Message from "./form";
import BackButton from "@/components/buttons/BackButton";

export default function BokaKursPage() {

  return (
    <main className=" m-auto h-screen flex flex-col justify-around">
      <Message />
      <BackButton 
        icon={{name: 'arrowSerifLeft'}} 
        className="flex p-3 mr-auto flex-row-reverse font-serif font-semibold text-lg gap-3 hover:cursor-pointer hover:underline " 
        text="Tillbaka till föregående sida" 
      />
    </main>
  )
}