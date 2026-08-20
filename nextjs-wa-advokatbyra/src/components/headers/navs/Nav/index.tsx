'use client'
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu";
import Icon from "@/components/Icon";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isListOpen, setIsListOpen] = useState(false)

  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const listToggle = () => {
    setIsListOpen(!isListOpen)
  }

  console.log('menustatus: ', isMenuOpen)

  return (
    <nav className={`${isMenuOpen ? "w-screen text-ink" : "w-0 text-ink/0"} transition-all duration-500 z-900 fixed h-screen top-0 bg-canvas align-center items-center flex flex-col`}>
      <HamburgerMenu toggleMenu={menuToggle} isOpen={isMenuOpen}  />
      <div className="h-50"></div>
      <div className={`${isMenuOpen ? "flex flex-col" : "hidden"} px-xl flex-1 w-full font-subheading gap-md`}>
        <button 
          className="w-fit flex gap-md"
          onClick={() => setIsListOpen(!isListOpen)}
        >
          Rättsområden
          <Icon className={`${!isListOpen ? "rotate-180" : "rotate-0"} transform-all duration-300`} name="arrowSimple" />
        </button>
        <ul 
          className={`${!isListOpen ? "block" : "hidden"} `}>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
        <p>Medarbetare</p>
        <p>Juridikkurser</p>
        <p>Om oss</p>
        <p>Kontakt</p>
        



      </div>
      <div className="h-50"></div>
    </nav>
  )
}