"use client";

import { useState } from "react";
import Icon from "../Icon";

export default function ShareCourseButton({ href }: { href: string | null }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function copyLink() {
    if (!href) return;

    setStatus("copying");
    try {
      await navigator.clipboard.writeText(new URL(href, window.location.origin).href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="col-span-1 self-center mr-auto">
      <button
        type="button"
        onClick={copyLink}
        disabled={!href || status === "copying"}
        className="min-w-fit group/button flex gap-2 items-center cursor-pointer disabled:cursor-default disabled:opacity-50"
      >
        <span className="lowercase first-letter:uppercase">
          {status === "copied" ? "Länk kopierad" : "Dela"}
        </span>
        <Icon name="share" className="transition-colors group-hover/button:text-accent" size={16} />
      </button>
      <span role="status" className={status === "error" ? "block text-sm" : "sr-only"}>
        {status === "copied" && "Kurslänken har kopierats."}
        {status === "error" && "Kunde inte kopiera länken. Försök igen."}
      </span>
    </div>
  );
}