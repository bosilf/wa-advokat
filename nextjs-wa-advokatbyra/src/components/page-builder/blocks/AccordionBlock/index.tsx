type AccordionItem = {
  _key: string;
  title?: string | null;
  description?: string | null;
};

export type AccordionBlockData = {
  _key: string;
  _type: "accordionBlock";
  items?: AccordionItem[] | null;
};

type AccordionBlockProps = {
  block: AccordionBlockData;
};

export default function AccordionBlock({
  block,
}: AccordionBlockProps) {
  const items = block.items ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col divide-y divide-ink/20 border-y border-ink/20">
      {items.map((item) => (
        <details
          key={item._key}
          className="group py-md"
        >
          <summary className="cursor-pointer list-none font-subheading text-ink">
            <span className="flex items-center justify-between gap-md">
              {item.title ?? "Namnlöst dragspel"}

              <span
                aria-hidden="true"
                className="transition-transform group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>

          {item.description && (
            <p className="mt-md whitespace-pre-line font-body text-muted">
              {item.description}
            </p>
          )}
        </details>
      ))}
    </div>
  );
}