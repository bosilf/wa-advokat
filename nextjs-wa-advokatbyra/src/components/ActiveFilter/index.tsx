"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveFilter({ href, children }: { href: string, children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`hover:text-blue-500 capitalize ${isActive ? "underline font-bold" : ""}`}
    >
      {children}
    </Link>
  );
}