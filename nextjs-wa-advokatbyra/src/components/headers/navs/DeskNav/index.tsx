"use client";

import { useState } from "react";

import DeskNavSlider from "../DeskNavSlider";
import NavItems, {
  type NavigationItems,
} from "../NavItems";

type DeskNavProps = {
  items: NavigationItems;
};

export default function DeskNav({
  items,
}: DeskNavProps) {
  const [activeItemKey, setActiveItemKey] = useState<
    string | null
  >(null);

  const dropdownItems = items.filter(
    (item) => item.hasDropdown,
  );

  function closeNavigation() {
    setActiveItemKey(null);
  }

  return (
    <header className="absolute z-200 hidden h-fit w-full justify-center p-lg md:flex">
      <nav
        aria-label="Huvudnavigation"
        className="relative z-150"
        onMouseLeave={closeNavigation}
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
          onDropdownChange={setActiveItemKey}
          onNavigate={closeNavigation}
        />

        <DeskNavSlider
          items={dropdownItems}
          activeItemKey={activeItemKey}
          onNavigate={closeNavigation}
        />
      </nav>
    </header>
  );
}