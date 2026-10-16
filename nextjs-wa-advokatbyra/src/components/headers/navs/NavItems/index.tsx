"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NAVIGATION_QUERY_RESULT } from "@/sanity/sanity.types";

export type NavigationItems = NonNullable<
  NonNullable<NAVIGATION_QUERY_RESULT>["headerNavigation"]
>;

type NavItemsProps = {
  items: NavigationItems;
  mobile?: boolean;
  activeItemKey?: string | null;
  onDropdownChange?: (key: string | null) => void;
  onNavigate?: () => void;
};

export default function NavItems({
  items,
  mobile = false,
  activeItemKey = null,
  onDropdownChange,
  onNavigate,
}: NavItemsProps) {
  const pathname = usePathname();
  const useWhiteNavigation = pathname === "/" || /^\/team\/[^/]+\/?$/.test(pathname);

  return (
    <ul
      className={
        mobile
          ? "flex flex-col items-start gap-md"
          : `relative z-2000 flex items-center gap-lg ${useWhiteNavigation ? "" : "mix-blend-difference"}`
      }
    >
      {items.map((item) => {
        const href = item.resolvedLink?.href ?? "#";
        const label =
          item.resolvedLink?.label ?? "Namnlös länk";

        const isActive =
          item.hasDropdown &&
          activeItemKey === item._key;

        function activateDropdown() {
          if (mobile) return;

          onDropdownChange?.(
            item.hasDropdown ? item._key : null,
          );
        }

        function handleClick() {
          onDropdownChange?.(null);
          onNavigate?.();
        }

        return (
          <li
            key={item._key}
            className="relative"
            onMouseEnter={activateDropdown}
          >
            <Link
              href={href}
              onClick={handleClick}
              onFocus={activateDropdown}
              aria-haspopup={
                item.hasDropdown ? "true" : undefined
              }
              aria-expanded={
                item.hasDropdown
                  ? Boolean(isActive)
                  : undefined
              }
              aria-controls={
                item.hasDropdown
                  ? "desktop-navigation-slider"
                  : undefined
              }
              className={`
                ${!item.hasDropdown ? "relative group" : ""}
                relative block
                font-subheading
                ${mobile ? "text-ink focus-visible:outline-ink" : "text-white focus-visible:outline-white"}
                transition-colors duration-300
                focus-visible:outline-2
                focus-visible:outline-offset-4
              `}
            >
              {!item.hasDropdown &&
                <div className="absolute w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-current top-full left-0 " />
              }
              {label}

              {!mobile && item.hasDropdown && (
                <span
                  aria-hidden="true"
                  className={`
                    absolute -bottom-xs left-0
                    h-px bg-current
                    transition-[width] duration-300
                    ${
                      isActive
                        ? "w-full"
                        : "w-0"
                    }
                  `}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
