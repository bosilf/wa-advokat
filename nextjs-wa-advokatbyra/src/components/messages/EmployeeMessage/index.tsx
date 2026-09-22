"use client";

import {
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Icon from "@/components/Icon";
import Section from "@/components/sections/Section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type EmployeeMessageProps = {
  name: string;
  email: string;
  isStudent?: boolean,
};

type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

const buttonClasses = `
  group inline-flex w-fit items-center justify-center gap-sm
  rounded-full bg-ink px-md py-sm
  font-subheading text-white
  transition-all duration-300
  hover:gap-md hover:bg-accent
  active:gap-md active:bg-accent
  disabled:cursor-wait disabled:opacity-60
`;

const inputClasses = `
  w-full rounded-full bg-white px-md py-sm
  font-body text-ink
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-footer
`;

export default function EmployeeMessage({
  name,
  email,
  isStudent = false
}: EmployeeMessageProps) {
  const [status, setStatus] =
    useState<FormStatus>("idle");

  const formId = useId();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLFormElement>(null);

  const isSuccess = status === "success";
  const isSubmitting = status === "submitting";

  useGSAP(
    () => {
      if (isSuccess) return;

      const section = sectionRef.current;
      const heading = headingRef.current;
      const content = contentRef.current;

      if (!section || !heading || !content) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            section,
            {
              paddingTop: () =>
                window.innerWidth >= 1024 ? 100 : 85,
              paddingBottom: () =>
                window.innerWidth >= 1024 ? 100 : 85,
            },
            {
              paddingTop: () =>
                window.innerWidth >= 1024 ? 12 : 2,
              paddingBottom: () =>
                window.innerWidth >= 1024 ? 12 : 2,

              ease: "none",

              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top 10%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
            })
            .from(heading, {
              autoAlpha: 0,
              y: 32,
              duration: 0.8,
              ease: "power3.out",
            })
            .from(
              content,
              {
                autoAlpha: 0,
                y: 32,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.5",
            );
        },
      );

      return () => media.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isSuccess],
      revertOnUpdate: true,
    },
  );

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;

    setStatus("submitting");

    try {
      const formData = new FormData(form);

      // Endast test: inget mejl skickas här.
      // Ersätt detta med ditt riktiga skickningsanrop.
      console.log("Test av kontaktformulär:", {
        recipient: email,
        ...Object.fromEntries(formData.entries()),
      });

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // Alla hooks ligger ovanför denna villkorliga return.
  if (isSuccess) {
    return (
      <Section
        color="bg-surface"
        heading="Formuläret har testats!"
        eyebrow="Test genomfört"
      >
        <div className="flex flex-col items-start gap-lg font-body">
          <p>
            Formuläret fungerar i testläge. Inget mejl
            har skickats.
          </p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className={buttonClasses}
          >
            Tillbaka till formuläret

            <Icon
              name="arrow"
              className="text-white"
              size={15}
            />
          </button>
        </div>
      </Section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="bg-surface"
      aria-labelledby={`${formId}-heading`}
    >
      <div
        className="
          m-auto flex max-w-200 flex-col gap-lg
          px-section-sides py-section-tb
          md:flex-row md:gap-xl
        "
      >
        <div
          ref={headingRef}
          className="flex min-w-0 flex-1 flex-col gap-md"
        >
          <h2
            id={`${formId}-heading`}
            className="font-heading text-ink"
          >
            <span className={`${isStudent ? 'block' : 'hidden'}`}>
              Kontakt
            </span>
            <span className={`${isStudent ? 'hidden' : 'block'}`}>
              Skicka ett meddelande!
            </span>
          </h2>

          <p className="font-body text-body">
            <span className={`${isStudent ? 'block' : 'hidden'}`}>
              Vill du veta mer om Studentpoolen på WA Advokatbyrå? Då kan du fylla i formuläret så återkommer vi.
            </span>
            <span className={`${isStudent ? 'hidden' : 'block'}`}>
              Fyll i formuläret <span className="md:hidden">nedan </span>för att kontakta{" "}
              {name}.
            </span>
          </p>

          <p
            id={`${formId}-notice`}
            className="font-body text-body"
          >
            Testläge – formuläret skickar ännu inga mejl.
          </p>
        </div>

        <form
          ref={contentRef}
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          aria-describedby={`${formId}-notice`}
          className="flex min-w-0 flex-1 flex-col gap-sm"
        >
          <fieldset
            disabled={isSubmitting}
            className="grid min-w-0 gap-sm border-0 p-0"
          >
            <legend className="sr-only">
              Dina kontaktuppgifter och ditt meddelande
            </legend>

            <label
              htmlFor={`${formId}-name`}
              className="sr-only"
            >
              Namn
            </label>

            <input
              id={`${formId}-name`}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Namn"
              required
              className={inputClasses}
            />

            <label
              htmlFor={`${formId}-email`}
              className="sr-only"
            >
              E-post
            </label>

            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="E-post"
              required
              className={inputClasses}
            />

            <label
              htmlFor={`${formId}-phone`}
              className="sr-only"
            >
              Telefonnummer
            </label>

            <input
              id={`${formId}-phone`}
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Telefonnummer"
              className={inputClasses}
            />

            <label
              htmlFor={`${formId}-message`}
              className="sr-only"
            >
              Meddelande
            </label>

            <textarea
              id={`${formId}-message`}
              name="message"
              placeholder="Skriv ett meddelande..."
              required
              rows={5}
              className="
                w-full resize-y rounded-lg bg-white
                px-md py-sm font-body text-ink
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-footer
              "
            />
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonClasses}
          >
            {isSubmitting
              ? "Testar..."
              : "Testa formuläret"}

            <Icon
              name="arrow"
              size={15}
              className="text-white"
            />
          </button>

          {status === "error" && (
            <p
              role="alert"
              className="mt-sm font-body text-red-600"
            >
              Något gick fel när formuläret testades.
              Försök igen.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}