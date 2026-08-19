'use client'
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu";

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
    <nav className="z-900 w-screen h-screen top-0 bg-canvas align-center items-center flex flex-col">
      <HamburgerMenu toggleMenu={menuToggle} isOpen={isMenuOpen}  />
      <div className="h-50"></div>
      <div className={`${isMenuOpen ? "flex flex-col" : "hidden"} px-xl flex-1 w-full font-subheading gap-md`}>
        <button 
          onClick={() => setIsListOpen(!isListOpen)}
        >
          Rättsområden
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