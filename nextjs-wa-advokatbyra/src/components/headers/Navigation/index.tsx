'use client'
import { ChevronRightIcon } from "@heroicons/react/16/solid"
import ActiveFilter from "../../common/ActiveFilter"
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <div className="fixed top-2 z-50 p-3 px-4 w-max h-auto flex justify-self-center gap-4 bg-[#fffff] bg-no-repeat bg-origin-padding rounded-[30px] opacity-100 backdrop-blur-[36px]">
    <div className="
    fixed 
      top-2 
      z-50 
      p-3 
      px-6 
      w-max 
      h-auto 
      transition-all
      duration-300
    flex 
    tracking-widest
      justify-self-center 
      gap-6 
    bg-white/70 
      bg-[var(--bakgrund)] 
      bg-no-repeat 
      bg-origin-padding 
    rounded-[30px] opacity-100 backdrop-blur-[20px] uppercase">
      <ActiveFilter href="/">HEM</ActiveFilter>
      <div className="group flex">
      <ActiveFilter href="/juridikkurser">kurser
      </ActiveFilter>
      <div className="self-center">
          <ChevronRightIcon 
            className={`w-5 h-5 text-black transition-all duration-300
              ${isOpen ? "rotate-90" : "rotate-0 group-hover:rotate-90"}`} 
          />
        </div>
      </div>
      <ActiveFilter href="/medarbetare">Medarbetare</ActiveFilter>
    </div>
  )
}

export default Navigation
