import Link from "next/link"
import Icon from "../Icon"
import { ReactNode } from "react";
import { ButtonData } from "@/sanity/types";

export type ButtonProps = {
  b: ButtonData,
  children: ReactNode
}

export default function Button({ 
  b,
  children,

}: ButtonProps) {
  const { 
    title = "Läs mer om ",
    variant = "primary", 
    href = "#", 
    hasIcon = true, 
    icon = "arrow", 
    ariaLabel, 
    download = false, 
    target = "_blank" 
  } = b || {};

  const variantClasses = {
    primary: "py-sm px-md text-white bg-ink rounded-full font-subheading inline-flex justify-center items-center hover:bg-accent",
    secondary: "py-sm px-md text-ink rounded-full outline outline-1 font-subheading outline-offset-[-1px] outline-ink i justify-center items-center gap-6 overflow-hidden",
    simple: "text-ink font-bodybold  justify-center items-center gap-6 overflow-hidden border-b-2 ",
    simpleWhite: "text-white font-bodybold  justify-center items-center gap-6 overflow-hidden border-b-2 "
}

const iconsColor = {
  primary: "text-white",
  secondary: "text-ink",
  simple: "text-ink",
  simpleWhite: "text-white"
}


  return ( 
    <Link 
      className={`${variantClasses[variant]}  first-letter:capitalize lowercase w-fit flex no-wrap justify-center transition-all duration-300 gap-sm overflow-hidden group hover:gap-md`}
      href={href || ""}
      aria-label={ariaLabel}
      download={download}
      target={target}
    >
      {title} {children}
      { hasIcon && (
        <Icon name={icon || "arrow"} size="" className={`${iconsColor[variant]}`} />
      )}
    </Link>
  )
} 