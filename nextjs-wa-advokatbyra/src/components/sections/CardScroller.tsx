"use client";

import {useCallback, useEffect, useRef, useState, type ReactNode} from "react";

export default function CardScroller({children}: {children: ReactNode}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const updateScrollEdge = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    setCanScrollLeft(element.scrollLeft > 1);
    setCanScrollRight(element.scrollWidth - element.clientWidth - element.scrollLeft > 1);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const frame = requestAnimationFrame(updateScrollEdge);
    const observer = new ResizeObserver(updateScrollEdge);
    observer.observe(element);
    for (const child of element.children) observer.observe(child);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [children, updateScrollEdge]);

  return (
    <div className="max-w-full relative min-w-0 grid overflow-hidden grid-cols-[auto_minmax(0,1fr)_auto] py-8">
      <div className="absolute h-full z-50 pointer-events-none bg-white/35 rounded-full w-50 inline-flex items-center left-1/4 origin-center blur-2xl mix-blend-soft-light rotate-45 self-center justify-center" />
      <div className={`self-stretch overflow-visible -ml-1 bg-ink mix-blend-darken pointer-events-none w-1 z-4 blur-sm transition-opacity duration-300 motion-reduce:transition-none ${canScrollLeft ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
      <div ref={scrollRef} onScroll={updateScrollEdge} className="scrollbar-thumb-accent flex min-w-0 max-h-fit gap-7 py-8 px-3 overflow-x-auto">
        {children}
      </div>
      <div
        className={`self-stretch bg-ink overflow-visible mix-blend-darken pointer-events-none -mr-1 w-1 z-6 blur-sm transition-opacity duration-300 motion-reduce:transition-none ${canScrollRight ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
    </div>
  );
}
