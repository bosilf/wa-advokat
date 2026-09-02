import Button, {
  type ButtonIcon,
  type ButtonVariant,
} from "./Button";

export type SanityButtonData = {
  variant?: ButtonVariant | null;
  icon?: ButtonIcon | null;
  hasIcon?: boolean | null;
  ariaLabel?: string | null;

  resolvedLink?: {
    label?: string | null;
    href?: string | null;
    openInNewTab?: boolean | null;
  } | null;
};

type SanityButtonProps = {
  button?: SanityButtonData | null;
};

export default function SanityButton({
  button,
}: SanityButtonProps) {
  const resolvedLink = button?.resolvedLink;

  if (!resolvedLink?.href || !resolvedLink.label) {
    return null;
  }

  return (
    <Button
      href={resolvedLink.href}
      variant={button?.variant ?? "primary"}
      icon={button?.icon ?? "arrow"}
      showIcon={button?.hasIcon ?? true}
      ariaLabel={
        button?.ariaLabel ??
        resolvedLink.label
      }
      target={
        resolvedLink.openInNewTab
          ? "_blank"
          : "_self"
      }
    >
      {resolvedLink.label}
    </Button>
  );
}