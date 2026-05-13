import ActiveFilter from "../ActiveFilter"


const Header = () => {
  return (
    <div className="py-6 px-8 flex justify-center gap-8 border-b">
      <ActiveFilter href="/">Hem</ActiveFilter>
      <ActiveFilter href="/juridikkurser">Kurser</ActiveFilter>
      <ActiveFilter href="/medarbetare">Medarbetare</ActiveFilter>
    </div>
  )
}

export default Header