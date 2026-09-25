import Footer from "@/components/footers/Footer"
import Nav from "@/components/headers/navs/Nav"
import { ReactNode } from "react"

type Types = {
  children: ReactNode
}

export default function Layout({ children }: Types) {
  return (
    <>
    <Nav />
    { children }
    <Footer />
    </>
  )
}