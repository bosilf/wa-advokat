"use client";

import { useId, type ComponentProps } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export type SearchFieldProps = Omit<ComponentProps<"input">, "type"> & {
  label?: string;
};

export default function SearchField({
  id,
  label = "Sök",
  name = "search",
  placeholder = "",
  className = "",
  disabled,
  ...props
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <form action="/sok-resultat" method="get" role="search" className="relative ml-auto min-w-0 max-w-50">
      <label htmlFor={inputId} className="sr-only">{label}</label>
      <input
        {...props}
        id={inputId}
        type="search"
        name={name}
        placeholder={placeholder || " "}
        disabled={disabled}
        className={`peer min-h-12 w-full min-w-0 rounded-full border border-border backdrop-blur-md bg-white/20 py-3 pl-4 pr-20 font-sans text-base text-ink placeholder:text-footer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-footer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
      <HiOutlineSearch
        aria-hidden="true"
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-footer opacity-0 peer-[:placeholder-shown:not(:focus)]:opacity-100"
      />
      <button type="submit" disabled={disabled} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ink px-4 py-2 font-sans text-sm text-white hover:bg-footer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-footer disabled:opacity-50">
        Sök
      </button>
    </form>
  );
}
