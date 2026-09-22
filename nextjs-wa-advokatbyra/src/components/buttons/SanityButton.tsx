import ButtonComp from "./Button";

type SanityNavigationItem = {
  _type?: "navigationItem";

  label?: string | null;

  link?: {
    _id?: string;
    _type?: string;
    title?: string | null;

    linkType?:
      | "internal"
      | "external"
      | null;

    externalUrl?: string | null;

    internalReference?: {
      _id?: string;
      _type?: string;
      title?: string | null;
      courseName?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      slug?: string | null;
    } | null;
  } | null;
};

export type SanityButtonData = {
  _type: "button";

  hasButton?: boolean | null;

  btnProps?: {
    link?: SanityNavigationItem | null;

    target?: boolean | null;

    variant?:
      | "primary"
      | "secondary"
      | "simple"
      | "simpleWhite"
      | null;

    hasIcon?: boolean | null;

    icon?:
      | "arrow"
      | "arrowSimple"
      | null;

    ariaLabel?: string | null;
  } | null;
};

export type SanityButtonProps = {
  button?: SanityButtonData | null;
};

function resolveHref(
  navigationItem?: SanityNavigationItem | null,
): string {
  const link = navigationItem?.link;

  if (!link) return "#";

  if (
    link.linkType === "external" &&
    link.externalUrl
  ) {
    return link.externalUrl;
  }

  const reference = link.internalReference;

  if (!reference?._type) {
    return "#";
  }

  switch (reference._type) {
    case "home":
      return "/";

    case "contactPage":
      return "/kontakt";

    case "aboutPage":
      return "/om-oss";

    case "courseMainPage":
      return "/juridikkurser";

    case "employee":
      return reference.slug
        ? `/medarbetare/${reference.slug}`
        : "#";

    case "service":
      return reference.slug
        ? `/tjanster/${reference.slug}`
        : "#";

    case "course":
      return reference.slug
        ? `/juridikkurser/${reference.slug}`
        : "#";

    case "article":
      return reference.slug
        ? `/artiklar/${reference.slug}`
        : "#";

    default:
      return "#";
  }
}

export default function SanityButton({
  button,
}: SanityButtonProps) {
  if (
    !button?.hasButton ||
    !button.btnProps
  ) {
    return null;
  }

  const btn = button.btnProps;

  const href = resolveHref(btn.link);

  return (
    <ButtonComp
      href={href}
      variant={btn.variant ?? "primary"}
      icon={btn.icon ?? "arrow"}
      showIcon={btn.hasIcon ?? true}
      ariaLabel={
        btn.ariaLabel ?? undefined
      }
      target={
        btn.target
          ? "_blank"
          : "_self"
      }
    >
      {btn.link?.label ??
        btn.link?.link?.title ??
        "Läs mer"}
    </ButtonComp>
  );
}