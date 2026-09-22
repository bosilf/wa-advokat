import Link from "next/link";
import type { ReactNode } from "react";

import Icon from "../../Icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "simple"
  | "simpleWhite";

export type ButtonIcon =
  | "arrow"
  | "arrowSimple";

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  showIcon?: boolean;
  ariaLabel?: string;
  download?: boolean;
  className?: string;
  target?: "_self" | "_blank";
};

export default function ButtonComp({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  showIcon = true,
  ariaLabel,
  download = false,
  target = "_self",
  className,
}: ButtonProps) {

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "py-sm px-md bg-ink text-white rounded-full font-subheading hover:bg-accent active:bg-accent",

    secondary:
      "py-sm px-md text-ink rounded-full outline outline-2 outline-ink outline-offset-[-1px] font-subheading active:bg-ink active:text-white hover:bg-ink hover:text-white",

    simple:
      "text-ink hover:text-accent first-letter:uppercase font-body underline underline-offset-3",

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
        ${className}
        group
        inline-flex
        w-fit
        items-center
        justify-center
        gap-sm
        transition-all
        duration-300
        active:gap-md
        hover:gap-md
        
      `}
    >
      <span className="lowercase first-letter:uppercase">{children}</span>

      {showIcon && (
        <Icon
          name={icon}
          size={15}
          className="transition-transform duration-300 group-active:translate-x-1 group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}