type EyebrowLink = {
  hasLink?: boolean | null;
  link?: { href?: string | null } | null;
  resolvedLink?: unknown;
};

export function getEyebrowHref(eyebrow?: EyebrowLink | null): string | undefined {
  if (!eyebrow || eyebrow.hasLink === false) return undefined;

  const resolved = eyebrow.resolvedLink;
  const href = eyebrow.link?.href ?? (
    typeof resolved === "string" ? resolved :
    resolved && typeof resolved === "object" && "href" in resolved ? resolved.href :
    undefined
  );
  return typeof href === "string" ? href.trim() || undefined : undefined;
}
