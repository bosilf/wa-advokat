import { client } from "@/sanity/client";
import { NAVIGATION_QUERY } from "@/sanity/queries";

import DeskNav from "../DeskNav";
import MobileNav from "../MobileNav";

export default async function Nav() {
  const navigation = await client.fetch(NAVIGATION_QUERY);
  const items = navigation?.headerNavigation ?? [];

  return (
    <>
      <MobileNav items={items} />
      <DeskNav items={items} />
    </>
  );
}