"use client"

import { usePathname } from "next/navigation"

import HeroHome from "../HeroHome"
import HeroRegular from "../HeroRegular"

export default function Hero() {
  const pathname = usePathname()

  if (pathname === "/") {
    return<HeroHome />
  }

  return <HeroRegular />
}