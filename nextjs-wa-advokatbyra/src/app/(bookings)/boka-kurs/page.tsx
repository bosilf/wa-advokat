import Message from "./form";
import BackButton from "@/components/buttons/BackButton";

export default function BokaKursPage() {

  return (
    <main className="p-4 max-w-300 m-auto h-screen flex flex-col justify-around">
      <Message />
      <BackButton 
        icon={{name: 'arrowSerifLeft'}} 
        className="flex flex-row-reverse font-serif font-semibold text-lg gap-3 hover:cursor-pointer hover:font-bold" 
        text="Tillbaka till föregående sida" 
      />
    </main>
  )
}