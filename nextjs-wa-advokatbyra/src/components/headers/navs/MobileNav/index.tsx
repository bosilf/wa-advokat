"use client";

import { useState } from "react";
import Link from "next/link";

import HamburgerMenu from "../HamburgerMenu";
import Icon from "@/components/Icon";

import type { NavigationItems } from "../NavItems";

type MobileNavProps = {
  items: NavigationItems;
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  function toggleDropdown(itemKey: string) {
    setOpenDropdown((current) =>
      current === itemKey ? null : itemKey,
    );
  }

  function closeMenu() {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }

  return (
    <nav
      aria-label="Mobilnavigation"
      className={`
        fixed right-0 top-0 z-[900]
        flex h-dvh flex-col items-center
        overflow-y-auto bg-canvas text-ink
        transition-[width] duration-500
        md:hidden
        ${isMenuOpen ? "w-screen" : "w-0"}
      `}
    >
      <HamburgerMenu
        toggleMenu={toggleMenu}
        isOpen={isMenuOpen}
      />

      <div className="h-50 shrink-0" />

      <div
        className={`
          w-full flex-1 px-xl font-subheading
          ${isMenuOpen ? "flex flex-col gap-md" : "hidden"}
        `}
      >
        {items.map((item) => {
          const isDropdownOpen = openDropdown === item._key;
          const dropdownId = `mobile-dropdown-${item._key}`;

          if (!item.hasDropdown) {
            return (
              <Link
                key={item._key}
                href={item.resolvedLink.href ?? "#"}
                onClick={closeMenu}
                className="
                  flex min-h-11 items-center
                  transition-colors
                  hover:text-muted
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-ink
                "
              >
                {item.resolvedLink.label}
              </Link>
            );
          }

          return (
            <div key={item._key}>
              <button
                type="button"
                aria-expanded={isDropdownOpen}
                aria-controls={dropdownId}
                onClick={() => toggleDropdown(item._key)}
                className="
                  flex min-h-11 w-full
                  items-center justify-between gap-md
                  text-left
                  transition-colors
                  hover:text-muted
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-ink
                "
              >
                <span>{item.resolvedLink.label}</span>

                <Icon
                  name="arrowSimple"
                  className={`
                    shrink-0 transition-transform duration-300
                    ${isDropdownOpen ? "rotate-180" : "rotate-0"}
                  `}
                />
              </button>

              <div
                id={dropdownId}
                hidden={!isDropdownOpen}
                className="pb-md pl-md pt-sm"
              >
                {item.dropdownSource === "courses" ? (
                  <div className="flex flex-col gap-lg">
                    {item.courses?.map((group) => (
                      <div key={group._key}>
                        {group.title && (
                          <p className="mb-sm font-subheading text-sm text-muted">
                            {group.title}
                          </p>
                        )}

                        <ul className="flex flex-col gap-sm font-body">
                          {group.courses?.map((course) => (
                            <li key={course._id}>
                              <Link
                                href={course.href ?? "#"}
                                onClick={closeMenu}
                                className="
                                  block py-xs
                                  transition-colors
                                  hover:text-muted
                                  focus-visible:outline-2
                                  focus-visible:outline-offset-2
                                  focus-visible:outline-ink
                                "
                              >
                                {course.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="flex flex-col gap-sm font-body">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <li key={dropdownItem._id}>
                        <Link
                          href={dropdownItem.href ?? "#"}
                          onClick={closeMenu}
                          className="
                            block py-xs
                            transition-colors
                            hover:text-muted
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-ink
                          "
                        >
                          {dropdownItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-50 shrink-0" />
    </nav>
  );
}