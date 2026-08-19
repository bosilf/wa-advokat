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
      className={`group transition-all duration-300 underline-offset-1 decoration-transparent hover:decoration-blue-400 hover:underline-offset-3 hover:underline decoration-[3px] ${isActive ? "font-bold" : ""}`}
    >
      {children}
    </Link>
  );
}