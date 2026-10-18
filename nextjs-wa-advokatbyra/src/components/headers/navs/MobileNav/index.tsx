"use client";

import { useState } from "react";
import Link from "next/link";

import HamburgerMenu from "../HamburgerMenu";
import Icon from "@/components/Icon";

import type { NavigationItems } from "../NavItems";
import ButtonComp from "@/components/buttons/Button";

type MobileNavProps = {
  items: NavigationItems;
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [openCourseGroup, setOpenCourseGroup] = useState<string | null>(null);

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  function toggleDropdown(itemKey: string) {
    setOpenCourseGroup(null);
    setOpenDropdown((current) => (current === itemKey ? null : itemKey));
  }

  function closeMenu() {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenCourseGroup(null);
  }

  return (
    <nav
      aria-label="Mobilnavigation"
      className={`
        fixed right-0 top-0 z-900
        flex h-dvh flex-col items-center
        overflow-y-auto bg-canvas text-ink
        transition-[width] duration-500
        md:hidden
        ${isMenuOpen ? "w-screen" : "w-0"}
      `}
    >
      <HamburgerMenu toggleMenu={toggleMenu} isOpen={isMenuOpen} />

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
                <Link
                  onClick={isDropdownOpen ? closeMenu : undefined}
                  href={isDropdownOpen ? item!.resolvedLink!.href! : "#"}
                >
                  {item.resolvedLink.label}
                </Link>

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
                className="pb-md pt-sm"
              >
                {item.dropdownSource === "courses" ? (
                  <div className="flex flex-col gap-sm">
                    {item.courses?.map((group) => {
                      const groupKey = `${item._key}-${group._key}`;
                      const groupId = `mobile-course-group-${groupKey}`;
                      const isGroupOpen = openCourseGroup === groupKey;
                      return (
                        <div className="ml-2" key={group._key}>
                          <button
                            type="button"
                            aria-expanded={isGroupOpen}
                            aria-controls={groupId}
                            onClick={() => setOpenCourseGroup((current) => current === groupKey ? null : groupKey)}
                            className="flex min-h-11 w-full items-center justify-between gap-md text-left font-subheading text-sm text-ink hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                          >
                            {group.title ?? "Kurser"}
                            <Icon name="arrowSimple" className={`shrink-0 transition-transform duration-300 ${isGroupOpen ? "rotate-180" : "rotate-0"}`} />
                          </button>
                          <ul id={groupId} hidden={!isGroupOpen} className="flex flex-col gap-sm pl-md font-body">
                            {group.href && (
                              <li>
                                <Link href={group.href} onClick={closeMenu} className="block py-xs font-semibold hover:text-muted">
                                  Se alla kurser inom {group.title}
                                </Link>
                              </li>
                            )}
                            {group.courses?.map((course) => (
                              <li key={course._id}>
                                <Link href={course.href ?? "#"} onClick={closeMenu} className="block py-xs transition-colors hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                                  {course.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                    <ButtonComp href="/boka-kurs" showIcon={false}>boka kurs</ButtonComp>
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
