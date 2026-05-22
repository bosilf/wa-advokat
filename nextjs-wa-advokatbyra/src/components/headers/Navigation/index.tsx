import ActiveFilter from "../../common/ActiveFilter"

const Nav = () => {
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
      justify-self-center 
      gap-4 
    bg-white/70 
      bg-[var(--bakgrund)] 
      bg-no-repeat 
      bg-origin-padding 
    rounded-[30px] opacity-100 backdrop-blur-[20px] uppercase">

      <ActiveFilter href="/">HEM</ActiveFilter>
      <ActiveFilter href="/juridikkurser">HEM</ActiveFilter>
      <ActiveFilter href="/medarbetare">Medarbetare</ActiveFilter>
    </div>
  )
}

export default Nav
