import type { ReactNode } from "react";
import Link from "next/link";

export type SectionProps = {
  children: ReactNode;
  color?: string;
  hideEyebrow?: boolean;
  eyebrow?: string;
  eyebrowHref?: string;
  eyebrowOpenInNewTab?: boolean;
  heading: string;
};

export default function Section({
  heading,
  eyebrow,
  eyebrowHref,
  eyebrowOpenInNewTab = false,
  hideEyebrow = false,
  children,
  color = "bg-canvas",
}: SectionProps) {
  const eyebrowContent = (
    <span className="font-eyebrow text-muted">
      {eyebrow}
    </span>
  );

  return (
    <section className={`${color} h-fit w-full snap-start snap-normal`}>
      <div className="z-10 m-auto flex max-w-200 flex-col gap-md px-section-sides py-section">
        <h2 className="mb-md flex flex-col">
          {!hideEyebrow && eyebrow && (
            <>
              {eyebrowHref ? (
                <Link
                  href={eyebrowHref}
                  target={
                    eyebrowOpenInNewTab
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    eyebrowOpenInNewTab
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-fit"
                >
                  {eyebrowContent}
                </Link>
              ) : (
                eyebrowContent
              )}
            </>
          )}

          <span className="font-heading text-ink">
            {heading}
          </span>
        </h2>

        {children}
      </div>
    </section>
  );
}