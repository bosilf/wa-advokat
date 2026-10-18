"use client";

import { Children, useId, useState, type ReactNode } from "react";

export default function CourseCardList({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const cards = Children.toArray(children);

  return (
    <div className="flex relative flex-col gap-md z-15">
      <div id={listId} className="grid gap-md lg:grid-cols-2">
        {expanded ? cards : cards.slice(0, 6)}
      </div>
      {!expanded && cards.length > 6 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded(true)}
          className="inline-flex w-fit self-center items-center justify-center rounded-full bg-ink px-md py-sm font-subheading text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Visa fler kurser
        </button>
      )}
    </div>
  );
}
