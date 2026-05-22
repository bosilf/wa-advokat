"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveFilter({ href, children }: { href: string, children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      scroll={false}
      href={href} 
      className={`transition-all duration-500  hover:underline ${isActive ? "font-bold" : ""}`}
    >
      {children}
    </Link>
  );
}