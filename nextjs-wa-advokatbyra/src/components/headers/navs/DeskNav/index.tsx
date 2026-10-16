"use client";

import { useEffect, useRef, useState } from "react";

import DeskNavSlider from "../DeskNavSlider";
import NavItems, {
  type NavigationItems,
} from "../NavItems";
import SearchField from "@/components/SearchField";

type DeskNavProps = {
  items: NavigationItems;
};

export default function DeskNav({
  items,
}: DeskNavProps) {
  const [activeItemKey, setActiveItemKey] = useState<
    string | null
  >(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  useEffect(() => () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
  }, []);

  const dropdownItems = items.filter(
    (item) => item.hasDropdown,
  );

  function closeNavigation() {
    cancelClose();
    setActiveItemKey(null);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(closeNavigation, 250);
  }

  function changeDropdown(key: string | null) {
    cancelClose();
    setActiveItemKey(key);
  }

  return (
    <header className="absolute hidden h-fit w-full justify-center grid-cols-[1fr_auto_1fr] p-lg md:grid">
      <nav
        aria-label="Huvudnavigation"
        className="relative col-start-2 col-span-1"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onBlur={(event) => {
          const nextElement =
            event.relatedTarget;

          if (
            !(nextElement instanceof Node) ||
            !event.currentTarget.contains(
              nextElement,
            )
          ) {
            closeNavigation();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeNavigation();

            if (
              document.activeElement instanceof
              HTMLElement
            ) {
              document.activeElement.blur();
            }
          }
        }}
      >
        <NavItems
          items={items}
          activeItemKey={activeItemKey}
          onDropdownChange={changeDropdown}
          onNavigate={closeNavigation}
        />

        <DeskNavSlider
          items={dropdownItems}
          activeItemKey={activeItemKey}
          onNavigate={closeNavigation}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      </nav>
      <div className="relative z-2000">
        <SearchField />
      </div>
    </header>
  );
}
