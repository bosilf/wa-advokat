import Link from "next/link";
import type { ReactNode } from "react";

import Icon from "../../Icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "simple"
  | "simpleWhite"
  | "bookingCard"
  | "arrow"
  | "custom"
  | "booking"
  | "bookingSecondary";

export type ButtonIcon = "arrow" | "arrowSimple" | "heart" | "heartEmpty" | "share";

export type ButtonProps = {
  href: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  showIcon?: boolean;
  ariaLabel?: string;
  download?: boolean;
  className?: string;
  target?: "_self" | "_blank";
  person?: string;
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
  person,
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 py-sm px-md min-w-max bg-ink text-white rounded-full font-subheading hover:bg-accent active:bg-accent",

    secondary:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 py-sm  px-md min-w-max text-ink rounded-full outline outline-2 outline-ink outline-offset-[-1px] font-subheading active:bg-ink active:text-white hover:bg-ink hover:text-white",

    simple:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 text-ink hover:text-accent first-letter:uppercase font-body underline underline-offset-3",

    simpleWhite:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 text-white font-bodybold border-b-2 border-current",

    booking:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 py-md drop-shadow-xl/50 px-lg min-w-max bg-ink text-white rounded-full font-subheading hover:bg-footer active:bg-accent",

    bookingSecondary:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 py-md px-md min-w-max bg-white/30 hover:bg-white/0 text-shadow-lg/0 hover:text-shadow-lg/15 text-shadow-white text-outline-white backdrop-blur-sm hover:backdrop-blur-lg text-ink rounded-full font-subheading active:bg-accent",

    bookingCard:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 py-xs px-md min-w-max h-fit bg-ink text-white rounded-full font-subheading hover:bg-footer active:bg-footer",
    custom: "min-w-fit group/button",
    arrow:
      "group/button inline-flex w-fit items-center justify-center gap-sm transition-all duration-300 py-xs min-w-max h-fit text-ink font-subheading underline decoration-2 decoration-ink hover:decoration-footer/65 hover:text-footer active:decoration-footer",
  };

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
        
        ${showIcon && icon === "arrow" ? "active:gap-md hover:gap-md" : ""}
      `}
    >
      <span className="lowercase first-letter:uppercase">{children}</span>
      {person}

      {showIcon &&
        (icon === "heartEmpty" ? (
          <span
            aria-hidden="true"
            className="relative inline-flex size-4 shrink-0"
          >
            <Icon
              name="heartEmpty"
              size={16}
              className="transition-opacity duration-150 group-hover/button:opacity-0 group-active/button:opacity-0 group-focus-visible/button:opacity-0"
            />
            <span className="absolute inset-0 inline-flex">
              <Icon
                name="heart"
                size={16}
                className="opacity-0 transition-opacity duration-150 group-hover/button:opacity-100 group-active/button:opacity-100 group-focus-visible/button:opacity-100"
              />
            </span>
          </span>
        ) : (
          <Icon
            name={icon}
            size={16}
            className={`${showIcon && icon === "arrow" ? "transition-transform duration-300 group-active/button:translate-x-1 group-hover/button:translate-x-1" : ""} `}
          />
        ))}
    </Link>
  );
}
