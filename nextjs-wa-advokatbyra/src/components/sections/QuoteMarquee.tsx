"use client";

import {Children, useEffect, useRef, useState, type ReactNode} from "react";

export default function QuoteMarquee({children, stacked = true}: {children: ReactNode; stacked?: boolean}) {
  const cards = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [repeats, setRepeats] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const sequence = sequenceRef.current;
    if (!viewport || !sequence) return;

    const measure = () => {
      const width = document.documentElement.clientWidth;
      const sequenceWidth = sequence.getBoundingClientRect().width;
      const count = sequenceWidth > 0 ? Math.max(1, Math.ceil(width / sequenceWidth)) : 1;
      setRepeats(count);
      viewport.style.setProperty("--quote-viewport", `${width}px`);
      viewport.style.setProperty("--quote-duration", `${Math.max(1, sequenceWidth * count / 28)}s`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(sequence);
    observer.observe(document.documentElement);
    measure();
    return () => observer.disconnect();
  }, [children]);

  if (!cards.length) return null;

  return (
    <div className="quote-marquee" ref={viewportRef} data-paused={paused} data-stacked={stacked}>
      <div className="quote-marquee-window">
        <div className="quote-marquee-track">
          {[0, 1].map((group) => (
            <div className="quote-marquee-group" key={group} aria-hidden={group === 1 || undefined} inert={group === 1 || undefined}>
              {Array.from({length: repeats}, (_, repeat) => (
                <div className="quote-marquee-sequence" key={repeat} ref={group === 0 && repeat === 0 ? sequenceRef : undefined} aria-hidden={repeat > 0 || undefined} inert={repeat > 0 || undefined}>
                  {cards.map((card, index) => (
                    <div className="quote-marquee-card" key={index}>{card}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="quote-marquee-pause font-caption hover:underline" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? "Spela citat" : "Pausa citat"}
      </button>
    </div>
  );
}
