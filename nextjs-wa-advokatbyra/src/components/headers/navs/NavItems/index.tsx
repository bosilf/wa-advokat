import Link from "next/link";

import type { NAVIGATION_QUERY_RESULT } from "@/sanity/sanity.types";

export type NavigationItems = NonNullable<
  NonNullable<
    NAVIGATION_QUERY_RESULT
  >["headerNavigation"]
>;

type NavItemsProps = {
  items: NavigationItems;
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function NavItems({
  items,
  mobile = false,
  onNavigate,
}: NavItemsProps) {
  return (
    <ul
      className={
        mobile
          ? "flex flex-col items-start gap-md"
          : "flex items-center gap-lg"
      }
    >
      {items.map((item) => {
        const href =
          item.resolvedLink?.href ?? "#";

        const label =
          item.resolvedLink?.label ??
          "Namnlös länk";

        return (
          <li
            key={item._key}
            className="group relative"
          >
            <Link
              href={href}
              onClick={onNavigate}
              className="
                block font-subheading 
                text-ink
                transition-colors
                hover:text-muted
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-ink
                md:text-white
              "
            >
              {label}
            </Link>

            {!mobile && item.hasDropdown && (
              <div className="absolute left-0 top-full z-50 hidden pt-sm group-hover:block group-focus-within:block">
                <div className="min-w-64 rounded-lg bg-white p-sm text-ink shadow-lg">
                  {item.dropdownSource ===
                  "courses" ? (
                    <div className="flex gap-lg">
                      {item.courses?.map(
                        (group) => (
                          <div
                            key={group._key}
                            className="min-w-52"
                          >
                            <p className="mb-sm font-subheading">
                              {group.title}
                            </p>

                            <div className="flex flex-col">
                              {group.courses?.map(
                                (course) => (
                                  <Link
                                    key={course._id}
                                    href={
                                      course.href ??
                                      "#"
                                    }
                                    onClick={
                                      onNavigate
                                    }
                                    className="block px-sm py-xs hover:text-accent"
                                  >
                                    {
                                      course.title
                                    }
                                  </Link>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {item.dropdownItems?.map(
                        (dropdownItem) => (
                          <Link
                            key={
                              dropdownItem._id
                            }
                            href={
                              dropdownItem.href ??
                              "#"
                            }
                            onClick={onNavigate}
                            className="block px-sm py-xs hover:text-accent"
                          >
                            {dropdownItem.title}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}