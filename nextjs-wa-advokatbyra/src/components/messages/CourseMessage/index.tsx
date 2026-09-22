"use client";

import {
  useEffect,
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
import CourseSection from "@/components/sections/CourseSection";
import DateRequest from "@/components/calendears/DateRequest";
import Link from "next/link";
import ButtonComp from "@/components/buttons/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type EmployeeMessageProps = {
  name: string;
  email: string;
  messageId?: string;
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

export default function CourseMessage({
  name,
  email,
  messageId,
}: EmployeeMessageProps) {
  const [status, setStatus] =
    useState<FormStatus>("idle");

  const formId = useId();

  const sectionRef = useRef<HTMLDivElement>(null);
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

      return () => media.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isSuccess],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    if (status !== "success") return;
  
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [status]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;

    setStatus("submitting");

    try {
      const formData = new FormData(form);

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

  if (isSuccess) {
    return (
      <div ref={sectionRef}>
      <CourseSection
        id={messageId}
        color="bg-surface"
        heading="Din kursförfrågan har skickats!"
        eyebrow="Förfrågan status"
        >
        <div className="flex flex-col items-start gap-lg font-body">
          <p>
            Formuläret fungerar i testläge. Inget mejl
            har skickats.
          </p>
          <h3 className="font-subheading text-ink">Vill du boka fler kurser?</h3>
          <Link
            href="/boka-kurs"
            type="button"
            onClick={() => setStatus("idle")}
            
            className={buttonClasses}
            >
            Till bokningssidan

            <Icon
              name="arrow"
              className="text-white"
              size={15}
              />
          </Link>
        </div>
      </CourseSection>
      </div>
    );
  }

  return (
    
    <div ref={sectionRef}>
    <CourseSection
      heading="Vill du boka kursen?"
      eyebrow="kursbokning"
      color="bg-surface"
      aria-labelledby={`${formId}-heading`}
    >
      <div
        className="
          flex max-w-125 flex-col gap-lg
        "
      >
        <div
          ref={headingRef}
          className="flex min-w-0 flex-1 flex-col gap-md"
        >

          <p className="font-body text-body">
            Boka in dig på en kurs genom att fylla i formuläret nedan med önskade kursdatum i{" "}
            <span className="font-semibold lowercase">{name}</span>. Vi återkopplar snabbt med kursinformation eller andra frågor du vill ha svar på.
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
            <legend className="font-eyebrow text-muted mb-md">
              Kontaktpersonens uppgifter
            </legend>
              
            <label
              htmlFor={`${formId}-name`}
              className="sr-only"
            >
              Namn på kontaktpersonen
            </label>
              
            <input
              id={`${formId}-name`}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Namn *"
              required
              className={inputClasses}
            />
              
            <label
              htmlFor={`${formId}-email`}
              className="sr-only"
            >
              Kontaktpersonens E-post
            </label>
              
            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="E-post *"
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

            <legend className="font-eyebrow text-muted mt-sm">
              Bolagsinformation
            </legend>
            <label
              htmlFor={`${formId}-company-name`}
              className="sr-only"
            >
              Namn på företaget
            </label>
            <input
              id={`${formId}-company-name`}
              type="text"
              name="company-name"
              autoComplete="organization"
              placeholder="Företagsnamn *"
              required
              className={inputClasses}
            />

            <label
              htmlFor={`${formId}-company-adress`}
              className="sr-only"
            >
              Företagsadress
            </label>
            <input
              id={`${formId}-company-adress`}
              type="text"
              autoComplete="address-line1"
              name="company-adress"
              placeholder="Adress"
              className={inputClasses}
            />

            <label
              htmlFor={`${formId}-post-code`}
              className="sr-only"
            >
              Postkod
            </label>
            <input
              id={`${formId}-post-code`}
              type="text"
              autoComplete="adress postal-code"
              name="post-code"
              placeholder="Postkod"
              className={inputClasses}
            />

            <label
              htmlFor={`${formId}-company-number`}
              className="sr-only"
            >
              Organisationsnummer
            </label>
            <input
              id={`${formId}-company-number`}
              type="text"
              name="company-number"
              placeholder="Organisationsnummer"
              className={inputClasses}
            />
            <label
              htmlFor={`${formId}-date-request-0`}
              className="font-eyebrow text-muted mt-sm"
            >
              Lägg till önskade datum
            </label>
            <DateRequest formId={formId} inputClasses={inputClasses} />

            <label
              htmlFor={`${formId}-message`}
              className="sr-only"
            >
              Övriga noteringar och frågor
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              placeholder="Skriv ett meddelande..."
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
          <label className="flex cursor-pointer items-start gap-sm font-caption text-sm">
            <span className="relative mt-1 size-md shrink-0">
              <input
                type="checkbox"
                name="privacyAccepted"
                required
                className="
                  peer size-full cursor-pointer
                  appearance-none rounded-sm
                  aspect-square
                  overflow-hidden
                  border border-ink bg-white
                  checked:border-footer checked:bg-footer
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-ink
                "
              />
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="
                scale-200
                  pointer-events-none absolute inset-0
                  hidden size-full p-1
                  stroke-white
                  peer-checked:block
                "
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.5 9.5 17 19 7" />
              </svg>
            </span>

            <span>
              Jag har tagit del av hur WA Advokatbyrå behandlar mina
              personuppgifter i enlighet med{" "}
              <Link
                className="underline hover:text-accent"
                href="/integritetspolicy"
              >
                integritetspolicyn
              </Link>{" "}
              och accepterar de allmänna villkoren.
            </span>
          </label>
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
    </CourseSection>
    </div>
  );
}