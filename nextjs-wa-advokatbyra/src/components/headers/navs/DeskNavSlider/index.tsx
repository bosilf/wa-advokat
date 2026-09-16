"use client";

import Link from "next/link";

import EmployeeNavCard from "@/components/cards/EmployeeNavCard";
import type { NavigationItems } from "../NavItems";

type DeskNavSliderProps = {
  items: NavigationItems;
  activeItemKey: string | null;
  onNavigate?: () => void;
};

export default function DeskNavSlider({
  items,
  activeItemKey,
  onNavigate,
}: DeskNavSliderProps) {
  const activeIndex = items.findIndex(
    (item) => item._key === activeItemKey,
  );

  const isOpen = activeIndex >= 0;
  const sliderIndex = Math.max(activeIndex, 0);

  return (
    <div
      id="desktop-navigation-slider"
      aria-hidden={!isOpen}
      className={`
        absolute left-1/3 top-full
        -translate-x-1/2
        h-min
        pt-sm
        transition-[opacity,transform,visibility]
        duration-300
        ${
          isOpen
            ? "visible pointer-events-auto translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-xs opacity-0"
        }
      `}
    >
      <div className="overflow-hidden rounded-lg bg-white/50 backdrop-blur-md text-ink shadow-xl">
        <div
          className="
            flex items-stretch
            transition-transform duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            transform: `translate3d(-${
              sliderIndex * 100
            }%, 0, 0)`,
          }}
        >
          {items.map((item, index) => {
            const isActive =
              index === activeIndex;

            return (
              <section
                key={item._key}
                aria-hidden={!isActive}
                className="min-h-64 w-full shrink-0 p-lg"
              >

                {item.dropdownSource ===
                "employees" ? (
                  <div className="grid grid-cols-1 gap-md">
                    {item.dropdownItems?.map(
                      (employee) => (
                        <EmployeeNavCard
                          key={employee._id}
                          employee={employee}
                          isActive={isActive}
                          onNavigate={
                            onNavigate
                          }
                        />
                      ),
                    )}
                  </div>
                ) : item.dropdownSource ===
                  "courses" ? (
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-lg">
                    {item.courses?.map(
                      (group) => (
                        <div key={group._key}>
                          <Link
                            href={group.href ?? "#"}
                            tabIndex={isActive ? undefined : -1}
                            onClick={onNavigate}
                            className="block rounded-sm p-xs font-subheading hover:bg-canvas"
                          >
                            {group.title}
                          </Link>

                          <div className="flex flex-col gap-xs">
                            {group.courses?.map(
                              (course) => (
                                <Link
                                  key={
                                    course._id
                                  }
                                  href={
                                    course.href ??
                                    "#"
                                  }
                                  tabIndex={
                                    isActive
                                      ? undefined
                                      : -1
                                  }
                                  onClick={
                                    onNavigate
                                  }
                                  className="
                                    rounded-sm
                                    p-xs
                                    transition-colors
                                    hover:bg-surface
                                    hover:text-accent
                                  "
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
                  <div className="grid grid-cols-2 gap-xs">
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
                          tabIndex={
                            isActive
                              ? undefined
                              : -1
                          }
                          onClick={
                            onNavigate
                          }
                          className="
                            rounded-sm
                            px-sm py-sm
                            font-body
                            transition-colors
                            hover:bg-surface
                            hover:text-accent
                          "
                        >
                          {
                            dropdownItem.title
                          }
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}