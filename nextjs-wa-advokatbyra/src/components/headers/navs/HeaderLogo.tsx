"use client";

import Logo from "@/components/common/Logo";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function HeaderLogo() {
  const pathname = usePathname();
  const white = pathname === "/" || pathname === "/artiklar" || pathname.startsWith("/team/") || pathname.startsWith("/artiklar/");

  return (
    <Link href="/" aria-label="WA Advokatbyrå – startsida" className="md:relative absolute top-2.5 left-4 z-2000 block w-15 shrink-0 self-start justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4">
      <Logo aria-hidden="true" className={`h-auto w-full ${white ? "text-white" : "mix-blend-difference"}`} />
    </Link>
  );
}
