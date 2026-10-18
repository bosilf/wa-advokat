import { client } from "@/sanity/client";
import { NAVIGATION_QUERY } from "@/sanity/queries";

import DeskNav from "../DeskNav";
import HeaderLogo from "../HeaderLogo";
import MobileNav from "../MobileNav";
import type { NavigationItems } from "../NavItems";

const fallbackItems: NavigationItems = [
  { label: "Rättsområden", href: "/rattsomraden" },
  { label: "Juridikkurser", href: "/juridikkurser" },
  { label: "Medarbetare", href: "/om-oss" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Kontakt", href: "/kontakt" },
].map(({ label, href }, index) => ({
  _key: `fallback-${index}`,
  hasDropdown: false,
  dropdownSource: null,
  resolvedLink: { label, href, linkType: "internal", referenceType: null },
  courses: [],
  dropdownItems: [],
}));

export default async function Nav() {
  let items = fallbackItems;

  try {
    const navigation = await client.fetch(NAVIGATION_QUERY, {}, {
      next: { revalidate: 60 },
    });
    items = navigation?.headerNavigation ?? fallbackItems;
  } catch (error) {
    if (!(error instanceof TypeError && error.message === "fetch failed")) {
      throw error;
    }
    console.error("Navigation fetch failed; using fallback links.", error);
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-800 p-lg md:hidden">
        <HeaderLogo />
      </div>
      <MobileNav items={items} />
      <DeskNav items={items} />
    </>
  );
}