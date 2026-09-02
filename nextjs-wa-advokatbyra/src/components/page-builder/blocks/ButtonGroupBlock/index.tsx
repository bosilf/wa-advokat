import Button from "@/components/buttons/Button";

type ResolvedLink = {
  label?: string | null;
  href?: string | null;
};

type PageBuilderButton = {
  _key: string;
  ariaLabel?: string | null;
  hasIcon?: boolean | null;
  resolvedLink?: ResolvedLink | null;
};

export type ButtonGroupBlockData = {
  _key: string;
  _type: "buttonGroupBlock";
  buttons?: PageBuilderButton[] | null;
};

type ButtonGroupBlockProps = {
  block: ButtonGroupBlockData;
};

export default function ButtonGroupBlock({
  block,
}: ButtonGroupBlockProps) {
  const buttons = block.buttons ?? [];

  if (buttons.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-md">
      {buttons.map((button) => {
        const href = button.resolvedLink?.href;

        if (!href) {
          return null;
        }

        return (
          <Button
            key={button._key}
            href={href}
            showIcon={button.hasIcon ?? false}
            ariaLabel={
              button.ariaLabel ?? undefined
            }
          >
            {button.resolvedLink?.label ??
              button.ariaLabel ??
              "Läs mer"}
          </Button>
        );
      })}
    </div>
  );
}