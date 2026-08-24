import Link from "next/link"

import { client } from "@/sanity/client"
import { NAVIGATION_QUERY } from "@/sanity/queries"

export default async function NavItems() {
  const navigation = await client.fetch(NAVIGATION_QUERY)

  const items = navigation?.headerNavigation ?? []

  return (
    <nav
      aria-label="Huvudnavigation"
      className="z-12000 bg-ink w-fit text-white h-full absolute top-0"
    >
      <ul className="flex items-center gap-md">
        {items.map((item) => (
          <li
            key={item._key}
            className="relative group"
          >
            <Link
              href={item.href ?? "#"}
              className="font-body hover:text-accent transition-colors"
            >
              {item.label}
            </Link>

            {item.hasDropdown && (
              <div className="absolute left-0 top-full pt-sm hidden group-hover:block z-50">
                <div className="min-w-64 rounded-lg bg-white text-ink shadow-lg p-sm">

                  {item.dropdownSource === "courses" ? (
                    <div className="flex gap-lg">
                      {item.courseGroups?.map((group) => (
                        <div
                          key={group._key}
                          className="min-w-52"
                        >
                          <p className="font-subheading mb-sm">
                            {group.title}
                          </p>

                          <div className="flex flex-col">
                            {group.items.map((course) => (
                              <Link
                                key={course._id}
                                href={course.href ?? "#"}
                                className="block px-sm py-xs hover:text-accent"
                              >
                                {course.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem._id}
                          href={dropdownItem.href ?? "#"}
                          className="block px-sm py-xs hover:text-accent"
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}