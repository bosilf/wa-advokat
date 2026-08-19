'use client'
import Image from 'next/image'
// import styles from './mobile-menu.module.css'
import { useState } from 'react'
import HamburgerMenu from '../HamburgerMenu';

export const Navigation = ({updateFunction, category}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
        <HamburgerMenu />
            <div className={` ${isMenuOpen ? 'gap-4' : "gap-1" } animate-line-trim z-1000 flex flex-col `} onClick={toggleMenu}>
                <div className={`w-5 h-1 bg-ink`}></div>
                <div className={` w-5 h-1 bg-ink`}></div>
                <div className={` w-5 h-1 bg-ink`}></div>
                
            </div>
            <div className={`${isMenuOpen ? '' : ""}`} >
                <div className={` ${isMenuOpen ? '' : ""}`}>
                    {/* <Navigation updateFunction={ updateFunction } /> */}
                </div>
            </div>
            <div className={`'' ${isMenuOpen ? '' : "" }`} onClick={toggleMenu}></div>
        </>
    );
}

export default Navigation;