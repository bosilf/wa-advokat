// import Image from "next/image"


import Nav from "../Navigation"

const NavMenu = () => {
  return (
    <nav className="">
      <div className="absolute top-0 w-full flex justify-between p-sm">
        {/* <Image src="../public/assets/wa-logo-white@2x (1).png" alt="" /> */}
        <div>logo</div>
        <div>telefon / mail</div>
      </div>
      <Nav />
    </nav>
  )
}

export default NavMenu