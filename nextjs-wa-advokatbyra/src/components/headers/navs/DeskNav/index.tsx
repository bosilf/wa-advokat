import NavItems, { type NavigationItems } from "../NavItems";

type DeskNavProps = {
  items: NavigationItems;
};

export default function DeskNav({ items }: DeskNavProps) {
  return (
    <header className="absolute z-200 hidden h-fit w-full justify-center p-lg md:flex">
      <nav aria-label="Huvudnavigation">
        <NavItems items={items} />
      </nav>
    </header>
  );
}