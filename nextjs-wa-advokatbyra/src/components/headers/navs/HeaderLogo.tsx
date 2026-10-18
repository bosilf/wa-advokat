"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function HeaderLogo() {
  const pathname = usePathname();
  const white = pathname === "/" || pathname === "/artiklar" || pathname.startsWith("/team/") || pathname.startsWith("/artiklar/");

  return (
    <Link href="/" aria-label="WA Advokatbyrå – startsida" className="relative z-2000 block w-24 shrink-0 self-start justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4">
      <Image src="/assets/Asset%201.svg" alt="WA Advokatbyrå" width={116} height={54} className={`h-auto w-full ${white ? "brightness-0 invert" : ""}`} />
    </Link>
  );
}
