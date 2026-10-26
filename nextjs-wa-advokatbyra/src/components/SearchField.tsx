"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!formRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isOpen]);

  return (
    <form ref={formRef} action="/sok-resultat" method="get" role="search" className={`relative ml-auto min-h-10 min-w-0 transition-[width] duration-300 ${isOpen ? "w-50" : "w-16"}`}>
      <label htmlFor={inputId} className="sr-only">{label}</label>
      {isOpen && (
        <>
          <input
            {...props}
            ref={inputRef}
            id={inputId}
            type="search"
            name={name}
            placeholder={placeholder || " "}
            disabled={disabled}
            onKeyDown={(event) => {
              props.onKeyDown?.(event);
              if (!event.defaultPrevented && event.key === "Escape") setIsOpen(false);
            }}
            className={`peer min-h-10 w-full min-w-0 rounded-full border border-border backdrop-blur-md bg-white/20 py-2 pl-4 pr-20 font-sans text-base text-ink placeholder:text-footer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-footer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          />
          <HiOutlineSearch
            aria-hidden="true"
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-footer opacity-0 peer-[:placeholder-shown:not(:focus)]:opacity-100"
          />
        </>
      )}
      <button
        type={isOpen ? "submit" : "button"}
        disabled={disabled}
        aria-expanded={isOpen}
        onClick={(event) => {
          if (!isOpen) {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-4 py-2 font-sans text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-footer disabled:opacity-50 ${isOpen ? "bg-ink text-white hover:bg-footer" : "bg-white text-ink hover:bg-canvas"}`}
      >
        Sök
      </button>
    </form>
  );
}
