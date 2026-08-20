import Link from "next/link"
import type { ReactNode } from "react"

import Icon from "../Icon"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "simple"
  | "simpleWhite"

type ButtonIcon = "arrow" | "arrowSimple"

export type ButtonProps = {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  icon?: ButtonIcon
  showIcon?: boolean
  ariaLabel?: string
  download?: boolean
  target?: "_self" | "_blank"
}

export default function Button({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  showIcon = true,
  ariaLabel,
  download = false,
  target = "_self",
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "py-sm px-md bg-ink text-white rounded-full font-subheading hover:bg-accent",

    secondary:
      "py-sm px-md text-ink rounded-full outline outline-1 outline-ink outline-offset-[-1px] font-subheading hover:bg-ink hover:text-white",

    simple:
      "text-ink font-bodybold border-b-2 border-current",

    simpleWhite:
      "text-white font-bodybold border-b-2 border-current",
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      download={download || undefined}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`
        ${variantClasses[variant]}
        group
        inline-flex
        w-fit
        items-center
        justify-center
        gap-sm
        whitespace-nowrap
        transition-all
        duration-300
        hover:gap-md
      `}
    >
      <span>{children}</span>

      {showIcon && (
        <Icon
          name={icon}
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}