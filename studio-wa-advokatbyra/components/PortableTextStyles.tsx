import type {BlockStyleProps} from "sanity";

export function BodyStyle({children}: BlockStyleProps) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--wa-body-font)",
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      }}
    >
      {children}
    </span>
  );
}
export function DisplayStyle({children}: BlockStyleProps) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--wa-heading-font)",
        fontSize: "2.75rem",
        fontWeight: 400,
        lineHeight: 1.05,
      }}
    >
      {children}
    </span>
  );
}

export function H2Style({children}: BlockStyleProps) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--wa-heading-font)",
        fontSize: "2rem",
        fontWeight: 400,
        lineHeight: 1.15,
      }}
    >
      {children}
    </span>
  );
}

export function H3Style({children}: BlockStyleProps) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--wa-subheading-font)",
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
  );
}

export function EyebrowStyle({children}: BlockStyleProps) {
  return (
    <span
      style={{
        display: "block",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        lineHeight: 1.4,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}